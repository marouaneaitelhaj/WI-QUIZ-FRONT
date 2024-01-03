import { Component } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import Message from 'src/app/Models/Message';
import Room from 'src/app/Models/Room';
import { ChatService } from 'src/app/Services/chat-service.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  selectedRoom: Room = {} as Room;
  messages: Observable<Message[]> = this.chatService.messages;
  message: Message = {} as Message;
  DisblayLogin: boolean = true;
  constructor(private chatService : ChatService) {
  }
  sendMessage() {
    this.message.room_id = 7;
    this.message.sender_id = localStorage.getItem('id') as unknown as number;
    this.chatService.sendMessage(this.message);
    this.message.content = '';
  }
}
