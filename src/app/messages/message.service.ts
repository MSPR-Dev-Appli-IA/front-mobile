import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getConversations(): Observable<Conversation[]> {
    // return this.http.get<Conversation[]>('/api/conversations');
    return of(CONVERSATIONS);
  }

  getConversationById(id: number): Observable<Conversation | undefined> {
    // return this.http.get<Conversation[]>('/api/conversations');
    return of(CONVERSATIONS.find(conversation => conversation.id === id));
  }

  getMessagesByConversationId(id: number): Observable<Message[]> {
    // return this.http.get<Message[]>(`/api/conversations/${id}/messages`);
    return of(MESSAGES.filter(message => message.conversation_id === id));
  }
}

export interface Conversation {
  id: number;
  created_at: string;
  ended_at: string;
  updated_at: string;
  plantsitting_request_id: number | null;
  advice_request_id: number | null;
  sender_name: string;
  accepted: boolean | null;
  booker_id: number | null;
  favorite: boolean;
  last_message: Message;
  unread_count: number;
}

export interface Message {
  id: number;
  sent_at: string;
  content: string;
  sender_id: number;
  image_id: number;
  conversation_id: number;
  unread: boolean;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    created_at: '2023-04-27 12:00:00',
    ended_at: '2023-04-28 12:11:00',
    updated_at: '2023-04-28 12:11:00',
    plantsitting_request_id: 1,
    advice_request_id: null,
    sender_name: 'Jean Charles',
    accepted: true,
    booker_id: 1,
    favorite: true,
    last_message: {
      id: 3,
      sent_at: '2023-04-29 12:00:00',
      content: 'Bonjour, je suis disponible pour garder votre plante',
      sender_id: 2,
      image_id: 1,
      conversation_id: 2,
      unread: true
    },
    unread_count: 0
  },
  {
    id: 6,
    created_at: '2023-04-27 12:00:00',
    ended_at: '2023-04-28 12:11:00',
    updated_at: '2023-04-28 12:11:00',
    plantsitting_request_id: 1,
    advice_request_id: null,
    sender_name: 'Jean Charles',
    accepted: true,
    booker_id: 1,
    favorite: false,
    last_message: {
      id: 3,
      sent_at: '2023-04-29 12:00:00',
      content: 'Bonjour, je suis disponible pour garder votre plante',
      sender_id: 2,
      image_id: 1,
      conversation_id: 2,
      unread: true
    },
    unread_count: 1
  },
  {
    id: 2,
    created_at: '2023-04-27 12:00:00',
    ended_at: '2023-04-28 12:11:00',
    updated_at: '2023-04-28 12:11:00',
    plantsitting_request_id: null,
    advice_request_id: 1,
    sender_name: 'Caroline Smith',
    accepted: true,
    booker_id: null,
    favorite: false,
    last_message: {
      id: 1,
      sent_at: '2023-04-27 12:00:00',
      content: 'Bonjour, je suis disponible pour garder votre plante',
      sender_id: 1,
      image_id: 1,
      conversation_id: 1,
      unread: true
    },
    unread_count: 0
  },
  {
    id: 3,
    created_at: '2023-04-27 12:00:00',
    ended_at: '2023-04-28 12:11:00',
    updated_at: '2023-04-28 12:11:00',
    plantsitting_request_id: null,
    advice_request_id: 2,
    sender_name: 'Amanda Fournier',
    accepted: false,
    booker_id: null,
    favorite: false,
    last_message: {
      id: 1,
      sent_at: '2023-04-27 12:00:00',
      content: 'Bonjour, je suis disponible pour garder votre plante',
      sender_id: 1,
      image_id: 1,
      conversation_id: 1,
      unread: true
    },
    unread_count: 0
  },
  {
    id: 4,
    created_at: '2023-04-27 12:00:00',
    ended_at: '2023-04-28 12:11:00',
    updated_at: '2023-04-28 12:11:00',
    plantsitting_request_id: 4,
    advice_request_id: null,
    sender_name: 'John Doe',
    accepted: false,
    booker_id: null,
    favorite: false,
    last_message: {
      id: 1,
      sent_at: '2023-04-27 12:00:00',
      content: 'Bonjour, je suis disponible pour garder votre plante',
      sender_id: 1,
      image_id: 1,
      conversation_id: 1,
      unread: true
    },
    unread_count: 0
  }
];

const MESSAGES: Message[] = [
  {
    id: 1,
    sent_at: '2023-04-27 12:00:00',
    content: 'Bonjour, je suis disponible pour garder votre plante',
    sender_id: 1,
    image_id: 1,
    conversation_id: 1,
    unread: true
  },
  {
    id: 2,
    sent_at: '2023-04-28 12:11:00',
    content: 'test',
    sender_id: 1,
    image_id: 1,
    conversation_id: 1,
    unread: true
  },
  {
    id: 3,
    sent_at: '2023-04-29 12:00:00',
    content: 'Bonjour, je suis disponible pour garder votre plante',
    sender_id: 2,
    image_id: 1,
    conversation_id: 2,
    unread: true
  },
  {
    id: 4,
    sent_at: '2023-04-29 12:10:00',
    content: 'No merci, je ne suis pas intéressé',
    sender_id: 1,
    image_id: 1,
    conversation_id: 2,
    unread: true
  },
  {
    id: 5,
    sent_at: '2023-04-29 12:10:00',
    content: 'OK, pas de soucis',
    sender_id: 1,
    image_id: 1,
    conversation_id: 2,
    unread: true
  }
];
