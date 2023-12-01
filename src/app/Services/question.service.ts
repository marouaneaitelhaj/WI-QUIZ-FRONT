import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Question from '../Models/Question';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private url = 'http://localhost:8080/question';
  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<MyResponse<Question>> {
    return this.http.get<MyResponse<Question>>(this.url);
  }
  public save(question: Question): Observable<MyResponse<Question>> {
    return this.http.post<MyResponse<Question>>(this.url, question);
  }
  public update(question: Question): Observable<MyResponse<Question>> {
    return this.http.put<MyResponse<Question>>(this.url + "/" + question.id, question);
  }
  public delete(id: number): Observable<MyResponse<Question>> {
    return this.http.delete<MyResponse<Question>>(this.url + "/" + id);
  }
}
