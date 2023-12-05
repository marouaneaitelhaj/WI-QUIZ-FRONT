import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alertmessage.component.html',
  styleUrls: ['./alertmessage.component.css']
})
export class Alertmessage implements OnChanges {
  @Input() message: string = "";
  @Output() showAlert = new EventEmitter<boolean>();
  @Output() confirmed = new EventEmitter<boolean>();
  @Input() needConfirm: boolean = false;
  ngOnChanges(): void {
    // if (this.needConfirm) {
    //   setTimeout(() => {
    //     this.showAlert.emit(false);
    //   }, 3000);
    // }
  }
  ngOnInit(): void {
    // if (!this.needConfirm) {
    //   setTimeout(() => {
    //     this.showAlert.emit(false);
    //   }, 3000);
    // }
  }
  confirm(b: boolean) {
    this.confirmed.emit(b);
  }
}
