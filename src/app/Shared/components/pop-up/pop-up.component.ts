import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InputType, Inputs } from '../input/inputs';
import { Subject } from 'src/app/Subject/subject';
import { MyService } from '../../interfaces/MyService';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  @Input() data: Record<string, any> = {};
  @Input() service: MyService;
  @Input() popUpVisible: boolean = true;
  public inputs: InputType[] = [];
  togglePopUp(): void {
    this.popUpVisible = !this.popUpVisible;
  }
  ngOnInit() {
    this.inputs = new Inputs(this.data).inputs;
  }
  constructor(service: MyService) {
    this.service = service;
  }
  submit(): void {
    console.log(this.data);
  }
}
