import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SubjectComponent } from './components/subject/subject.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { PlusComponent } from './components/plus/plus.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    SubjectComponent,
    SubjectsComponent,
    PlusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
