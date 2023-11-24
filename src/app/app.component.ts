import { Component } from '@angular/core';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PopUpComponent]
})
export class AppComponent {
  public popUp : PopUpComponent;
  constructor(private popUpComponent: PopUpComponent) {
    this.popUp = popUpComponent;
  }
  sideBarOpened : boolean = true;
  closeSideBar(){
    this.sideBarOpened = !this.sideBarOpened;
  }
}
