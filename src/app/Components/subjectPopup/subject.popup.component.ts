import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { Subject } from 'src/app/Models/Models';
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
  @Input() top: Subject = new Subject();
  ngOnInit(): void {
    if (this.subject.top)
      this.top = this.subject.top;
  }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if (this.top.id) {
      this.subject.top = this.top;
    }
    this.submitEvent.emit(this.subject);
    this.togglePopUp();
  }
}
