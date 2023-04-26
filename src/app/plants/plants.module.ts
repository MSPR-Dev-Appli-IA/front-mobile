import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PlantPageComponent } from './plant-page/plant-page.component';
import { ListItemComponent } from './list-item/list-item.component';
import { PlantsRoutingModule } from './plants-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PlantPageComponent, ListItemComponent],
  imports: [
    CommonModule,
    PlantsRoutingModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class PlantsModule {}
