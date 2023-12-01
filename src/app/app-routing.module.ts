import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectPageComponent } from './Pages/subject-page/subject-page.component';
import { MediaPageComponent } from './Pages/media-page/media-page.component';
import { LevelPageComponent } from './Pages/level-page/level-page.component';
import { ResponsePageComponent } from './Pages/response-page/response-page.component';
import { QuestionPageComponent } from './Pages/question-page/question-page.component';

const routes: Routes = [
  { path: '', component: SubjectPageComponent },
  { path: 'subject', component: SubjectPageComponent },
  { path: 'media', component: MediaPageComponent },
  { path: 'level', component: LevelPageComponent },
  { path: 'response', component: ResponsePageComponent },
  { path: 'question', component: QuestionPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }