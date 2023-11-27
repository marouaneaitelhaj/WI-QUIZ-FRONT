import { Component, Inject } from '@angular/core';
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
  public subjects: SubjectResponse = new SubjectResponse([]);
  public subject: Subject = new Subject(1, '1');
  public service: SubjectService;
  public showPopUp: Boolean = false;
  constructor(private subjectService: SubjectService) {
    this.service = subjectService;
  }
  ngOnInit() {
    this.getSubjects();
  }
  public tooglePopUp(subject: Subject) {
    this.showPopUp = !this.showPopUp;
    this.subject = subject;
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
