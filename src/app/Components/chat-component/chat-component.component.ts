import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import Message from 'src/app/Models/Message';
import Room from 'src/app/Models/Room';
import { ChatService } from 'src/app/Services/chat-service.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent implements OnChanges {
  @Input() selectedRoom: Room = {} as Room;
  messages : Observable<Message[]> = this.chatService.messages;
  constructor(private chatService : ChatService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedRoom.id) {
      this.chatService.updateRoomID(this.selectedRoom.id);
    }
  }
  message: Message = {} as Message;
  sendMessage() {
    this.message.room_id = this.selectedRoom.id;
    this.message.sender_id = 6;
    this.chatService.sendMessage(this.message);
    this.message.content = '';
  }
}
