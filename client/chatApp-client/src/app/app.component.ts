import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie';
import { NavbarComponent} from './navbar/navbar.component';
import { UserService } from './user.service';
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
    private userService: UserService
  ) { }
  onRouteChange(){
    this.userService.isAuthenticated();
  }
}
