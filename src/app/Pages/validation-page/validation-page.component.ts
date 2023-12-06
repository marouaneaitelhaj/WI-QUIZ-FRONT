import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { ValidationService } from 'src/app/Services/validation.service';
import Validation from 'src/app/Models/Validation';
import { QuestionService } from 'src/app/Services/question.service';
import { ResponseService } from 'src/app/Services/response.service';
import Question from 'src/app/Models/Question';
import Response from 'src/app/Models/Response';

@Component({
  selector: 'app-validation-page',
  templateUrl: './validation-page.component.html',
  styleUrls: ['./validation-page.component.css'],
})
export class ValidationPageComponent {
  service: ValidationService;
  questionService: QuestionService;
  responseService: ResponseService;
  showPopup: boolean = false;
  needConfirm: boolean = false;
  showAlert: boolean = false;
  validations: Validation[] = [];
  message: string = "";
  validation: Validation = new Validation();
  functionType: FunctionType = FunctionType.save;
  questions  : Question[] = [];
  responses : Response[] = [];
  constructor(service: ValidationService, questionService: QuestionService, responseService: ResponseService) {
    this.service = service;
    this.questionService = questionService;
    this.responseService = responseService;
  }
  ngOnInit(): void {
    this.service.findAll().subscribe((data: MyResponse<Validation>) => {
      this.validations = data.content;
    });
    this.questionService.findAll().subscribe((data: MyResponse<Question>) => {
      this.questions = data.content;
    });
    this.responseService.findAll().subscribe((data: MyResponse<Response>) => {
      this.responses = data.content;
    });
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
  findAll() {
    this.service.findAll().subscribe((data: MyResponse<Validation>) => {
      this.validations = data.content;
    });
  }
  submit(validation: Validation) {
    if (this.functionType == FunctionType.save) {
      this.service.save(validation).subscribe((data: MyResponse<Validation>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
      });
    } else {
      this.service.update(validation).subscribe((data: MyResponse<Validation>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
      });
    }
  }
  delete(validation: Validation, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(validation.id).subscribe((data: MyResponse<Validation>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
        this.needConfirm = false;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
        this.needConfirm = false;
      });
    } else if (confirmed == null) {
      this.validation = validation;
      this.showAlert = true;
      this.needConfirm = true;
    } else {
      this.validation = validation;
      this.showAlert = false;
      this.needConfirm = false;
    }
  }
}
