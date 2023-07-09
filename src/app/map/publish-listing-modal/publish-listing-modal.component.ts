import { Component } from '@angular/core';
import { catchError, debounceTime, Observable, of, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Coordinates, Listing, MapService } from '../map.service';
import { Plant } from '../../plants/plants.service';

@Component({
  selector: 'app-publish-listing-form',
  templateUrl: './publish-listing-modal.component.html',
  styleUrls: ['./publish-listing-modal.component.scss']
})
export class PublishListingModalComponent {
  publishForm!: FormGroup;
  isAddressValid = of(true);
  coordinates?: Observable<Coordinates>;
  sub = new Subscription();

  constructor(private mapService: MapService) {}

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

    this.sub.add(
      this.publishForm.controls['address'].valueChanges
        .pipe(debounceTime(500))
        .subscribe((value: { street: string; city: string; zip: string }) => {
          if (this.publishForm.controls['address'].valid) {
            console.log('valid');
            this.coordinates = this.mapService
              .getCoordinates(Object.values(value).join(', '))
              .pipe(
                catchError(err => {
                  console.log(err);
                  this.isAddressValid = of(false);
                  return of(err);
                })
              );
          }
        })
    );
  }

  onSubmit() {
    this.coordinates?.subscribe((coordinates: Coordinates) => {
      this.mapService.publishListing({
        plantId: this.publishForm.controls['general'].value.plant.id,
        description: this.publishForm.controls['general'].value.title,
        start_at: this.publishForm.controls['general'].value.start_at,
        end_at: this.publishForm.controls['general'].value.end_at,
        address: {
          district:
            this.publishForm.controls['address'].value.district ??
            this.publishForm.controls['address'].value.city,
          location: { ...coordinates }
        }
      } as Listing);
    });
  }
}
