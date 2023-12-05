import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Subject from 'src/app/Models/Subject';
import TopSubject from 'src/app/Models/TopSubject';
@Component({
  selector: 'app-subject-popup',
  templateUrl: './subject.popup.component.html',
  styleUrls: ['./subject.popup.component.css']
})
export class SubjectPopupComponent implements OnChanges {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Subject>();
  @Input() subjects: Subject[] = [];
  @Input() subject: Subject = new Subject();
  top: TopSubject = new TopSubject();
  ngOnChanges(changes: SimpleChanges): void {
    if(this.subject.top){
      this.top = this.subject.top;
    }
  }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if(this.top.id != 0){
      this.subject.top = this.top;
    }
    this.submitEvent.emit(this.subject);
    this.togglePopUp();
  }
}
