import { Component, Inject, Input } from '@angular/core';
import { InputType, Inputs } from '../input/inputs';
import { Subject } from 'src/app/Subject/subject';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {
  @Input() data: Record<string, any> = {};
  protected inputs: InputType[] = [];
  @Input() popUpVisible: boolean = true;
  togglePopUp(): void {
    this.popUpVisible = !this.popUpVisible;
  }
  ngOnInit() {
    this.inputs = new Inputs(this.data).inputs;
    console.log(this.inputs);
  }
}
