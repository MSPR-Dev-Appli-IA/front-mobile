import { Component, Input } from '@angular/core';
import { Image, Plant, UserPlantsService } from '../plants.service';
import { Router } from '@angular/router';
import { AddEditPlantModalComponent } from '../add-edit-plant-modal/add-edit-plant-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { LayoutService } from '../../layout/layout.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() plant!: Plant;
  isOpen = false;
  isMobile$ = this.layoutService.isMobile$;
  imageUrl = environment.imageUrl;

  constructor(
    private service: UserPlantsService,
    private router: Router,
    public dialog: Dialog,
    private layoutService: LayoutService
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

  instanceOfImage(object: any): object is Image {
    return 'path' in object;
  }

  getImageSrc(plant: Plant): string {
    if (plant.images && this.instanceOfImage(plant.images[0])) {
      return this.imageUrl + plant.images[0].path;
    }
    return 'plant.jpg';
  }
}
