import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './map-page/map-page.component';
import { MapRoutingModule } from './map-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ListItemComponent } from './list-item/list-item.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';

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
