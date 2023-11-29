import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { Level } from 'src/app/Models/Models';
@Component({
  selector: 'app-level-popup',
  templateUrl: './level.popup.component.html',
  styleUrls: ['./level.popup.component.css']
})
export class LevelPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Level>();
  @Input() levels: Level[] = [];
  @Input() level: Level = new Level();
  @Input() top: Level = new Level();
  ngOnInit(): void {
    // if (this.level.top)
    //   this.top = this.level.top;
  }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    // if (this.top.id) {
    //   this.level.top = this.top;
    // }
    this.submitEvent.emit(this.level);
    this.togglePopUp();
  }
}
