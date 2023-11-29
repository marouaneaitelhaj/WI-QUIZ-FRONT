import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string = "";
  @Output() showAlert = new EventEmitter<boolean>();
  @Output() confirmed = new EventEmitter<boolean>();
  @Input() needConfirm: boolean = false;
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
