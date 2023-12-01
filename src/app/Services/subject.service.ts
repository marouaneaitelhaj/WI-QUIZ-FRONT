import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Subject from '../Models/Subject';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url = 'http://localhost:8080/subject';
  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<MyResponse<Subject>> {
    return this.http.get<MyResponse<Subject>>(this.url);
  }
  public save(subject: Subject): Observable<MyResponse<Subject>> {
    return this.http.post<MyResponse<Subject>>(this.url, subject);
  }
  public update(subject: Subject): Observable<MyResponse<Subject>> {
    return this.http.put<MyResponse<Subject>>(this.url + "/" + subject.id, subject);
  }
  public delete(id: number): Observable<MyResponse<Subject>> {
    return this.http.delete<MyResponse<Subject>>(this.url + "/" + id);
  }
}
