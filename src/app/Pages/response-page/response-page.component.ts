import { Component } from '@angular/core';
import AlertProps from 'src/app/Components/alert/alertProps';
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
  
  responses: Response[] = [];
  alertprops: AlertProps = new AlertProps();
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
      this.alertprops.showAlert = true;
      this.alertprops.needConfirm = true;
    } else {
      this.response = response;
      this.alertprops.showAlert = false;
      this.alertprops.needConfirm = false;
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
