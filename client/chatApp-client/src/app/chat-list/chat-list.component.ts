import { Component, OnInit, Input } from '@angular/core';
// import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './../user.service'
import { ActivatedRoute } from '@angular/router';
import { SocketsService } from './../sockets.service'


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  @Input() users = String;
  public senderName: string = this.route.snapshot.params.senderName
  constructor(
    private socketsService: SocketsService,
    private cookieService: CookieService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  // getPrivateMessages(senderName, receiverName) {
  //   this.socketsService.getPrivateMessages(senderName, receiverName)
  //     // .subscribe((messges) => {
  //     //   console.log('messageddddd', messges);
  //     // })
  // }
}
