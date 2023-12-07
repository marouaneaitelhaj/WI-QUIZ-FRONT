import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AlertProps from './alertProps';
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    public alertprops = new BehaviorSubject<AlertProps>(new AlertProps());
    public showMsg(msg: string) {
        this.alertprops.next(new AlertProps(msg, false, true));
    }
    public showWarning(msg: string, link: string = "") {
        this.alertprops.next(new AlertProps(msg, false, true, true, link));
    }
    public showConfirm(msg: string) {
        this.alertprops.next(new AlertProps(msg, true, true));
    }
    public hide() {
        this.alertprops.next(new AlertProps());
    }
}
