import { Component } from '@angular/core';
import { SubjectResponse } from '../subject-response';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.css'],
  providers: [SubjectService]
})
export class SubjectPageComponent {
  protected subjects: SubjectResponse = new SubjectResponse([]);
  protected subject: Subject = new Subject(1, '1');
  showPopUp: Boolean = false;
  tooglePopUp(subject: Subject) {
    this.showPopUp = !this.showPopUp;
    this.subject = subject;
  }
  constructor(private subjectService: SubjectService) {
  }
  ngOnInit() {
    this.getSubjects();
    
  }
  public getSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (response: SubjectResponse) => {
        this.subjects = response;
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }
  public editSubject(subject: Subject): void {
    // console.log(this.subject);
  }
  name: string = 'Angular';
  show: boolean = false;
  toogleShow() {
    this.show = !this.show;
  }
}
