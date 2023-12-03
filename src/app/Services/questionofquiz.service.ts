import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Questionofquiz from '../Models/Questionofquiz';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class QuestionofquizService {
  private url = 'http://localhost:8080/questionofquiz';
  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<MyResponse<Questionofquiz>> {
    return this.http.get<MyResponse<Questionofquiz>>(this.url);
  }
  public save(questionofquiz: Questionofquiz): Observable<MyResponse<Questionofquiz>> {
    return this.http.post<MyResponse<Questionofquiz>>(this.url, questionofquiz);
  }
  public update(questionofquiz: Questionofquiz): Observable<MyResponse<Questionofquiz>> {
    return this.http.put<MyResponse<Questionofquiz>>(this.url + "/" + questionofquiz.id, questionofquiz);
  }
  public delete(id: number): Observable<MyResponse<Questionofquiz>> {
    return this.http.delete<MyResponse<Questionofquiz>>(this.url + "/" + id);
  }
}
