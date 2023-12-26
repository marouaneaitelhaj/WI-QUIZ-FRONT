import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Response from 'src/app/Models/Response';
import { QuestionService } from 'src/app/Services/question.service';
import { ResponseService } from 'src/app/Services/response.service';
@Component({
  selector: 'app-response-popup',
  templateUrl: './response.popup.component.html',
  styleUrls: ['./response.popup.component.css']
})
export class ResponsePopupComponent implements OnChanges {
  @Output() show = new EventEmitter<boolean>();
  @Input() response: Response = new Response();
  responsePopupForm: FormGroup = new FormBuilder().group({
    id: [this.response.id || 0],
    response: [this.response.response || '', Validators.required],
  });
  ngOnChanges(changes: SimpleChanges): void {
    this.responsePopupForm = new FormBuilder().group({
      id: [this.response.id || 0],
      response: [this.response.response || '', Validators.required],
    });
  }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if (this.responsePopupForm.value.id === 0) {
      this.responseService.save(this.responsePopupForm.value)
    } else {
      this.responseService.update(this.responsePopupForm.value)
    }
    this.togglePopUp();
  }
  constructor(private responseService: ResponseService) { }
}
