import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { InputType } from './inputs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnChanges {
  @Input() input: InputType = new InputType("text", "name", "label", "value");
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
