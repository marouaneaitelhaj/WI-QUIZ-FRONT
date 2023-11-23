import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent {
    @Input() name: string = '';
    showName: boolean = true;
    toggleShowName() {
        this.showName = !this.showName;
    }
}
