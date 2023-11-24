import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inpt',
  templateUrl: './inpt.component.html',
  styleUrls: ['./inpt.component.css']
})
export class InptComponent {
    @Input() label: string = 'okiii';
}
