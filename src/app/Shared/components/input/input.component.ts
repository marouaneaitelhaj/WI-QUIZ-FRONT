import { Component, Input } from '@angular/core';
import { InputType } from './inputs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() input: InputType = new InputType("text", "name", "label", "value");
}
