import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FunctionType } from 'src/app/Enums/FunctionType';
import AssignQuiz from 'src/app/Models/AssignQuiz';
import Quiz from 'src/app/Models/Quiz';
import Student from 'src/app/Models/Student';
import { AssignQuizService } from 'src/app/Services/assignQuiz.service';
import { QuizService } from 'src/app/Services/quiz.service';
import { StudentService } from 'src/app/Services/student.service';
@Component({
  selector: 'app-assignQuiz-popup',
  templateUrl: './assignQuiz.popup.component.html',
  styleUrls: ['./assignQuiz.popup.component.css']
})
export class AssignQuizPopupComponent implements OnChanges {
  @Output() show = new EventEmitter<boolean>();
  @Input() assignQuiz: AssignQuiz = new AssignQuiz();
  students : Observable<Student[]> = this.studentService.students;
  quizes : Observable<Quiz[]> = this.quizService.quizzes;
  constructor(private studentService : StudentService, private quizService : QuizService, private assignQuizService : AssignQuizService) {}
  assignQuizPopupForm : FormGroup = new FormBuilder().group({
    id : [this.assignQuiz.id || 0],
    student_id : [this.assignQuiz.student.id || 0, Validators.required],
    quiz_id : [this.assignQuiz.quiz.id || 0, Validators.required],
    score : [this.assignQuiz.score || '', Validators.required],
    notes : [this.assignQuiz.notes || '', Validators.required],
  });
  ngOnChanges() {
    this.assignQuizPopupForm = new FormBuilder().group({
      id : [this.assignQuiz.id || 0],
      student_id : [this.assignQuiz.student.id || 0, Validators.required],
      quiz_id : [this.assignQuiz.quiz.id || 0, Validators.required],
      score : [this.assignQuiz.score || '', Validators.required],
      notes : [this.assignQuiz.notes || '', Validators.required],
    });
  }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if(this.assignQuiz.id == 0) {
      this.assignQuizService.save(this.assignQuizPopupForm.value);
    }else{
      this.assignQuizService.update(this.assignQuizPopupForm.value);
    }
    this.togglePopUp();
  }
}
