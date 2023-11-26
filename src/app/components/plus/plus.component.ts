import { Component } from '@angular/core';

@Component({
  selector: 'app-plus',
  templateUrl: './plus.component.html',
})
export class PlusComponent {
   popUpOpened: boolean = false;
  openPopUp() {
    this.popUpOpened = true;
  }
}
