import { Component, Inject } from '@angular/core';
import { Plant, Species, UserPlantsService } from '../plants.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-add-edit-plant-modal',
  templateUrl: './add-edit-plant-modal.component.html',
  styleUrls: ['./add-edit-plant-modal.component.scss']
})
export class AddEditPlantModalComponent {
  plant: Plant;
  species: Observable<Species[]> | undefined;
  editMode = false;

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
          imageUrls: [],
          description: '',
          hasRequest: false,
          hasAdvice: false
        } as Plant);
    this.species = this.plantService.getSpecies();
  }

  addImageInput(): void {
    this.plant.imageUrls.push('');
  }

  removeImageInput(idx: number): void {
    this.plant.imageUrls.splice(idx, 1);
  }

  savePlant() {
    this.plant.imageUrls.filter(url => url !== '');
    console.log('savePlant');
    this.dialogRef.close();
  }

  saveSpecies($event: Event) {
    console.log($event);
    console.log('saveSpecies');
  }
}

interface ModalData {
  plant: Plant;
}
