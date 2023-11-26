import { Component, Input } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { PopUpComponent } from 'src/app/shared/components/pop-up/pop-up.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
})

export class SubjectComponent {
  subjectSchema = Subject.prototype;
  @Input() name: string = '';
  @Input() id: number = 0;
  showName: boolean = true;
  showEditForm: boolean = false;
  toggleShowName() {
    this.showName = !this.showName;
  }
  openEditForm(id: number) {
    this.showEditForm = true
    console.log(this.subjectSchema);
  }
}
