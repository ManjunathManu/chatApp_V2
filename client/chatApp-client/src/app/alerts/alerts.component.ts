import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../alerts.service';
import { Alert } from '../alert';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  animations:[
    
  ]
})
export class AlertsComponent implements OnInit {
  private alert : Alert = this.alertsService.alert ? this.alertsService.alert : null;
  private currentClass :String = this.alert && this.alert.status ? "alert alert-success" : "alert alert-danger";

  constructor(public alertsService : AlertsService) { }

  ngOnInit() {
  }
}
