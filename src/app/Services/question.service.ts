import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Question from '../Models/Question';
import { MyResponse } from '../Response/Response';
import { AlertService } from '../Components/alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private url = 'http://localhost:8080/question';
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.findAll();
  }
  public questions = new BehaviorSubject<Question[]>([]);
  public findAll(): void {
    this.http.get<MyResponse<Question>>(this.url).subscribe(
      (response) => {
        this.questions.next(response.content);
      }
    )
  }
  public save(question: Question): void {
    this.http.post<MyResponse<Question>>(this.url, question).subscribe(
      (response) => {
        this.questions.next(this.questions.getValue().concat([response.data]));
        this.alertService.showMsg("Question saved successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to save question");
      }
    )
  }
  public update(question: Question): void {
    this.http.put<MyResponse<Question>>(this.url + "/" + question.id, question).subscribe(
      (response) => {
        const questions = this.questions.getValue();
        const index = questions.findIndex((s) => s.id === question.id);
        questions[index] = response.data;
        this.questions.next(questions);
        this.alertService.showMsg("Question updated successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to update question");
      }
    )
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Question>>(this.url + "/" + id).subscribe(
      (response) => {
        const questions = this.questions.getValue();
        const index = questions.findIndex((s) => s.id === id);
        questions.splice(index, 1);
        this.questions.next(questions);
        this.alertService.showMsg("Question deleted successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to delete question");
      }
    )
  }
}
