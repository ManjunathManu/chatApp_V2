import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private isTokenPresent :string = this.cookieService.get("chatApp_V2")
  constructor(private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  onLogout(){
    console.log('token--',this.cookieService.get('chatApp_V2'),)
    this.cookieService.remove('chatApp_V2')
  }
}
