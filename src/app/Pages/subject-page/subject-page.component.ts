import { Component } from '@angular/core';
import { AlertService } from 'src/app/Components/alert/alert.service';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Subject from 'src/app/Models/Subject';
import { MyResponse } from 'src/app/Response/Response';
import { SubjectService } from 'src/app/Services/subject.service';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.css'],
})
export class SubjectPageComponent {
  showPopup: boolean = false;
  subjects: Subject[] = [];
  subject: Subject = new Subject();
  functionType: FunctionType = FunctionType.save;
  constructor(private service: SubjectService, private alertService: AlertService) {
  }
  togglePopUp(subject?: Subject) {
    if (subject) {
      this.functionType = FunctionType.update;
      this.subject = subject;
    } else {
      this.functionType = FunctionType.save;
      this.subject = new Subject();
    }
    this.showPopup = !this.showPopup;
  }
  submit(subject: Subject) {
    if (this.functionType == FunctionType.save) {
      this.service.save(subject)
    } else {
      this.service.update(subject)
    }
  }
  delete(subject: Subject, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(subject.id)
    } else if (confirmed == null) {
      this.subject = subject;
      this.alertService.showConfirm("Are you sure you want to delete this subject?")
    } else {
      this.subject = subject;
      this.alertService.hide();
    }
  }
  ngAfterContentInit() {
    this.service.subjects.subscribe(
      (subjects) => {
        this.subjects = subjects;
      }
    );
  }
}
