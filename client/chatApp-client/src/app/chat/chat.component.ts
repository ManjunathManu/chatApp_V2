import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service'
import {  SocketsService } from './../sockets.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  public users : Object[] = []
  private socket = null;
  // private showChatWindow : boolean = false;
  private senderName :string = null;
  constructor(private userService:UserService,
  private socketsService:SocketsService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.senderName = this.route.snapshot.params.senderName;
    console.log('sender name---',this.senderName)
    this.userService.getAllUsers(this.senderName)
    .subscribe((usersFromDb)=>{
      this.users = usersFromDb.users;
      console.log('Got all users---', usersFromDb);
    })
    // this.showChatWindow = this.route.snapshot.data['showChatWindow'];
    this.socketsService.intializeSocketConnection(this.senderName);
    // console.log('Query params---',this.route.snapshot.params.uid)
  }

}
