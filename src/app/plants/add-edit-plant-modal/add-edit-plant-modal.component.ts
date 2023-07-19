import { Component, Inject } from '@angular/core';
import { Plant, Species, UserPlantsService } from '../plants.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-plant-modal',
  templateUrl: './add-edit-plant-modal.component.html',
  styleUrls: ['./add-edit-plant-modal.component.scss']
})
export class AddEditPlantModalComponent {
  plant: Plant;
  species: Observable<Species[]> | undefined;
  editMode = false;
  image?: File;
  foundSpecies: Observable<string | undefined> = of(undefined);

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: ModalData,
    private plantService: UserPlantsService
  ) {
    this.editMode = !!data.plant;
    this.plant = data.plant
      ? data.plant
      : ({
          id: Math.random() * 1000,
          name: '',
          images: [],
          description: '',
          hasRequest: false,
          hasAdvice: false
        } as Plant);
    this.species = this.plantService.getSpecies();
  }

  // addImageInput(): void {
  //   this.plant.images.push('');
  // }

  // removeImageInput(idx: number): void {
  //   this.plant.imageUrls.splice(idx, 1);
  // }

  getFile($event: File): void {
    this.plant.images?.push($event);
  }

  savePlant() {
    this.foundSpecies = this.plantService.savePlant(this.plant).pipe(
      map((res: any) => {
        console.log(res);
        return res.species.name;
      })
    );
  }
}

interface ModalData {
  plant: Plant;
}
