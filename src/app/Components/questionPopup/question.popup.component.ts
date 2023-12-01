import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { QuestionType } from 'src/app/Enums/QuestionType';
import Level from 'src/app/Models/Level';
import Subject from 'src/app/Models/Subject';
import Question from 'src/app/Models/Question';
import { MyResponse } from 'src/app/Response/Response';
@Component({
  selector: 'app-question-popup',
  templateUrl: './question.popup.component.html',
  styleUrls: ['./question.popup.component.css']
})
export class QuestionPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Question>();
  @Input() question: Question = new Question();
  @Input() levels: Level[] = [];
  @Input() subjects: Subject[] = [];
  keysOfQuestionTypes = Object.keys(QuestionType);
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.submitEvent.emit(this.question);
    this.togglePopUp();
  }
}
