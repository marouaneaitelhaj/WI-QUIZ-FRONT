import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import AssignQuiz from '../Models/AssignQuiz';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class AssignQuizService {
  private url = 'http://localhost:8080/assignQuiz';
  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<MyResponse<AssignQuiz>> {
    return this.http.get<MyResponse<AssignQuiz>>(this.url);
  }
  public save(assignQuiz: AssignQuiz): Observable<MyResponse<AssignQuiz>> {
    return this.http.post<MyResponse<AssignQuiz>>(this.url, assignQuiz);
  }
  public update(assignQuiz: AssignQuiz): Observable<MyResponse<AssignQuiz>> {
    return this.http.put<MyResponse<AssignQuiz>>(this.url + "/" + assignQuiz.id, assignQuiz);
  }
  public delete(id: number): Observable<MyResponse<AssignQuiz>> {
    return this.http.delete<MyResponse<AssignQuiz>>(this.url + "/" + id);
  }
}
