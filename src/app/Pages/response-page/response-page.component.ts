import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Response from 'src/app/Models/Response';
import { MyResponse } from 'src/app/Response/Response';
import { ResponseService } from 'src/app/Services/response.service';

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.css'],
})
export class ResponsePageComponent {
  service: ResponseService;
  showPopup: boolean = false;
  needConfirm: boolean = false;
  showAlert: boolean = false;
  responses: Response[] = [];
  message: string = "";
  response: Response = new Response();
  functionType: FunctionType = FunctionType.save;
  constructor(service: ResponseService) {
    this.service = service;
  }
  ngOnInit(): void {
    this.service.findAll().subscribe((data: MyResponse<Response>) => {
      this.responses = data.content;
    });
  }
  togglePopUp(response?: Response) {
    if (response) {
      this.functionType = FunctionType.update;
      this.response = response;
    } else {
      this.functionType = FunctionType.save;
      this.response = new Response();
    }
    this.showPopup = !this.showPopup;
  }
  findAll() {
    this.service.findAll().subscribe((data: MyResponse<Response>) => {
      this.responses = data.content;
    });
  }
  submit(response: Response) {
    if (this.functionType == FunctionType.save) {
      this.service.save(response).subscribe((data: MyResponse<Response>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
      });
    } else {
      this.service.update(response).subscribe((data: MyResponse<Response>) => {
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
  delete(response: Response, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(response.id).subscribe((data: MyResponse<Response>) => {
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
      this.response = response;
      this.showAlert = true;
      this.needConfirm = true;
    } else {
      this.response = response;
      this.showAlert = false;
      this.needConfirm = false;
    }
  }
}
