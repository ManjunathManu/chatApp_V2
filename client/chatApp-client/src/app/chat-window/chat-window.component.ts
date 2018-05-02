import { Component, OnInit } from '@angular/core';
import { SocketsService } from './../sockets.service'
import { Message } from './../message';
import { CookieService } from 'ngx-cookie-service';
import { Input } from '@angular/core/src/metadata/directives';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  public messageToBeSent: Message = null;
  private senderName: string = null;
  private receiverName: string = null;
  private showChatWindow: boolean = false;
  private sub: any;

  constructor(
    private socketsService: SocketsService,
    private cookieService: CookieService,
    private route: ActivatedRoute) {
    this.socketsService.messages$.subscribe(
      message => {
        this.messageToBeSent = message;
      }
    )
    this.showChatWindow = this.route.snapshot.data['showChatWindow'];

  }

  ngOnInit() {
    // Get parent ActivatedRoute of this route.
    this.sub = this.route.parent.params
      .subscribe(params => {
        this.senderName = params["senderName"];
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  sendMessage(msg: string): void {
    this.receiverName = this.route.snapshot.params.receiverName;
    console.log(`sender=${this.senderName},receiver=${this.receiverName}`)
    this.messageToBeSent = new Message(this.senderName, msg, Date());
    this.socketsService.sendMessage(this.messageToBeSent, this.receiverName);
  }

}
