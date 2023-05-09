import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conversation, Message, MessageService } from '../message.service';
import { Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss']
})
export class MessageWindowComponent {
  conversationId: Observable<string | null>;
  conversation: Observable<Conversation | undefined>;
  messages: Observable<Message[]> | null = null;
  currentUserId = 1; //@TODO: get current user id from auth service
  input = '';

  constructor(
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.conversationId = this.route.paramMap.pipe(
      map(params => params.get('id'))
    );
    this.conversation = this.conversationId.pipe(
      switchMap(id => {
        return this.messageService.getConversationById(+(id || -1));
      })
    );
    this.messages = this.conversationId.pipe(
      switchMap(id => {
        return this.messageService.getMessagesByConversationId(+(id || -1));
      })
    );
  }

  sendImage() {
    console.log('image');
  }
}
