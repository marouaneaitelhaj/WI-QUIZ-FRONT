import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import Message from '../Models/Message';
import { MessageService } from './message.service';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: any
  messages: BehaviorSubject<Message[]> = this.messageService.messages;

  constructor(private messageService: MessageService) {
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = 'http://localhost:8080/chat-socket';
    const socket = new SockJS(url);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onclose = (event: CloseEvent) => {
      console.error('WebSocket connection closed:', event);
    };

    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log('WebSocket connection established');
      var _this = this;
      this.stompClient.subscribe('/topic/public', function (message: any) {
        const data = JSON.parse(message.body);
        let messageRsp : Message = {} as Message;
        messageRsp.content = data.content;
        messageRsp.sender_id = data.sender.id;
        messageRsp.room_id = data.room.id;
        messageRsp.id = data.id;
        _this.messages.next(_this.messages.getValue().concat([messageRsp]));
      });
    });
  }

  sendMessage(Message: Message) {
    this.stompClient.send('/app/chat', {}, JSON.stringify(Message))
  }
}
