import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './map-page/map-page.component';
import { MapRoutingModule } from './map-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ListItemComponent } from './list-item/list-item.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { PublishListingModalComponent } from './publish-listing-modal/publish-listing-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MapPageComponent,
    ListItemComponent,
    PublishListingModalComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CdkOverlayOrigin,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MapModule {}
