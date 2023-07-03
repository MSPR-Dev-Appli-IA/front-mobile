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
  OverlayModule
} from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AddEditPlantModalComponent } from './add-edit-plant-modal/add-edit-plant-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PlantPageComponent,
    ListItemComponent,
    AddEditPlantModalComponent
  ],
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
    MatSelectModule,
    MatDialogModule,
    SharedModule
  ]
})
export class PlantsModule {}
