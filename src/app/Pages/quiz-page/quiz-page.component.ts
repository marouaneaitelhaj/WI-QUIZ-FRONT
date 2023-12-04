import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { QuizService } from 'src/app/Services/quiz.service';
import Quiz from 'src/app/Models/Quiz';
import Teacher from 'src/app/Models/Teacher';
import { TeacherService } from 'src/app/Services/teacher.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
  providers: [QuizService, TeacherService]
})
export class QuizPageComponent {
  service: QuizService;
  teacherService: TeacherService;
  showPopup: boolean = false;
  needConfirm: boolean = false;
  showAlert: boolean = false;
  teachers: Teacher[] = [];
  quizs: Quiz[] = [];
  message: string = "";
  quiz: Quiz = new Quiz();
  functionType: FunctionType = FunctionType.save;
  constructor(service: QuizService, teacherService: TeacherService) {
    this.service = service;
    this.teacherService = teacherService;
  }
  ngOnInit(): void {
    this.service.findAll().subscribe((data: MyResponse<Quiz>) => {
      this.quizs = data.content;
    });
    this.teacherService.findAll().subscribe((data: MyResponse<Teacher>) => {
      this.teachers = data.content;
    });
  }
  togglePopUp(quiz?: Quiz) {
    if (quiz) {
      this.functionType = FunctionType.update;
      this.quiz = quiz;
    } else {
      this.functionType = FunctionType.save;
      this.quiz = new Quiz();
    }
    this.showPopup = !this.showPopup;
  }
  findAll() {
    this.service.findAll().subscribe((data: MyResponse<Quiz>) => {
      this.quizs = data.content;
    });
  }
  submit(quiz: Quiz) {
    if (this.functionType == FunctionType.save) {
      this.service.save(quiz).subscribe((data: MyResponse<Quiz>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
      });
    } else {
      this.service.update(quiz).subscribe((data: MyResponse<Quiz>) => {
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
  delete(quiz: Quiz, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(quiz.id).subscribe((data: MyResponse<Quiz>) => {
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
      this.quiz = quiz;
      this.showAlert = true;
      this.needConfirm = true;
    } else {
      this.quiz = quiz;
      this.showAlert = false;
      this.needConfirm = false;
    }
  }
}
