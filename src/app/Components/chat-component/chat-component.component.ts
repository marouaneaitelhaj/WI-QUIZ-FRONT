import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import Message from 'src/app/Models/Message';
import Room from 'src/app/Models/Room';
import { ChatService } from 'src/app/Services/chat-service.service';
import { MessageService } from 'src/app/Services/message.service';
import { AppState } from 'src/app/ngrx/AppState';
import { selectMessages } from 'src/app/ngrx/Selectors/messages.selectors';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent implements OnChanges {
  @Input() selectedRoom: Room = {} as Room;
  messages: Observable<Message[]> = this.store.pipe(select(selectMessages));
  constructor(private chatService: ChatService, private store: Store<AppState>) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedRoom.id) {
      this.chatService.updateRoomID(this.selectedRoom.id);
      this.store.dispatch({ type: '[Chat] Load Messages', roomID: this.selectedRoom.id });
    }
  }
  message: Message = {} as Message;
  sendMessage() {
    this.message.room_id = this.selectedRoom.id;
    this.message.sender_id = localStorage.getItem('id') as unknown as number;
    this.chatService.sendMessage(this.message);
    this.message.content = '';
  }
}
