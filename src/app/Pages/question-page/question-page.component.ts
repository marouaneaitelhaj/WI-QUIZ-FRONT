import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Level from 'src/app/Models/Level';
import Subject from 'src/app/Models/Subject';
import Question from 'src/app/Models/Question';
import { MyResponse } from 'src/app/Response/Response';
import { LevelService } from 'src/app/Services/level.service';
import { QuestionService } from 'src/app/Services/question.service';
import { SubjectService } from 'src/app/Services/subject.service';
import AlertProps from 'src/app/Components/alert/alertProps';
import { AlertService } from 'src/app/Components/alert/alert.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css'],
})
export class QuestionPageComponent {
  showPopup: boolean = false;
  needConfirm: boolean = false;
  levels: Level[] = [];
  showAlert: boolean = false;
  questions: Question[] = [];
  subjects: Subject[] = [];

  question: Question = {} as Question;
  functionType: FunctionType = FunctionType.save;
  constructor(private service: QuestionService, private alertService: AlertService) {
  }
  togglePopUp(question?: Question) {
    if (question) {
      this.functionType = FunctionType.update;
      this.question = question;
    } else {
      this.functionType = FunctionType.save;
      this.question = {} as Question;
    }
    this.showPopup = !this.showPopup;
  }
  submit(question: Question) {
    if (this.functionType == FunctionType.save) {
      this.service.save(question)
    } else {
      this.service.update(question)
    }
  }
  delete(question: Question, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(question.id)
    } else if (confirmed == null) {
      this.question = question;
      this.alertService.showConfirm("Are you sure you want to delete this question?");
    } else {
      this.question = question;
      this.alertService.hide()
    }
  }
  ngAfterContentInit() {
    this.service.questions.subscribe(
      (questions) => {
        this.questions = questions;
      }
    );
  }
}
