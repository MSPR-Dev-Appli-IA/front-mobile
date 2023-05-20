import { Component, Input } from '@angular/core';
import { Plant, UserPlantsService } from '../plants.service';
import { Router } from '@angular/router';
import { AddEditPlantModalComponent } from '../add-edit-plant-modal/add-edit-plant-modal.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() plant!: Plant;
  isOpen = false;
  constructor(
    private service: UserPlantsService,
    private router: Router,
    public dialog: Dialog
  ) {}

  askForAdvice(): void {
    this.plant.hasAdvice = true;
    this.service.askForAdvice(this.plant.id);
  }

  seeAdvice(): void {
    this.router.navigate(['messages', 'advice'], {
      queryParams: { plantId: this.plant.id }
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  openDialog() {
    this.dialog.open(AddEditPlantModalComponent, {
      minWidth: '400px',
      data: {
        plant: this.plant
      }
    });
  }
}
