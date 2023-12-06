import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import Quiz from '../Models/Quiz';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private url = 'http://localhost:8080/quiz';
  constructor(private http: HttpClient) {
  }
  public quizes = new Subject<Quiz[]>();
  public findAll(): Observable<MyResponse<Quiz>> {
    return this.http.get<MyResponse<Quiz>>(this.url);
  }
  public save(quiz: Quiz): Observable<MyResponse<Quiz>> {
    return this.http.post<MyResponse<Quiz>>(this.url, quiz);
  }
  public update(quiz: Quiz): Observable<MyResponse<Quiz>> {
    return this.http.put<MyResponse<Quiz>>(this.url + "/" + quiz.id, quiz);
  }
  public delete(id: number): Observable<MyResponse<Quiz>> {
    return this.http.delete<MyResponse<Quiz>>(this.url + "/" + id);
  }
  public findById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(this.url + "/" + id);
  }
}
