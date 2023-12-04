import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Level from 'src/app/Models/Level';
import Subject from 'src/app/Models/Subject';
import Question from 'src/app/Models/Question';
import { MyResponse } from 'src/app/Response/Response';
import { LevelService } from 'src/app/Services/level.service';
import { QuestionService } from 'src/app/Services/question.service';
import { SubjectService } from 'src/app/Services/subject.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css'],
  providers: [QuestionService, LevelService, SubjectService]
})
export class QuestionPageComponent {
  service: QuestionService;
  showPopup: boolean = false;
  needConfirm: boolean = false;
  levels: Level[] = [];
  showAlert: boolean = false;
  levelService: LevelService;
  questions: Question[] = [];
  subjectService :SubjectService;
  subjects: Subject[] = [];
  message: string = "";
  question: Question = new Question();
  functionType: FunctionType = FunctionType.save;
  constructor(service: QuestionService, levelService: LevelService,subjectService:SubjectService) {
    this.service = service;
    this.levelService = levelService;
    this.subjectService = subjectService;
  }
  ngOnInit(): void {
    this.service.findAll().subscribe((data: MyResponse<Question>) => {
      this.questions = data.content;
    });
    this.levelService.findAll().subscribe((data: MyResponse<Level>) => {
      this.levels = data.content;
    });
    this.subjectService.findAll().subscribe((data: MyResponse<Subject>) => {
      this.subjects = data.content;
    });
  }
  togglePopUp(question?: Question) {
    if (question) {
      this.functionType = FunctionType.update;
      this.question = question;
    } else {
      this.functionType = FunctionType.save;
      this.question = new Question();
    }
    this.showPopup = !this.showPopup;
  }
  findAll() {
    this.service.findAll().subscribe((data: MyResponse<Question>) => {
      this.questions = data.content;
    });
  }
  submit(question: Question) {
    if (this.functionType == FunctionType.save) {
      this.service.save(question).subscribe((data: MyResponse<Question>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
      });
    } else {
      this.service.update(question).subscribe((data: MyResponse<Question>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
      });
    }
  }
  delete(question: Question, confirmed?: boolean) {
    if (confirmed ) {
      this.service.delete(question.id).subscribe((data: MyResponse<Question>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
        this.needConfirm = false;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
        this.needConfirm = false;
      });
    } else if (confirmed == null) {
      this.question = question;
      this.showAlert = true;
      this.needConfirm = true;
    } else {
      this.question = question;
      this.showAlert = false;
      this.needConfirm = false;
    }
  }
}
