import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import AlertProps from './alertProps';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Output() confirmed = new EventEmitter<boolean>();
  alertProps: AlertProps = new AlertProps();
  confirm(b: boolean) {
    this.confirmed.emit(b);
    this.alertProps.showAlert = false;
    this.alertService.alertprops.next(this.alertProps);
  }
  constructor(private alertService : AlertService) { }
  ngAfterContentInit() {
    this.alertService.alertprops.subscribe(
      (alertprops) => {
        this.alertProps = alertprops;
      }
    );
  }
}
