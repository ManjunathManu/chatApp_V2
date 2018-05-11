import { Injectable } from '@angular/core';
import { Alert } from './alert';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'

@Injectable()
export class AlertsService {

  private alertsSource = new Subject<Alert>();

  // Observable string streams
  alerts$ = this.alertsSource.asObservable();
  constructor() { }

  alert :Alert = null;
  add(alert : Alert){
    this.alert = alert;
    console.log('new alert--',this.alert);
    this.alertsSource.next(this.alert);
    
  }

  clear(){
    this.alert = null;
    this.alertsSource.next(null);
  }
}
