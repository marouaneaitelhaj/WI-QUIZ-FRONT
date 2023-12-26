import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Quiz from 'src/app/Models/Quiz';
import Teacher from 'src/app/Models/Teacher';
import { QuizService } from 'src/app/Services/quiz.service';
import { TeacherService } from 'src/app/Services/teacher.service';
@Component({
  selector: 'app-quiz-popup',
  templateUrl: './quiz.popup.component.html',
  styleUrls: ['./quiz.popup.component.css']
})
export class QuizPopupComponent implements OnChanges {
  @Output() show = new EventEmitter<boolean>();
  @Input() quiz: Quiz = new Quiz();
  teachers: Observable<Teacher[]> = this.teacherService.teachers;
  quizPopupForm : FormGroup = new FormBuilder().group({});
  constructor(private teacherService : TeacherService, private quizService : QuizService){}
  ngOnChanges(changes: SimpleChanges): void {
    this.quizPopupForm = new FormBuilder().group({
      successResult : [this.quiz?.successResult || '',Validators.required],
      answerAccess : [this.quiz?.answerAccess || '',Validators.required],
      resultAccess : [this.quiz?.resultAccess || '',Validators.required],
      numberOfChances : [this.quiz?.numberOfChances || '',Validators.required],
      comment : [this.quiz?.comment || '',Validators.required],
      teacher_id : [this.quiz?.teacher.id || '',Validators.required],
      id : [this.quiz?.id || 0],
    });
  }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if(this.quizPopupForm.value.id == 0){
      this.quizService.save(this.quizPopupForm.value);
    }else{
      this.quizService.update(this.quizPopupForm.value);
    }
    this.togglePopUp();
  }
}
