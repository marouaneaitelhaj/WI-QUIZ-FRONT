import { Component } from '@angular/core';

@Component({
  selector: 'app-plus-card',
  templateUrl: './plus-card.component.html',
  styleUrls: ['./plus-card.component.css']
})
export class PlusCardComponent {
  popUpOpened: boolean = false;
  openPopUp() {
    this.popUpOpened = true;
  }
}
