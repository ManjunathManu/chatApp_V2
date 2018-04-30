import { Component, OnInit } from '@angular/core';
import { User }    from '../user';
import {UserService} from './../../app/user.service';
import { Router } from '@angular/router';
import {  SocketsService } from './../sockets.service'

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  public user = new User("",'','');
  constructor(private userService : UserService,
  private router : Router,
  private socketsService:SocketsService) { }

  ngOnInit() {
    // this.socketsService.intializeSocketConnection();
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    console.log('Form submitted',this.user);
    this.userService.signUp(this.user)
      .then((response)=>{
        this.router.navigateByUrl(`/chat/${response.body.user.userName}`)
      })
      .catch((error)=>{
      })
  }

  public onClickLogin(){
    this.router.navigateByUrl('/login')
  }
}
