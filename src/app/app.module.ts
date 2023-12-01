import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { SubjectPageComponent } from './Pages/subject-page/subject-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SubjectPopupComponent } from './Components/subjectPopup/subject.popup.component';
import { LevelPopupComponent } from './Components/levelPopup/level.popup.component';
import { MediaPopupComponent } from './Components/mediaPopup/media.popup.component';
import { ResponsePopupComponent } from './Components/responsePopup/response.popup.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './Components/alert/alert.component';
import { QuestionPopupComponent } from './Components/questionPopup/question.popup.component';
import { QuestionPageComponent } from './Pages/question-page/question-page.component';
import { LevelPageComponent } from './Pages/level-page/level-page.component';
import { ResponsePageComponent } from './Pages/response-page/response-page.component';
import { Media } from './Models/Models';
import { MediaPageComponent } from './Pages/media-page/media-page.component';
import { ModalComponent } from './Components/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SubjectPageComponent,
    AlertComponent,
    MediaPopupComponent,
    LevelPopupComponent,
    SubjectPopupComponent,
    ResponsePopupComponent,
    QuestionPopupComponent,
    QuestionPageComponent,
    LevelPageComponent,
    ResponsePageComponent,
    MediaPopupComponent,
    MediaPageComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
