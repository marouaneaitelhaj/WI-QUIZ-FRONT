import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Question from 'src/app/Models/Question';
import Questionofquiz from 'src/app/Models/Questionofquiz';
import Quiz from 'src/app/Models/Quiz';
@Component({
  selector: 'app-questionofquiz-popup',
  templateUrl: './questionofquiz.popup.component.html',
  styleUrls: ['./questionofquiz.popup.component.css']
})
export class QuestionofquizPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Questionofquiz>();
  @Input() questionofquiz: Questionofquiz = new Questionofquiz();
  @Input() quizzes : Quiz[] = [];
  @Input() questions : Question[] = [];
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.submitEvent.emit(this.questionofquiz);
    this.togglePopUp();
  }
}
