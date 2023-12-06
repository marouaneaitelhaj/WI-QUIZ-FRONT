import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Question from 'src/app/Models/Question';
import Questionofquiz from 'src/app/Models/Questionofquiz';
import Quiz from 'src/app/Models/Quiz';
import { QuestionService } from 'src/app/Services/question.service';
import { QuizService } from 'src/app/Services/quiz.service';
@Component({
  selector: 'app-questionofquiz-popup',
  templateUrl: './questionofquiz.popup.component.html',
  styleUrls: ['./questionofquiz.popup.component.css']
})
export class QuestionofquizPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Questionofquiz>();
  @Input() questionofquiz: Questionofquiz = new Questionofquiz();
  quizzes : Quiz[] = [];
  questions : Question[] = [];
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.submitEvent.emit(this.questionofquiz);
    this.togglePopUp();
  }
  constructor(private questionService: QuestionService,private quizService: QuizService) { }
  ngAfterContentInit() {
    this.questionService.questions.subscribe(
      (questions) => {
        this.questions = questions;
      }
    );
    this.quizService.quizzes.subscribe(
      (quizzes) => {
        this.quizzes = quizzes;
      }
    );
  }
}
