import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubjectPageComponent } from './Subject/subject-page/subject-page.component';
import { SubjectCardComponent } from './Subject/subject-card/subject-card.component';
import { SubjectComponent } from './Subject/subject/subject.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectPageComponent,
    SubjectCardComponent,
    SubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
