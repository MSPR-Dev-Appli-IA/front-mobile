import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './map-page/map-page.component';
import { MapRoutingModule } from './map-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  declarations: [MapPageComponent, ListItemComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MapModule {}
