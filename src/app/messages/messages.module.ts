import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePageComponent } from './message-page/message-page.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ListItemComponent } from './message-list/list-item/list-item.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MessageWindowComponent } from './message-window/message-window.component';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';

@NgModule({
  declarations: [
    MessagePageComponent,
    MessageListComponent,
    ListItemComponent,
    MessageWindowComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [ListItemComponent]
})
export class MessagesModule {}
