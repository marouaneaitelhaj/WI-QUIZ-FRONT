import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { QuestionType } from 'src/app/Enums/QuestionType';
import { Level, Question, Subject } from 'src/app/Models/Models';
import { MyResponse } from 'src/app/Response/Response';
import { LevelService } from 'src/app/Services/level.service';
@Component({
  selector: 'app-question-popup',
  templateUrl: './question.popup.component.html',
  styleUrls: ['./question.popup.component.css']
})
export class QuestionPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Question>();
  @Input() questions: Question[] = [];
  @Input() levelService: LevelService;
  @Input() levels: Level[] = [];
  @Input() subjects: Subject[] = [];
  @Input() subject = new Subject();
  @Input() level: Level = new Level();
  constructor(levelService: LevelService) {
    this.levelService = levelService;
  }
  questionTypes: QuestionType[] = [QuestionType.SINGLE_CHOICE, QuestionType.MULTIPLE_CHOICE];
  @Input() question: Question = new Question();
  @Input() top: Question = new Question();
  ngOnInit(): void {
    console.log(this.level);
  }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if (this.level.id) {
      this.question.level = this.level;
    }
    if (this.subject.id) {
      this.question.subject = this.subject;
    }
    this.submitEvent.emit(this.question);
    this.togglePopUp();
  }
}
