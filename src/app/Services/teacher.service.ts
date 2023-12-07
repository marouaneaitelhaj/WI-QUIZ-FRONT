import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Teacher from '../Models/Teacher';
import { MyResponse } from '../Response/Response';
import { AlertService } from '../Components/alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private url = 'http://localhost:8080/teacher';
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.findAll();
  }
  public teachers = new BehaviorSubject<Teacher[]>([]);
  public findAll(): void {
    this.http.get<MyResponse<Teacher>>(this.url).subscribe(
      (response) => {
        this.teachers.next(response.content);
      }
    )
  }
  public save(teacher: Teacher): void {
    this.http.post<MyResponse<Teacher>>(this.url, teacher).subscribe(
      (response) => {
        this.teachers.next(this.teachers.getValue().concat([response.data]));
      }
    )
  }
  public update(teacher: Teacher): void {
    this.http.put<MyResponse<Teacher>>(this.url + "/" + teacher.id, teacher).subscribe(
      (response) => {
        const teachers = this.teachers.getValue();
        const index = teachers.findIndex((s) => s.id === teacher.id);
        teachers[index] = response.data;
        this.teachers.next(teachers);
      }
    )
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Teacher>>(this.url + "/" + id).subscribe(
      (response) => {
        const teachers = this.teachers.getValue();
        const index = teachers.findIndex((s) => s.id === id);
        teachers.splice(index, 1);
        this.teachers.next(teachers);
      }
    )
  }
}
