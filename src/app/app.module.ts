import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SubjectComponent } from './components/subject/subject.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { PlusComponent } from './components/plus/plus.component';
import { InptComponent } from './components/inpt/inpt.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    SubjectComponent,
    SubjectsComponent,
    PlusComponent,
    InptComponent
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
