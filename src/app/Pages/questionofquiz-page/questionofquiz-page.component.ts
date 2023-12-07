import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { QuestionofquizService } from 'src/app/Services/questionofquiz.service';
import Questionofquiz from 'src/app/Models/Questionofquiz';
import Question from 'src/app/Models/Question';
import Quiz from 'src/app/Models/Quiz';
import { QuestionService } from 'src/app/Services/question.service';
import { QuizService } from 'src/app/Services/quiz.service';
import AlertProps from 'src/app/Components/alert/alertProps';
import { AlertService } from 'src/app/Components/alert/alert.service';

@Component({
  selector: 'app-questionofquiz-page',
  templateUrl: './questionofquiz-page.component.html',
  styleUrls: ['./questionofquiz-page.component.css'],
})
export class QuestionofquizPageComponent {
  showPopup: boolean = false;
  
  questionofquizs: Questionofquiz[] = [];
  questions : Question[] = [];
  quizzes : Quiz[] = [];
  
  questionofquiz: Questionofquiz = new Questionofquiz();
  functionType: FunctionType = FunctionType.save;
  constructor(private service: QuestionofquizService, private alertService: AlertService) {
  }
  togglePopUp(questionofquiz?: Questionofquiz) {
    if (questionofquiz) {
      this.functionType = FunctionType.update;
      this.questionofquiz = questionofquiz;
    } else {
      this.functionType = FunctionType.save;
      this.questionofquiz = new Questionofquiz();
    }
    this.showPopup = !this.showPopup;
  }
  findAll() {
    this.service.findAll()
  }
  submit(questionofquiz: Questionofquiz) {
    if (this.functionType == FunctionType.save) {
      this.service.save(questionofquiz)
    } else {
      this.service.update(questionofquiz)
    }
  }
  delete(questionofquiz: Questionofquiz, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(questionofquiz.id)
    } else if (confirmed == null) {
      this.questionofquiz = questionofquiz;
      this.alertService.showConfirm("Are you sure you want to delete this questionofquiz?");
    } else {
      this.questionofquiz = questionofquiz;
      this.alertService.hide()
    }
  }
  ngAfterContentInit() {
    this.service.questionofquizs.subscribe(
      (questionofquizs) => {
        this.questionofquizs = questionofquizs;
      }
    );
  }
}
