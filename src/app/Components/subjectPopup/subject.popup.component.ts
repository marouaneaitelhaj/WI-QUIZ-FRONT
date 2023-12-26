import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Subject from 'src/app/Models/Subject';
import TopSubject from 'src/app/Models/TopSubject';
import { SubjectService } from 'src/app/Services/subject.service';
@Component({
  selector: 'app-subject-popup',
  templateUrl: './subject.popup.component.html',
  styleUrls: ['./subject.popup.component.css']
})
export class SubjectPopupComponent implements OnChanges {
  @Output() show = new EventEmitter<boolean>();
  subjects: Observable<Subject[]> = this.subjectService.subjects;
  @Input() subject: Subject = new Subject();
  subjectPopupForm: FormGroup = new FormBuilder().group({
    id: [this.subject.id || 0],
    name: [this.subject.name || '', Validators.required],
    top_id: [this.subject.top?.id || 0],
  });
  constructor(private subjectService: SubjectService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.subjectPopupForm = new FormBuilder().group({
      id: [this.subject.id || 0],
      name: [this.subject.name || '', Validators.required],
      top_id: [this.subject.top?.id || 0],
    });
  }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if (this.subjectPopupForm.value.id == 0) {
      this.subjectService.save(this.subjectPopupForm.value)
    } else {
      this.subjectPopupForm.value.id = this.subject.id;
      this.subjectService.update(this.subjectPopupForm.value)
    }
    this.togglePopUp();
  }
}
