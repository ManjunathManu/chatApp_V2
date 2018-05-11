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
import { setTimeout } from 'timers';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class AlertsComponent implements OnInit {
  private alertToDisplay: Alert = null;
  private flyInOut: string = "in";
  private currentClass: String = this.alertToDisplay && this.alertToDisplay.status ? "alert alert-success" : "alert alert-danger";
  constructor(public alertsService: AlertsService) {
    this.alertsService.alerts$
      .subscribe((alert) => {
        this.alertToDisplay = alert;
        setTimeout(() => {
          this.alertsService.clear();
        }, 3000)
      })

  }

  ngOnInit() {
  }

}
