import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Question from 'src/app/Models/Question';
import Response from 'src/app/Models/Response';
import Validation from 'src/app/Models/Validation';
@Component({
  selector: 'app-validation-popup',
  templateUrl: './validation.popup.component.html',
  styleUrls: ['./validation.popup.component.css']
})
export class ValidationPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Validation>();
  @Input() validations: Validation[] = [];
  @Input() validation: Validation = new Validation();
  @Input() questions: Question[] = [];
  @Input() responses: Response[] = [];
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.submitEvent.emit(this.validation);
    this.togglePopUp();
  }
}
