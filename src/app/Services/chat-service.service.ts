import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import Message from '../Models/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: any
  private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor() {
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
    });
  }

  joinRoom(roomId: String) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic', (messages: any) => {
        const messageContent = JSON.parse(messages.body);

        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);
        this.messageSubject.next(currentMessage);
      })
    })
  }

  sendMessage(Message: Message) {
    this.stompClient.send('/app/chat', {}, JSON.stringify(Message))
  }


  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
