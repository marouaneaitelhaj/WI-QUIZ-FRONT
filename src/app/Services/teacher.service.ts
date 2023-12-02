import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Teacher from '../Models/Teacher';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private url = 'http://localhost:8080/teacher';
  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<MyResponse<Teacher>> {
    return this.http.get<MyResponse<Teacher>>(this.url);
  }
  public save(teacher: Teacher): Observable<MyResponse<Teacher>> {
    return this.http.post<MyResponse<Teacher>>(this.url, teacher);
  }
  public update(teacher: Teacher): Observable<MyResponse<Teacher>> {
    return this.http.put<MyResponse<Teacher>>(this.url + "/" + teacher.id, teacher);
  }
  public delete(id: number): Observable<MyResponse<Teacher>> {
    return this.http.delete<MyResponse<Teacher>>(this.url + "/" + id);
  }
}
