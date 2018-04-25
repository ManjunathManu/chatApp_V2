import { Injectable } from '@angular/core';
import { Alert } from './alert';

@Injectable()
export class AlertsService {

  constructor() { }

  alert :Alert = null;
  add(alert : Alert){
    this.alert = alert;
  }

  clear(){
    this.alert = null;
  }
}
