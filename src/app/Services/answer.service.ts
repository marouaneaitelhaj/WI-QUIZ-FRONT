import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Answer from '../Models/Answer';
import { MyResponse } from '../Response/Response';
import { AlertService } from '../Components/alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private url = 'http://localhost:8080/answer';
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.findAll();
  }
  public answers = new BehaviorSubject<Answer[]>([]);
  public findAll(): void {
    this.http.get<MyResponse<Answer>>(this.url).subscribe(
      (response) => {
        this.answers.next(response.content);
      }
    )
  }
  public save(answer: Answer[]): Observable<MyResponse<Answer[]>> {
    return this.http.post<MyResponse<Answer[]>>(this.url, answer);
  }
  public update(answer: Answer): void {
    this.http.put<MyResponse<Answer>>(this.url + "/" + answer.id, answer).subscribe(
      (response) => {
        const answers = this.answers.getValue();
        const index = answers.findIndex((s) => s.id === answer.id);
        answers[index] = response.data;
        this.answers.next(answers);
      }
    )
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Answer>>(this.url + "/" + id).subscribe(
      (response) => {
        const answers = this.answers.getValue();
        const index = answers.findIndex((s) => s.id === id);
        answers.splice(index, 1);
        this.answers.next(answers);
      }
    )
  }
}
