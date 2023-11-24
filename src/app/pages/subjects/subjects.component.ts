import { Component } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
  providers: [SubjectService]
})
export class SubjectsComponent {
  subjects: Subject[] = [];
  constructor(private subjectService: SubjectService) {
    this.subjects = this.subjectService.getSubjects();
  }
  name: string = 'Angular';
  show: boolean = false;
  toogleShow() {
    this.show = !this.show;
  }
}
