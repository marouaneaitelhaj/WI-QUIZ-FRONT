import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { Subject, TopSubject } from 'src/app/Models/Models';
@Component({
  selector: 'app-subject-popup',
  templateUrl: './subject.popup.component.html',
  styleUrls: ['./subject.popup.component.css']
})
export class SubjectPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Subject>();
  @Input() subjects: Subject[] = [];
  @Input() subject: Subject = new Subject();
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.submitEvent.emit(this.subject);
    this.togglePopUp();
  }
}
