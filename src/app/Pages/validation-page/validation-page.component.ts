import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { ValidationService } from 'src/app/Services/validation.service';
import Validation from 'src/app/Models/Validation';
import { QuestionService } from 'src/app/Services/question.service';
import { ResponseService } from 'src/app/Services/response.service';
import Question from 'src/app/Models/Question';
import Response from 'src/app/Models/Response';
import AlertProps from 'src/app/Components/alert/alertProps';
import { AlertService } from 'src/app/Components/alert/alert.service';

@Component({
  selector: 'app-validation-page',
  templateUrl: './validation-page.component.html',
  styleUrls: ['./validation-page.component.css'],
})
export class ValidationPageComponent {
  showPopup: boolean = false;

  validations: Validation[] = [];

  validation: Validation = new Validation();
  functionType: FunctionType = FunctionType.save;
  constructor(private service: ValidationService, private alertService: AlertService) {
  }
  togglePopUp(validation?: Validation) {
    if (validation) {
      this.functionType = FunctionType.update;
      this.validation = validation;
    } else {
      this.functionType = FunctionType.save;
      this.validation = new Validation();
    }
    this.showPopup = !this.showPopup;
  }
  submit(validation: Validation) {
    if (this.functionType == FunctionType.save) {
      this.service.save(validation);
    } else {
      this.service.update(validation);
    }
  }
  delete(validation: Validation, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(validation.id);
    } else if (confirmed == null) {
      this.validation = validation;
      this.alertService.showConfirm("Are you sure you want to delete this validation?");
    } else {
      this.validation = validation;
      this.alertService.hide()
    }
  }
  ngAfterContentInit() {
    this.service.validations.subscribe(
      (validations) => {
        this.validations = validations;
      }
    );
  }
}
