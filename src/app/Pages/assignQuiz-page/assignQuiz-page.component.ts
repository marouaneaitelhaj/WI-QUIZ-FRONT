import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { AssignQuizService } from 'src/app/Services/assignQuiz.service';
import AssignQuiz from 'src/app/Models/AssignQuiz';
import { AlertService } from 'src/app/Components/alert/alert.service';

@Component({
  selector: 'app-assignQuiz-page',
  templateUrl: './assignQuiz-page.component.html',
  styleUrls: ['./assignQuiz-page.component.css'],
})
export class AssignQuizPageComponent {  
  showPopup: boolean = false;
  assignQuizs: AssignQuiz[] = [];
  assignQuiz: AssignQuiz = new AssignQuiz();
  functionType: FunctionType = FunctionType.save;
  constructor(private service: AssignQuizService, private alertService: AlertService) {
  }
  togglePopUp(assignQuiz?: AssignQuiz) {
    if (assignQuiz) {
      this.functionType = FunctionType.update;
      this.assignQuiz = assignQuiz;
    } else {
      this.functionType = FunctionType.save;
      this.assignQuiz = new AssignQuiz();
    }
    this.showPopup = !this.showPopup;
  }
  submit(assignQuiz: AssignQuiz) {
    if (this.functionType == FunctionType.save) {
      this.service.save(assignQuiz)
    } else {
      this.service.update(assignQuiz)
    }
  }
  delete(assignQuiz: AssignQuiz, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(assignQuiz.id)
    } else if (confirmed == null) {
      this.assignQuiz = assignQuiz;
      this.alertService.showConfirm("Are you sure you want to delete this assignQuiz?");
    } else {
      this.assignQuiz = assignQuiz;
      this.alertService.hide()
    }
  }
  ngAfterContentInit() {
    this.service.assignQuizs.subscribe(
      (assignQuizs) => {
        this.assignQuizs = assignQuizs;
      }
    );
  }
}
