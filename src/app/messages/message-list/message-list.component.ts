import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conversation, MessageService } from '../message.service';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
  searchValue = '';
  allConversations: Observable<Conversation[]>;
  messages: Observable<Conversation[]>;
  demands: Observable<Conversation[]>;
  advices: Observable<Conversation[]>;
  isMobile$: Observable<boolean> = this.layoutService.isMobile$;

  selectedConversationId = -1;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private layoutService: LayoutService
  ) {
    this.allConversations = this.messageService.getConversations();

    this.messages = this.allConversations.pipe(
      map(conversations => {
        return conversations.filter(
          conversation =>
            conversation.plantsitting_request_id && conversation.accepted
        );
      })
    );

    this.demands = this.allConversations.pipe(
      map(conversations => {
        return conversations.filter(
          conversation =>
            conversation.plantsitting_request_id && !conversation.accepted
        );
      })
    );

    this.advices = this.allConversations.pipe(
      map(conversations => {
        return conversations.filter(
          conversation => !!conversation.advice_request_id
        );
      })
    );

    this.selectedConversationId = +(this.router.url.split('/').pop() ?? -1);
  }

  selectConversation(id: number) {
    this.selectedConversationId = id;
  }

  setNavigationContext(): void {
    this.layoutService.setMobileNavigationContext('messages');
  }

  track() {
    // @ts-ignore
    window.umami.track('message-list-tab-clicked');
  }
}
