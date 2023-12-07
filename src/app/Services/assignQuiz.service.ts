import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import AssignQuiz from '../Models/AssignQuiz';
import { MyResponse } from '../Response/Response';
import { AlertService } from '../Components/alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class AssignQuizService {
  private url = 'http://localhost:8080/assignquiz';
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.findAll();
  }
  public assignQuizs = new BehaviorSubject<AssignQuiz[]>([]);
  public findAll(): void {
    this.http.get<MyResponse<AssignQuiz>>(this.url).subscribe(
      (response) => {
        this.assignQuizs.next(response.content);
      }
    )
  }
  public save(assignQuiz: AssignQuiz): void {
    this.http.post<MyResponse<AssignQuiz>>(this.url, assignQuiz).subscribe(
      (response) => {
        const assignQuizs = this.assignQuizs.getValue();
        assignQuizs.push(response.data);
        this.assignQuizs.next(assignQuizs);
      }
    )
  }
  public update(assignQuiz: AssignQuiz): void {
    this.http.put<MyResponse<AssignQuiz>>(this.url + "/" + assignQuiz.id, assignQuiz).subscribe(
      (response) => {
        const assignQuizs = this.assignQuizs.getValue();
        const index = assignQuizs.findIndex((s) => s.id === assignQuiz.id);
        assignQuizs[index] = response.data;
        this.assignQuizs.next(assignQuizs);
      }
    )
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<AssignQuiz>>(this.url + "/" + id).subscribe(
      (response) => {
        const assignQuizs = this.assignQuizs.getValue();
        const index = assignQuizs.findIndex((s) => s.id === id);
        assignQuizs.splice(index, 1);
        this.assignQuizs.next(assignQuizs);
      }
    )
  }
}
