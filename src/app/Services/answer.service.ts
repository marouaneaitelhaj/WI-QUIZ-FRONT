import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Answer from '../Models/Answer';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private url = 'http://localhost:8080/answer';
  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<MyResponse<Answer>> {
    return this.http.get<MyResponse<Answer>>(this.url);
  }
  public save(answer: Answer): Observable<MyResponse<Answer>> {
    return this.http.post<MyResponse<Answer>>(this.url, answer);
  }
  public update(answer: Answer): Observable<MyResponse<Answer>> {
    return this.http.put<MyResponse<Answer>>(this.url + "/" + answer.id, answer);
  }
  public delete(id: number): Observable<MyResponse<Answer>> {
    return this.http.delete<MyResponse<Answer>>(this.url + "/" + id);
  }
}
