import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AlertProps from './alertProps';
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    public alertprops = new BehaviorSubject<AlertProps>(new AlertProps());
}
