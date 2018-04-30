import { Component, OnInit } from '@angular/core';
import { User }    from '../user';
import {UserService} from './../../app/user.service';
import { Router } from '@angular/router';
import {  SocketsService } from './../sockets.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new User("",'','');
  constructor(private userService : UserService,
  private router : Router,
  private socketsService:SocketsService) { }

  ngOnInit() {
    // this.socketsService.intializeSocketConnection();
  }

  public onSubmit() {
    console.log('Form submitted',this.user);
    this.userService.logIn(this.user)
      .then((response)=>{
        this.router.navigateByUrl(`/chat/${response.body.user.userName}`);
      })
      .catch((error)=>{
      })
  }
}
