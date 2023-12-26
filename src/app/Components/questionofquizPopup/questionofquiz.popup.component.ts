import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Question from 'src/app/Models/Question';
import Questionofquiz from 'src/app/Models/Questionofquiz';
import Quiz from 'src/app/Models/Quiz';
import { QuestionService } from 'src/app/Services/question.service';
import { QuestionofquizService } from 'src/app/Services/questionofquiz.service';
import { QuizService } from 'src/app/Services/quiz.service';
@Component({
  selector: 'app-questionofquiz-popup',
  templateUrl: './questionofquiz.popup.component.html',
  styleUrls: ['./questionofquiz.popup.component.css']
})
export class QuestionofquizPopupComponent implements OnChanges {
  @Output() show = new EventEmitter<boolean>();
  @Input() questionofquiz: Questionofquiz = new Questionofquiz();
  quizzes: Observable<Quiz[]> = this.quizService.quizzes;
  questions: Observable<Question[]> = this.questionService.questions;
  questionofquizPopupForm: FormGroup = new FormBuilder().group({
    id: [this.questionofquiz.id || 0],
    question_id: [this.questionofquiz.question?.id, Validators.required],
    quiz_id: [this.questionofquiz.quiz?.id, Validators.required],
  });
  ngOnChanges(changes: SimpleChanges): void {
    this.questionofquizPopupForm = new FormBuilder().group({
      id: [this.questionofquiz.id || 0],
      question_id: [this.questionofquiz.question?.id, Validators.required],
      quiz_id: [this.questionofquiz.quiz?.id, Validators.required],
    });
  }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if (this.questionofquizPopupForm.value.id == 0) {
      this.questionOfQuizService.save(this.questionofquizPopupForm.value);
    } else {
      this.questionOfQuizService.update(this.questionofquizPopupForm.value);
    }
    this.togglePopUp();
  }
  constructor(private questionOfQuizService: QuestionofquizService, private questionService: QuestionService, private quizService: QuizService) { }
}
