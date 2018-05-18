import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import {UserService} from './../../app/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnChanges {
  private isTokenPresent: boolean = null;
  // @Input () public isTokenPresent: string = null;
  constructor(private route: ActivatedRoute,
    private cookieService: CookieService,
    private userService: UserService
  ) { userService.isAuthenticated().subscribe(isAuth => this.isTokenPresent = isAuth);
  }

  public ngOnInit() {
  }

 public onLogout() {
    console.log('token--', this.cookieService.get('chatApp_V2'));
    this.cookieService.remove('chatApp_V2');
  }
  /**
   * ngOnChages
   */
  public ngOnChanges() { }
}
