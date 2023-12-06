import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { QuestionofquizService } from 'src/app/Services/questionofquiz.service';
import Questionofquiz from 'src/app/Models/Questionofquiz';
import Question from 'src/app/Models/Question';
import Quiz from 'src/app/Models/Quiz';
import { QuestionService } from 'src/app/Services/question.service';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-questionofquiz-page',
  templateUrl: './questionofquiz-page.component.html',
  styleUrls: ['./questionofquiz-page.component.css'],
})
export class QuestionofquizPageComponent {
  service: QuestionofquizService;
  questionService: QuestionService;
  quizService: QuizService;
  showPopup: boolean = false;
  needConfirm: boolean = false;
  showAlert: boolean = false;
  questionofquizs: Questionofquiz[] = [];
  questions : Question[] = [];
  quizzes : Quiz[] = [];
  message: string = "";
  questionofquiz: Questionofquiz = new Questionofquiz();
  functionType: FunctionType = FunctionType.save;
  constructor(service: QuestionofquizService, questionService: QuestionService, quizService: QuizService) {
    this.service = service;
    this.questionService = questionService;
    this.quizService = quizService;
  }
  ngOnInit(): void {
    this.service.findAll().subscribe((data: MyResponse<Questionofquiz>) => {
      this.questionofquizs = data.content;
    });
    this.questionService.findAll().subscribe((data: MyResponse<Question>) => {
      this.questions = data.content;
    });
    this.quizService.findAll().subscribe((data: MyResponse<Quiz>) => {
      this.quizzes = data.content;
    });
  }
  togglePopUp(questionofquiz?: Questionofquiz) {
    if (questionofquiz) {
      this.functionType = FunctionType.update;
      this.questionofquiz = questionofquiz;
    } else {
      this.functionType = FunctionType.save;
      this.questionofquiz = new Questionofquiz();
    }
    this.showPopup = !this.showPopup;
  }
  findAll() {
    this.service.findAll().subscribe((data: MyResponse<Questionofquiz>) => {
      this.questionofquizs = data.content;
    });
  }
  submit(questionofquiz: Questionofquiz) {
    if (this.functionType == FunctionType.save) {
      this.service.save(questionofquiz).subscribe((data: MyResponse<Questionofquiz>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
      });
    } else {
      this.service.update(questionofquiz).subscribe((data: MyResponse<Questionofquiz>) => {
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
  delete(questionofquiz: Questionofquiz, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(questionofquiz.id).subscribe((data: MyResponse<Questionofquiz>) => {
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
      this.questionofquiz = questionofquiz;
      this.showAlert = true;
      this.needConfirm = true;
    } else {
      this.questionofquiz = questionofquiz;
      this.showAlert = false;
      this.needConfirm = false;
    }
  }
}
