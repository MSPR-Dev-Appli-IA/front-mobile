import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantPageComponent } from './plant-page/plant-page.component';
import { ListItemComponent } from './list-item/list-item.component';
import { PlantsRoutingModule } from './plants-routing.module';

@NgModule({
  declarations: [PlantPageComponent, ListItemComponent],
  imports: [CommonModule, PlantsRoutingModule],
})
export class PlantsModule {}
