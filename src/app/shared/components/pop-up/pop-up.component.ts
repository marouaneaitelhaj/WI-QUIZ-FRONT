import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
})
export class PopUpComponent {
  @Input() popUpVisible: boolean = true;
  @Input() inputs: any = [];
  togglePopUp(): void {
    console.log(this.popUpVisible);
    this.popUpVisible = !this.popUpVisible;
  }
}
