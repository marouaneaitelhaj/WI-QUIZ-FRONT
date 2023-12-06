import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Response from '../Models/Response';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private url = 'http://localhost:8080/response';
  constructor(private http: HttpClient) {
    this.findAll();
  }
  public responses = new BehaviorSubject<Response[]>([]);
  public findAll(): void {
    this.http.get<MyResponse<Response>>(this.url).subscribe(
      (response) => {
        this.responses.next(response.content);
      }
    )
  }
  public save(response: Response): void {
    this.http.post<MyResponse<Response>>(this.url, response).subscribe(
      (response) => {
        this.responses.next(this.responses.getValue().concat([response.data]));
      }
    );
  }
  public update(response: Response): void {
    this.http.put<MyResponse<Response>>(this.url + "/" + response.id, response).subscribe(
      (rs) => {
        const responses = this.responses.getValue();
        const index = responses.findIndex((s) => s.id === response.id);
        responses[index] = rs.data;
        this.responses.next(responses);
      }
    );
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Response>>(this.url + "/" + id).subscribe(
      (response) => {
        const responses = this.responses.getValue();
        const index = responses.findIndex((s) => s.id === id);
        responses.splice(index, 1);
        this.responses.next(responses);
      }
    );
  }
}
