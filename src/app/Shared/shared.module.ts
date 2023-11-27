import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { PlusCardComponent } from './components/plus-card/plus-card.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PopUpComponent,
    PlusCardComponent,
    SideBarComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PopUpComponent,
    PlusCardComponent,
    SideBarComponent,
    InputComponent  
  ],
})
export class SharedModule { }
