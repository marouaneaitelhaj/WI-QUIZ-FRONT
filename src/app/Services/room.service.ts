import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Room from '../Models/Room';
import { MyResponse } from '../Response/Response';
import { AlertService } from '../Components/alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = 'http://localhost:8080/room';
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.findAll();
  }
  public rooms = new BehaviorSubject<Room[]>([]);
  public findAll(): void {
    this.http.get<MyResponse<Room>>(this.url).subscribe(
      (response) => {
        this.rooms.next(response.content);
      }
    );
  }
  public save(room: Room): void {
    this.http.post<MyResponse<Room>>(this.url, room).subscribe(
      (response) => {
        this.rooms.next(this.rooms.getValue().concat([response.data]));
      },
      (error) => {
        this.alertService.showMsg(error.error.message);
      }
    );
  }
  public update(room: Room): void {
    this.http.put<MyResponse<Room>>(this.url + "/" + room.id, room).subscribe(
      (response) => {
        const rooms = this.rooms.getValue();
        const index = rooms.findIndex((s) => s.id === room.id);
        rooms[index] = response.data;
        this.rooms.next(rooms);
        this.alertService.showMsg(response.message);
      },
      (error) => {
        this.alertService.showMsg(error.error.message);
      }
    );
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Room>>(this.url + "/" + id).subscribe(
      (response) => {
        const rooms = this.rooms.getValue();
        const index = rooms.findIndex((s) => s.id === id);
        rooms.splice(index, 1);
        this.rooms.next(rooms);
        this.alertService.showMsg(response.message);
      },
      (error) => {
        this.alertService.showMsg(error.error.message);
      }
    );
  }
}
