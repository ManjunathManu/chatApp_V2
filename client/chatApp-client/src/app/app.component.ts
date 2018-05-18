import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie';
import { NavbarComponent} from './navbar/navbar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'app';
  private token: string = null;
  /**
   * constructor
   */
  public constructor(
    private cookieService: CookieService
  ) {
    // this.token = this.cookieService.get('chatApp_V2');
    // console.log('token [app compo]--', this.token);
  }
}
