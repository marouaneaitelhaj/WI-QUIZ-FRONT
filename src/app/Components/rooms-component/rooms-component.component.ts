import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import Room from 'src/app/Models/Room';
import { RoomService } from 'src/app/Services/room.service';

@Component({
  selector: 'app-rooms-component',
  templateUrl: './rooms-component.component.html',
  styleUrls: ['./rooms-component.component.css']
})
export class RoomsComponentComponent {
  @Output() selectedRoom = new EventEmitter<Room>();
  rooms : Observable<Room[]> = this.roomService.rooms;
  constructor(private roomService : RoomService) { }
  selectRoom(room: Room) {
    this.selectedRoom.emit(room);
  }
}
