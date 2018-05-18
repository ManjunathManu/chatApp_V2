import { Component, OnInit,EventEmitter,Input ,Output,HostListener} from '@angular/core';
import { SocketsService } from './../sockets.service'
import { Message } from './../message';
import { CookieService } from 'angular2-cookie';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  public messageToBeSent: Message = null;
  public messageHistory :Message[] = [];
  private senderName: string = null;
  private receiverName: string = null;
  private showChatWindow: boolean = false;
  private sub: any;

  constructor(
    private socketsService: SocketsService,
    private cookieService: CookieService,
    private route: ActivatedRoute) {
    this.sub = this.route.parent.params
    .subscribe(params => {
      this.senderName = params["senderName"];
      console.log('sender name--',this.senderName);
    });

    this.route.params.subscribe(params => {
      console.log('!!!!!!!!!', params);
      console.log(' chat window commm')
      this.receiverName = params.receiverName;
      this.messageHistory = [];
      this.socketsService.getPrivateMessages(this.senderName, this.receiverName)
    });

    this.socketsService.messages$.subscribe((msg)=>{
      this.messageHistory.push(msg);
    })

    this.showChatWindow = this.route.snapshot.data['showChatWindow'];
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  sendMessage(msg: string): void {
    if(msg.length > 0){
      this.receiverName = this.route.snapshot.params.receiverName;
      console.log(`sender=${this.senderName},receiver=${this.receiverName}`)
      this.messageToBeSent = new Message(this.senderName, msg, Date());
      this.socketsService.sendMessage(this.messageToBeSent, this.receiverName);
    }
  }


  @HostListener('window:scroll',['$event'])
  onScroll($event){
    // console.log('scrolling---',$event);
    if($event.srcElement.scrollTop == 0){
      console.log('We reached the top',$event)
    }
  }  
}
