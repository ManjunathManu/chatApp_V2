import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../alerts.service';
import { Alert } from '../alert';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  animations:[
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(500)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class AlertsComponent implements OnInit {
  private alert : Alert = this.alertsService.alert ? this.alertsService.alert : null;
  private currentClass :String = this.alert && this.alert.status ? "alert alert-success" : "alert alert-danger";
  constructor(public alertsService : AlertsService) { 
  }

  ngOnInit() {
  }
}
