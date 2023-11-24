import { Component } from '@angular/core';
import { SideBarComponent } from './components/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sideBarOpened : boolean = true;
  closeSideBar(){
    this.sideBarOpened = !this.sideBarOpened;
  }
}
