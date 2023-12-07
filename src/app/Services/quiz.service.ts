import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import Quiz from '../Models/Quiz';
import { MyResponse } from '../Response/Response';
import { AlertService } from '../Components/alert/alert.service';
import Question from '../Models/Question';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private url = 'http://localhost:8080/quiz';
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.findAll();
  }
  public quizzes = new BehaviorSubject<Quiz[]>([]);
  public findAll(): void {
    this.http.get<MyResponse<Quiz>>(this.url).subscribe(
      (response) => {
        this.quizzes.next(response.content);
      }
    )
  }
  public save(quiz: Quiz): void {
    this.http.post<MyResponse<Quiz>>(this.url, quiz).subscribe(
      (response) => {
        this.quizzes.next(this.quizzes.getValue().concat([response.data]));
        this.alertService.showMsg("Quiz saved successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to save quiz");
      }
    )
  }
  public update(quiz: Quiz): void {
    this.http.put<MyResponse<Quiz>>(this.url + "/" + quiz.id, quiz).subscribe(
      (response) => {
        const quizzes = this.quizzes.getValue();
        const index = quizzes.findIndex((s) => s.id === quiz.id);
        quizzes[index] = response.data;
        this.quizzes.next(quizzes);
        this.alertService.showMsg("Quiz updated successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to update quiz");
      }
    )
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Quiz>>(this.url + "/" + id).subscribe(
      (response) => {
        const quizzes = this.quizzes.getValue();
        const index = quizzes.findIndex((s) => s.id === id);
        quizzes.splice(index, 1);
        this.quizzes.next(quizzes);
        this.alertService.showMsg("Quiz deleted successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to delete quiz");
      }
    )
  }
  public findById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(this.url + "/" + id);
  }
}
