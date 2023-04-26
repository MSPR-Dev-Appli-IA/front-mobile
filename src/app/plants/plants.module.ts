import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PlantPageComponent } from './plant-page/plant-page.component';
import { ListItemComponent } from './list-item/list-item.component';
import { PlantsRoutingModule } from './plants-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  OverlayModule,
} from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PlantsModule {}
