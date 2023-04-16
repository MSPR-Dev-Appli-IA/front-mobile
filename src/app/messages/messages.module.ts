import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePageComponent } from './message-page/message-page.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ListItemComponent } from './message-list/list-item/list-item.component';
import { MessagesRoutingModule } from './messages-routing.module';

@NgModule({
  declarations: [MessagePageComponent, MessageListComponent, ListItemComponent],
  imports: [CommonModule, MessagesRoutingModule],
})
export class MessagesModule {}
