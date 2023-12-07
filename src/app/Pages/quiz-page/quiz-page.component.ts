import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { QuizService } from 'src/app/Services/quiz.service';
import Quiz from 'src/app/Models/Quiz';
import AlertProps from 'src/app/Components/alert/alertProps';
import { AlertService } from 'src/app/Components/alert/alert.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
})
export class QuizPageComponent {
  showPopup: boolean = false;
  
  quizs: Quiz[] = [];
  
  quiz: Quiz = new Quiz();
  functionType: FunctionType = FunctionType.save;
  constructor(private service: QuizService, private alertService: AlertService) {
  }
  togglePopUp(quiz?: Quiz) {
    if (quiz) {
      this.functionType = FunctionType.update;
      this.quiz = quiz;
    } else {
      this.functionType = FunctionType.save;
      this.quiz = new Quiz();
    }
    this.showPopup = !this.showPopup;
  }
  submit(quiz: Quiz) {
    if (this.functionType == FunctionType.save) {
      this.service.save(quiz)
    } else {
      this.service.update(quiz)
    }
  }
  delete(quiz: Quiz, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(quiz.id)
    } else if (confirmed == null) {
      this.quiz = quiz;
      this.alertService.showConfirm("Are you sure you want to delete this quiz?");
    } else {
      this.quiz = quiz;
      this.alertService.hide()
    }
  }
  ngAfterContentInit() {
    this.service.quizzes.subscribe(
      (quizs) => {
        this.quizs = quizs;
      }
    )
  }
}
