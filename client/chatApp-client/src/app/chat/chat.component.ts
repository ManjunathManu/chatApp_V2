import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service'
import {  SocketsService } from './../sockets.service'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public users : Object[] = []
  private socket = null;
  constructor(private userService:UserService,
  private socketsService:SocketsService) { }

  ngOnInit() {
    this.userService.getAllUsers()
    .subscribe((usersFromDb)=>{
      this.users = usersFromDb.users;
      console.log('Got all users---', usersFromDb);
    })
    this.socketsService.intializeSocketConnection();
  }

}
