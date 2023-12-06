import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Quiz from 'src/app/Models/Quiz';
import Teacher from 'src/app/Models/Teacher';
import { TeacherService } from 'src/app/Services/teacher.service';
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
  teachers: Teacher[] = [];
  constructor(private teacherService : TeacherService){}
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.submitEvent.emit(this.quiz);
    this.togglePopUp();
  }
  ngAfterContentInit() {
    this.teacherService.findAll();
    this.teacherService.teachers.subscribe(
      (teachers) => {
        this.teachers = teachers;
      }
    );
  }
}
