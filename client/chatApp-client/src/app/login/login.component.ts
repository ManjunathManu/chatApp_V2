import { Component, OnInit } from '@angular/core';
import { User }    from '../user';
import {UserService} from './../../app/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new User("",'','');
  constructor(private userService : UserService,
  private router : Router) { }

  ngOnInit() {
  }

  public onSubmit() {
    console.log('Form submitted',this.user);
    this.userService.logIn(this.user)
      .then((status)=>{
        this.router.navigateByUrl('/chat')
      })
      .catch((error)=>{
      })
  }
}
