import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Question from 'src/app/Models/Question';
import Response from 'src/app/Models/Response';
import Validation from 'src/app/Models/Validation';
import { QuestionService } from 'src/app/Services/question.service';
import { ResponseService } from 'src/app/Services/response.service';
import { ValidationService } from 'src/app/Services/validation.service';
@Component({
  selector: 'app-validation-popup',
  templateUrl: './validation.popup.component.html',
  styleUrls: ['./validation.popup.component.css']
})
export class ValidationPopupComponent implements OnChanges {
  @Output() show = new EventEmitter<boolean>();
  @Input() validation: Validation = new Validation();
  questions: Observable<Question[]> = this.questionService.questions;
  responses: Observable<Response[]> = this.responseService.responses;
  validationPopupForm: FormGroup = new FormBuilder().group({
    id: [this.validation.id || 0],
    question_id: [this.validation.question.id || 0, Validators.required],
    response_id: [this.validation.response.id || 0, Validators.required],
    correct: [this.validation.correct || false, Validators.required],
    points: [this.validation.points || '', Validators.required],
  });
  ngOnChanges(changes: SimpleChanges): void {
    this.validationPopupForm = new FormBuilder().group({
      id: [this.validation.id || 0],
      question_id: [this.validation?.question?.id || 0, Validators.required],
      response_id: [this.validation?.response?.id || 0, Validators.required],
      correct: [this.validation.correct || false, Validators.required],
      points: [this.validation.points || '', Validators.required],
    });
  }
  constructor(private questionService: QuestionService, private validationService: ValidationService, private responseService: ResponseService) { }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if (this.validationPopupForm.value.id === 0) {
      this.validationService.save(this.validationPopupForm.value)
    } else {
      this.validationService.update(this.validationPopupForm.value)
    }
    this.togglePopUp();
  }
}
