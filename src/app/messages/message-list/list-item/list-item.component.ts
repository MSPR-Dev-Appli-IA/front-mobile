import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Conversation } from '../../message.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements AfterContentInit {
  @Input() conversation!: Conversation;
  @Input() selected!: boolean;
  @Output() selectConversation = new EventEmitter<number>();
  fromNow!: string;
  initials!: string;

  ngAfterContentInit() {
    moment.locale('fr');
    this.fromNow = moment(this.conversation.last_message.sent_at)
      .startOf('hour')
      .fromNow();
    this.initials =
      this.conversation.sender_name[0] +
      this.conversation.sender_name.split(' ')[1][0];
  }

  onSelectConversation() {
    this.selectConversation.emit(this.conversation.id);
  }
}
