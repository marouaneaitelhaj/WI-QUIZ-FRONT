import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Level from 'src/app/Models/Level';
@Component({
  selector: 'app-level-popup',
  templateUrl: './level.popup.component.html',
  styleUrls: ['./level.popup.component.css']
})
export class LevelPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Input() levels: Level[] = [];
  @Input() level: Level = new Level();
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.togglePopUp();
  }
}
