import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Student from '../Models/Student';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'http://localhost:8080/student';
  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<MyResponse<Student>> {
    return this.http.get<MyResponse<Student>>(this.url);
  }
  public save(student: Student): Observable<MyResponse<Student>> {
    return this.http.post<MyResponse<Student>>(this.url, student);
  }
  public update(student: Student): Observable<MyResponse<Student>> {
    return this.http.put<MyResponse<Student>>(this.url + "/" + student.id, student);
  }
  public delete(id: number): Observable<MyResponse<Student>> {
    return this.http.delete<MyResponse<Student>>(this.url + "/" + id);
  }
}
