import { Component } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { SubjectResponse } from 'src/app/responses/subject-response';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
  providers: [SubjectService]
})
export class SubjectsComponent {
  subjects: SubjectResponse = new SubjectResponse([]);
  constructor(private subjectService: SubjectService) {
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
  name: string = 'Angular';
  show: boolean = false;
  toogleShow() {
    this.show = !this.show;
  }
}
