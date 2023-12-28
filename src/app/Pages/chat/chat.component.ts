import { Component } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import Message from 'src/app/Models/Message';
import { ChatService } from 'src/app/Services/chat-service.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor(private messageService : MessageService, private chatService : ChatService) {
  }
  messages: Observable<Message[]> = this.messageService.messages;
  message: Message = {} as Message;
  sendMessage() {
    this.message.room_id = 7;
    this.message.sender_id = 6;
    this.chatService.sendMessage(this.message);
    this.message.content = '';
  }
}
