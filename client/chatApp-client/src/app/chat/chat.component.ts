import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { SocketsService } from './../sockets.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public users: any[] = [];
  private socket = null;
  // private showChatWindow : boolean = false;
  private senderName: string = null;
  constructor(private userService: UserService,
    private socketsService: SocketsService,
    private route: ActivatedRoute) { }

  public ngOnInit() {
    this.senderName = this.route.snapshot.params.senderName;
    console.log('sender name---', this.senderName);
    this.userService.getAllUsers(this.senderName)
      .subscribe((usersFromDb) => {
        this.users = usersFromDb.users;
        console.log('Got all users---', usersFromDb);
      });

    this.socketsService.users$
      .subscribe((user) => {
        const index = this.users.findIndex((userInList) => userInList.userName === user.userName);
        if (index === -1) {
          this.users.push(user);
        }
      });
    this.socketsService.intializeSocketConnection(this.senderName);
  }

}
