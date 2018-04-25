import { Component, OnInit } from '@angular/core';
import { User }    from '../user';
import {UserService} from './../../app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  public user = new User("",'','');
  constructor(private userService : UserService,
  private router : Router) { }

  ngOnInit() {
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    console.log('Form submitted',this.user);
    this.userService.signUp(this.user)
      .then((status)=>{
        this.router.navigateByUrl('/chat')
      })
      .catch((error)=>{
        if(error.status !==200){
        }
      })
  }
}
