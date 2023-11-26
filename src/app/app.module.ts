import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SubjectComponent } from './components/subject/subject.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { PlusComponent } from './components/plus/plus.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { InptComponent } from './components/inpt/inpt.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    SubjectComponent,
    SubjectsComponent,
    PlusComponent,
    PopUpComponent,
    InptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
