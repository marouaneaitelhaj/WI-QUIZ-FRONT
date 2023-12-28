import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './Components/alert/alert.component';
import { QuestionPopupComponent } from './Components/questionPopup/question.popup.component';
import { QuestionPageComponent } from './Pages/question-page/question-page.component';
import { LevelPageComponent } from './Pages/level-page/level-page.component';
import { ResponsePageComponent } from './Pages/response-page/response-page.component';
import { MediaPageComponent } from './Pages/media-page/media-page.component';
import { ModalComponent } from './Components/modal/modal.component';
import { StudentPageComponent } from './Pages/student-page/student-page.component';
import { QuizPageComponent } from './Pages/quiz-page/quiz-page.component';
import { QuizPopupComponent } from './Components/quizPopup/quiz.popup.component';
import { StudentPopupComponent } from './Components/studentPopup/student.popup.component';
import {StoreModule} from '@ngrx/store';
import { PlayquizComponent } from './Pages/playquiz/playquiz.component';
import { QuestionofquizPageComponent } from './Pages/questionofquiz-page/questionofquiz-page.component';
import { QuestionofquizPopupComponent } from './Components/questionofquizPopup/questionofquiz.popup.component';
import { ValidationPageComponent } from './Pages/validation-page/validation-page.component';
import { ValidationPopupComponent } from './Components/validationPopup/validation.popup.component';
import { AssignQuizPageComponent } from './Pages/assignQuiz-page/assignQuiz-page.component';
import { AssignQuizPopupComponent } from './Components/assignQuizPopup/assignQuiz.popup.component';
import { ChatComponent } from './Pages/chat/chat.component';
import { RoomsComponentComponent } from './Components/rooms-component/rooms-component.component';
import { ChatComponentComponent } from './Components/chat-component/chat-component.component';
// import {myReducer} from './ngrx/myreducer.reducer';


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
    ModalComponent,
    QuizPageComponent,
    StudentPopupComponent,
    QuizPopupComponent,
    StudentPageComponent,
    PlayquizComponent,
    QuestionofquizPageComponent,
    QuestionofquizPopupComponent,
    ValidationPageComponent,
    ValidationPopupComponent,
    AssignQuizPageComponent,
    AssignQuizPopupComponent,
    ChatComponent,
    RoomsComponentComponent,
    ChatComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // StoreModule.forRoot({message : myReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
