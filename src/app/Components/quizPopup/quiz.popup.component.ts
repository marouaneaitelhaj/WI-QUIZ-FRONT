import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Quiz from 'src/app/Models/Quiz';
import Teacher from 'src/app/Models/Teacher';
@Component({
  selector: 'app-quiz-popup',
  templateUrl: './quiz.popup.component.html',
  styleUrls: ['./quiz.popup.component.css']
})
export class QuizPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Quiz>();
  @Input() quizs: Quiz[] = [];
  @Input() quiz: Quiz = new Quiz();
  @Input() teachers: Teacher[] = [];
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.submitEvent.emit(this.quiz);
    this.togglePopUp();
  }
}
