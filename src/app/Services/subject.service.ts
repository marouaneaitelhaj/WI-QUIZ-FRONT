import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Subject from '../Models/Subject';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url = 'http://localhost:8080/subject';
  public subjects = new BehaviorSubject<Subject[]>([]);
  constructor(private http: HttpClient) {
    this.findAll();
  }
  public findAll(): void {
    this.http.get<MyResponse<Subject>>(this.url).subscribe(
      (response) => {
        this.subjects.next(response.content);
      }
    );
  }
  public save(subject: Subject): any {
    this.http.post<MyResponse<Subject>>(this.url, subject).subscribe(
      (response) => {
        this.subjects.next(this.subjects.getValue().concat([response.data]));
        return response.message;
      },
      (error) => {
        return error.error.message;
      },
    );
  }
  public update(subject: Subject): any {
    this.http.put<MyResponse<Subject>>(this.url + "/" + subject.id, subject).subscribe(
      (response) => {
        const subjects = this.subjects.getValue();
        const index = subjects.findIndex((s) => s.id === subject.id);
        subjects[index] = response.data;
        this.subjects.next(subjects);
        return response.message;
      },
      (error) => {
        return error.error.message;
      }
    );
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Subject>>(this.url + "/" + id).subscribe(
      (response) => {
        const subjects = this.subjects.getValue();
        const index = subjects.findIndex((s) => s.id === id);
        subjects.splice(index, 1);
        this.subjects.next(subjects);
      }
    );
  }
}
