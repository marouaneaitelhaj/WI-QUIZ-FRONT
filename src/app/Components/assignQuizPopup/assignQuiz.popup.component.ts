import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import AssignQuiz from 'src/app/Models/AssignQuiz';
import Quiz from 'src/app/Models/Quiz';
import Student from 'src/app/Models/Student';
import { QuizService } from 'src/app/Services/quiz.service';
import { StudentService } from 'src/app/Services/student.service';
@Component({
  selector: 'app-assignQuiz-popup',
  templateUrl: './assignQuiz.popup.component.html',
  styleUrls: ['./assignQuiz.popup.component.css']
})
export class AssignQuizPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<AssignQuiz>();
  @Input() assignQuizs: AssignQuiz[] = [];
  @Input() assignQuiz: AssignQuiz = new AssignQuiz();
  students : Student[] = [];
  quizes : Quiz[] = [];
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.submitEvent.emit(this.assignQuiz);
    this.togglePopUp();
  }
  constructor(private studentService : StudentService, private quizService : QuizService) {}
  ngAfterViewInit() {
    this.studentService.students.subscribe((data : Student[]) => {
      this.students = data;
    });
    this.quizService.quizzes.subscribe((data : Quiz[]) => {
      this.quizes = data;
    });
  }
}
