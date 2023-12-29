import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Message from '../Models/Message';
import { MyResponse } from '../Response/Response';
import { AlertService } from '../Components/alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = 'http://localhost:8080/message';
  constructor(private http: HttpClient, private alertService: AlertService) {
  }
  public messages = new BehaviorSubject<Message[]>([]);
  public findAll(room_id: number): void {
    this.http.get<MyResponse<Message>>(this.url + "/room/" + room_id).subscribe(
      (response) => {
        this.messages.next(response.content.reverse());
      }
    );
  }
  public save(message: Message): void {
    this.http.post<MyResponse<Message>>(this.url, message).subscribe(
      (response) => {
        this.messages.next(this.messages.getValue().concat([response.data]));
      },
      (error) => {
        this.alertService.showMsg(error.error.message);
      }
    );
  }
  public update(message: Message): void {
    this.http.put<MyResponse<Message>>(this.url + "/" + message.id, message).subscribe(
      (response) => {
        const messages = this.messages.getValue();
        const index = messages.findIndex((s) => s.id === message.id);
        messages[index] = response.data;
        this.messages.next(messages);
        this.alertService.showMsg(response.message);
      },
      (error) => {
        this.alertService.showMsg(error.error.message);
      }
    );
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Message>>(this.url + "/" + id).subscribe(
      (response) => {
        const messages = this.messages.getValue();
        const index = messages.findIndex((s) => s.id === id);
        messages.splice(index, 1);
        this.messages.next(messages);
        this.alertService.showMsg(response.message);
      },
      (error) => {
        this.alertService.showMsg(error.error.message);
      }
    );
  }
}
