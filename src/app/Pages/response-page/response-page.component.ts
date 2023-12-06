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
  showPopup: boolean = false;
  needConfirm: boolean = false;
  showAlert: boolean = false;
  responses: Response[] = [];
  message: string = "";
  response: Response = new Response();
  functionType: FunctionType = FunctionType.save;
  constructor(private service: ResponseService) {
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
  submit(response: Response) {
    if (this.functionType == FunctionType.save) {
      this.service.save(response)
    } else {
      this.service.update(response)
    }
  }
  delete(response: Response, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(response.id);
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
  ngAfterContentInit() {
    this.service.responses.subscribe(
      (responses) => {
        this.responses = responses;
      }
    );
  }
}
