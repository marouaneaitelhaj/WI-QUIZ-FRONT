import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from '../subject';

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.css']
})
export class SubjectCardComponent {
  @Input() subject: Subject = new Subject(1, "1");
  showName: boolean = true;
  toggleShowName() {
    this.showName = !this.showName;
  }
  openPopUp() {
    this.PopUp.emit(this.subject);
  }
  @Output() PopUp = new EventEmitter<Subject>();
}
