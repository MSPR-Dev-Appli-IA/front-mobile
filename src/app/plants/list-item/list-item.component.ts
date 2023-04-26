import { Component, Input } from '@angular/core';
import { Plant, UserPlantsService } from '../plants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() plant!: Plant;
  isOpen = false;
  constructor(private service: UserPlantsService, private router: Router) {}

  askForAdvice(): void {
    this.plant.hasAdvice = true;
    this.service.askForAdvice(this.plant.id);
  }

  seeAdvice(): void {
    this.router.navigate(['messages', 'advice'], {
      queryParams: { plantId: this.plant.id },
    });
  }

  editImage(): void {
    console.log('editImage');
  }

  toggleModal(): void {
    this.isOpen = !this.isOpen;
  }

  addImageInput(): void {
    this.plant.imageUrls.push('');
  }

  removeImageInput(idx: number): void {
    this.plant.imageUrls.splice(idx, 1);
  }

  openRemoveModal(): void {
    console.log('openEditModal');
  }

  savePlant() {
    this.plant.imageUrls.filter(url => url !== '');
    console.log('savePlant');
    this.toggleModal();
  }
}
