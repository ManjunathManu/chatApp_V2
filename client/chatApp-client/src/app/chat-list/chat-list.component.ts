import { Component, OnInit, Input } from '@angular/core';
// import { RouterLink } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import { UserService } from './../user.service';
import { ActivatedRoute } from '@angular/router';
import { SocketsService } from './../sockets.service';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  @Input() public users = String;
  public senderName: string = this.route.snapshot.params.senderName;
  constructor(
    private socketsService: SocketsService,
    private cookieService: CookieService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  public ngOnInit() {
  }
}
