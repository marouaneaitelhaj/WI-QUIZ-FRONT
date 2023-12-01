import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectPageComponent } from './Pages/subject-page/subject-page.component';
import { MediaPageComponent } from './Pages/media-page/media-page.component';
import { LevelPageComponent } from './Pages/level-page/level-page.component';
import { ResponsePageComponent } from './Pages/response-page/response-page.component';
import { QuestionPageComponent } from './Pages/question-page/question-page.component';
import Student from './Models/Student';
import { StudentPageComponent } from './Pages/student-page/student-page.component';
import { QuizPageComponent } from './Pages/quiz-page/quiz-page.component';

const routes: Routes = [
  { path: '', component: SubjectPageComponent },
  { path: 'subject', component: SubjectPageComponent },
  { path: 'media', component: MediaPageComponent },
  { path: 'level', component: LevelPageComponent },
  { path: 'response', component: ResponsePageComponent },
  { path: 'question', component: QuestionPageComponent },
  { path: 'student', component: StudentPageComponent },
  { path: 'quiz', component: QuizPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }