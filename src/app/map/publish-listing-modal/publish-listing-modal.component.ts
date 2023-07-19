import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Listing, Location, MapService } from '../map.service';
import { Plant, UserPlantsService } from '../../plants/plants.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-publish-listing-form',
  templateUrl: './publish-listing-modal.component.html',
  styleUrls: ['./publish-listing-modal.component.scss']
})
export class PublishListingModalComponent implements OnInit {
  publishForm!: FormGroup;
  plants: Observable<Plant[]>;
  reloadListings = new EventEmitter<void>();

  constructor(
    private mapService: MapService,
    private plantService: UserPlantsService,
    public dialogRef: DialogRef<string>
  ) {
    this.plants = this.plantService.getPlants();
  }

  ngOnInit() {
    this.publishForm = new FormGroup({
      address: new FormGroup({
        street: new FormControl('', [Validators.required]),
        district: new FormControl(''),
        city: new FormControl('', [Validators.required]),
        zip: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(5)
        ])
      }),
      general: new FormGroup({
        plant: new FormControl<Plant | null>(null, [Validators.required]),
        title: new FormControl('', [Validators.required]),
        start_at: new FormControl('', [Validators.required]),
        end_at: new FormControl('', [Validators.required])
      })
    });
  }

  onSubmit() {
    console.log('hello');
    return this.mapService
      .getCoordinates(
        Object.values(this.publishForm.controls['address'].value)
          .filter(val => !!val)
          .join(', ')
      )
      .pipe(
        switchMap((locations: Location[]) => {
          console.log(this.publishForm.controls['general'].value.plant);
          return this.mapService.publishListing({
            plantId: this.publishForm.controls['general'].value.plant._id,
            description: this.publishForm.controls['general'].value.title,
            start_at: this.publishForm.controls['general'].value.start_at,
            end_at: this.publishForm.controls['general'].value.end_at,
            address: {
              district:
                this.publishForm.controls['address'].value.district ??
                this.publishForm.controls['address'].value.city,
              location: { ...locations[0].location }
            }
          } as Listing);
        })
      );
    this.dialogRef.close();
    this.reloadListings.emit();
  }
}
