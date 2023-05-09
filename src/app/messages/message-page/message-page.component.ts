import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Conversation, MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss']
})
export class MessagePageComponent implements OnDestroy {
  conversations: Observable<Conversation[]>;
  selectedConversationId = -1;
  subscription = new Subscription();

  constructor(private messageService: MessageService, private router: Router) {
    this.conversations = this.messageService.getConversations();

    this.subscription.add(
      this.router.events.subscribe(() => {
        this.selectedConversationId = +(this.router.url.split('/').pop() ?? -1);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
