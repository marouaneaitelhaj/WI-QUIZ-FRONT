import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';
import Message from '../Models/Message';
import { MessageService } from './message.service';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: any
  messages: BehaviorSubject<Message[]> = this.messageService.messages;
  roomID: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  isLogin : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private messageService: MessageService) {
    this.initConnectionSocket();
    if(localStorage.getItem('id')){
      this.isLogin.next(true);
    }
  }
  

  initConnectionSocket() {
    const url = 'http://localhost:8080/chat-socket';
    const socket = new SockJS(url);

    socket.onopen = () => {
      // console.log('WebSocket connection opened');
    };

    socket.onclose = (event: CloseEvent) => {
      // console.error('WebSocket connection closed:', event);
    };

    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log('WebSocket connection established');
    });
  }
  updateRoomID(newRoomID: number) {
    this.roomID.next(newRoomID);
    var _this = this;
    this.messageService.findAll(newRoomID);
    this.stompClient.subscribe('/topic/' + newRoomID, function (message: any) {
      const data = JSON.parse(message.body);
        let messageRsp: Message = {} as Message;
        messageRsp.content = data.content;
        messageRsp.sender_id = data.sender.id;
        messageRsp.room_id = data.room.id;
        messageRsp.sender = data.sender;
        messageRsp.time = data.time;
        messageRsp.id = data.id;
        // console.log(messageRsp);
        _this.messages.next(_this.messages.getValue().reverse().concat([messageRsp]).reverse());
    });
  }


  sendMessage(Message: Message) {
    this.stompClient.send('/app/chat/' + this.roomID.getValue(), {}, JSON.stringify(Message))
  }

  login(form : any) {
    var _this = this;
      // console.log(form);
      this.stompClient.send('/app/login', {}, JSON.stringify(form))
      this.stompClient.subscribe('/topic/login', function (message: any) {
        const data = JSON.parse(message.body);
        if(data.body.login){
          console.log(data);
          localStorage.setItem('id', data.body.content.id);
          _this.isLogin.next(true);
        }
      }
    );
  }
}
