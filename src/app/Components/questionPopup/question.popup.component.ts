import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { QuestionType } from 'src/app/Enums/QuestionType';
import Level from 'src/app/Models/Level';
import Subject from 'src/app/Models/Subject';
import Question from 'src/app/Models/Question';
import { MyResponse } from 'src/app/Response/Response';
import { LevelService } from 'src/app/Services/level.service';
import { SubjectService } from 'src/app/Services/subject.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/Services/question.service';
@Component({
  selector: 'app-question-popup',
  templateUrl: './question.popup.component.html',
  styleUrls: ['./question.popup.component.css']
})
export class QuestionPopupComponent implements OnChanges {
  @Output() show = new EventEmitter<boolean>();
  @Input() question: Question = {} as Question;
  levels: Observable<Level[]> = this.levelService.levels;
  subjects: Observable<Subject[]> = this.subjectService.subjects;
  keysOfQuestionTypes = Object.keys(QuestionType);
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if (this.questionPopupForm.value.id === 0) {
      this.questionService.save(this.questionPopupForm.value)
    } else {
      this.questionService.update(this.questionPopupForm.value)
    }
    this.togglePopUp();
  }
  questionPopupForm: FormGroup = new FormBuilder().group({
    id: [this.question.id || 0],
    question: [this.question.question || '', Validators.required],
    numberOfAnswers: [this.question.numberOfAnswers || '', Validators.required],
    numberOfCorrectAnswers: [this.question.numberOfCorrectAnswers || '', Validators.required],
    questionType: [this.question.questionType || QuestionType.SINGLE_CHOICE, Validators.required],
    points: [this.question.points || '', Validators.required],
    time: [this.question.time || '', Validators.required],
    level_id: [this.question?.level?.id || 0, Validators.required],
    subject_id: [this.question?.subject?.id || 0, Validators.required],
  });
  ngOnChanges(changes: SimpleChanges): void {
    this.questionPopupForm = new FormBuilder().group({
      id: [this.question.id || 0],
      question: [this.question.question || '', Validators.required],
      numberOfAnswers: [this.question.numberOfAnswers || '', Validators.required],
      numberOfCorrectAnswers: [this.question.numberOfCorrectAnswers || '', Validators.required],
      questionType: [this.question.questionType || QuestionType.SINGLE_CHOICE, Validators.required],
      points: [this.question.points || '', Validators.required],
      time: [this.question.time || '', Validators.required],
      level_id: [this.question?.level?.id || 0, Validators.required],
      subject_id: [this.question?.subject?.id || 0, Validators.required],
    });
  }
  constructor(private questionService: QuestionService, private levelService: LevelService, private subjectService: SubjectService) { }
}
