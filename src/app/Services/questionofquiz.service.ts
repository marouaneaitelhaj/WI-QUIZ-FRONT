import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Questionofquiz from '../Models/Questionofquiz';
import { MyResponse } from '../Response/Response';
import { AlertService } from '../Components/alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class QuestionofquizService {
  private url = 'http://localhost:8080/questionofquiz';
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.findAll();
  }
  public questionofquizs = new BehaviorSubject<Questionofquiz[]>([]);
  public findAll(): void {
    this.http.get<MyResponse<Questionofquiz>>(this.url).subscribe(
      (response) => {
        this.questionofquizs.next(response.content);
      }
    );
  }
  public save(questionofquiz: Questionofquiz): void {
    this.http.post<MyResponse<Questionofquiz>>(this.url, questionofquiz).subscribe(
      (response) => {
        this.questionofquizs.next(this.questionofquizs.getValue().concat([response.data]));
        this.alertService.showMsg("Questionofquiz saved successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to save questionofquiz");
      }
    );
  }
  public update(questionofquiz: Questionofquiz): void {
    this.http.put<MyResponse<Questionofquiz>>(this.url + "/" + questionofquiz.id, questionofquiz).subscribe(
      (response) => {
        const questionofquizs = this.questionofquizs.getValue();
        const index = questionofquizs.findIndex((s) => s.id === questionofquiz.id);
        questionofquizs[index] = response.data;
        this.questionofquizs.next(questionofquizs);
        this.alertService.showMsg("Questionofquiz updated successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to update questionofquiz");
      }
    )
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Questionofquiz>>(this.url + "/" + id).subscribe(
      (response) => {
        const questionofquizs = this.questionofquizs.getValue();
        const index = questionofquizs.findIndex((s) => s.id === id);
        questionofquizs.splice(index, 1);
        this.questionofquizs.next(questionofquizs);
        this.alertService.showMsg("Questionofquiz deleted successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to delete questionofquiz");
      }
    )
  }
}
