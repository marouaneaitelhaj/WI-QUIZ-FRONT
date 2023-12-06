import { Component } from '@angular/core';
import AlertProps from 'src/app/Components/alert/alertProps';
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
  service: SubjectService;
  showPopup: boolean = false;
  
  subjects: Subject[] = [];
  alertprops: AlertProps = new AlertProps();
  subject: Subject = new Subject();
  functionType: FunctionType = FunctionType.save;
  constructor(service: SubjectService) {
    this.service = service;
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
      this.alertprops.message = this.service.save(subject)
    } else {
      this.alertprops.message = this.service.update(subject)
    }
  }
  delete(subject: Subject, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(subject.id)
    } else if (confirmed == null) {
      this.subject = subject;
      this.alertprops.showAlert = true;
      this.alertprops.needConfirm = true;
    } else {
      this.subject = subject;
      this.alertprops.showAlert = false;
      this.alertprops.needConfirm = false;
    }
  }
  ngAfterContentInit() {
    this.service.subjects.subscribe(
      (subjects) => {
        console.log(subjects);
        this.subjects = subjects;
      }
    );
  }
}
