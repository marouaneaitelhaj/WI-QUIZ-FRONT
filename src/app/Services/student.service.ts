import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Student from '../Models/Student';
import { MyResponse } from '../Response/Response';
import { AlertService } from '../Components/alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'http://localhost:8080/student';
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.findAll();
  }
  public students = new BehaviorSubject<Student[]>([]);
  public findAll(): void {
    this.http.get<MyResponse<Student>>(this.url).subscribe(
      (response) => {
        this.students.next(response.content);
      }
    )
  }
  public save(student: Student): void {
    this.http.post<MyResponse<Student>>(this.url, student).subscribe(
      (response) => {
        this.students.next(this.students.getValue().concat([response.data]));
        this.alertService.showMsg("Student saved successfully");
      },
      error => {
        this.alertService.showMsg("Failed to save student");
      }
    )
  }
  public update(student: Student): void {
    this.http.put<MyResponse<Student>>(this.url + "/" + student.id, student).subscribe(
      (response) => {
        const students = this.students.getValue();
        const index = students.findIndex((s) => s.id === student.id);
        students[index] = response.data;
        this.students.next(students);
        this.alertService.showMsg("Student updated successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to update student");
      }
    )
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Student>>(this.url + "/" + id).subscribe(
      (response) => {
        const students = this.students.getValue();
        const index = students.findIndex((s) => s.id === id);
        students.splice(index, 1);
        this.students.next(students);
        this.alertService.showMsg("Student deleted successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to delete student");
      }
    )
  }
}
