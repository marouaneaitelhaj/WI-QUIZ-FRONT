import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { Response } from 'src/app/Models/Models';
@Component({
  selector: 'app-response-popup',
  templateUrl: './response.popup.component.html',
  styleUrls: ['./response.popup.component.css']
})
export class ResponsePopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Response>();
  @Input() response: Response = new Response();
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.submitEvent.emit(this.response);
    this.togglePopUp();
  }
}
