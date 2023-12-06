import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Student from 'src/app/Models/Student';
@Component({
  selector: 'app-student-popup',
  templateUrl: './student.popup.component.html',
  styleUrls: ['./student.popup.component.css']
})
export class StudentPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Student>();
  @Input() student: Student = new Student();
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.submitEvent.emit(this.student);
    this.togglePopUp();
  }
}
