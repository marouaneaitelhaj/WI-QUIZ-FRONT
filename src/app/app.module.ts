import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubjectPageComponent } from './Subject/subject-page/subject-page.component';
import { SubjectCardComponent } from './Subject/subject-card/subject-card.component';
import { QuestionPageComponent } from './Question/question-page/question-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './Shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SubjectPageComponent,
    SubjectCardComponent,
    QuestionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
