import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  show: boolean = false;
  closeSideBar() {
    console.log('closeSideBar');
    this.show = !this.show;
  }
}
