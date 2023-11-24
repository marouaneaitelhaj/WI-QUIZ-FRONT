import { Component, Input } from '@angular/core';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  providers: [PopUpComponent]
})
export class SubjectComponent {
  protected popUp: PopUpComponent;
  constructor(private popUpComponent: PopUpComponent) {
    this.popUp = popUpComponent;
  }
  @Input() name: string = '';
  showName: boolean = true;
  toggleShowName() {
    this.showName = !this.showName;
  }
}
