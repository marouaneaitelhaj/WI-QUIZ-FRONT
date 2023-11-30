import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnChanges {
  @Input() message: string = "";
  @Output() showAlert = new EventEmitter<boolean>();
  @Output() confirmed = new EventEmitter<boolean>();
  @Input() needConfirm: boolean = false;
  ngOnChanges(): void {
    if (this.needConfirm) {
      setTimeout(() => {
        this.showAlert.emit(false);
      }, 3000);
    }
  }
  ngOnInit(): void {
    if (!this.needConfirm) {
      setTimeout(() => {
        this.showAlert.emit(false);
      }, 3000);
    }
  }
  confirm(b: boolean) {
    this.confirmed.emit(b);
  }
}
