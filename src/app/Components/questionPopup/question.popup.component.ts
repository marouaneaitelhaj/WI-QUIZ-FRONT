import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { QuestionType } from 'src/app/Enums/QuestionType';
import Level from 'src/app/Models/Level';
import Subject from 'src/app/Models/Subject';
import Question from 'src/app/Models/Question';
import { MyResponse } from 'src/app/Response/Response';
import { LevelService } from 'src/app/Services/level.service';
import { SubjectService } from 'src/app/Services/subject.service';
@Component({
  selector: 'app-question-popup',
  templateUrl: './question.popup.component.html',
  styleUrls: ['./question.popup.component.css']
})
export class QuestionPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Input() question: Question = {} as Question;
  levels: Level[] = [];
  subjects: Subject[] = [];
  keysOfQuestionTypes = Object.keys(QuestionType);
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.togglePopUp();
  }
  constructor(private levelService: LevelService,private subjectService:SubjectService) {}
  ngAfterContentInit() {
    this.levelService.levels.subscribe(
      (levels) => {
        this.levels = levels;
      }
    );
    this.subjectService.subjects.subscribe(
      (subjects) => {
        this.subjects = subjects;
      }
    );
  }
}
