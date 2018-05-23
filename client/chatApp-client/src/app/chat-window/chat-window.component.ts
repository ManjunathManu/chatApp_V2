import { Component, OnInit, EventEmitter, Input, Output, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import { Subscribable } from 'rxjs/Observable';

import { SocketsService } from './../sockets.service';
import { Message } from './../message';
import {LocationMessage} from './../locationMessage';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit,OnDestroy {

  public messageToBeSent: Message | LocationMessage = null;
  // public msg: Message = null;
  public messageHistory: (Message | LocationMessage)[] = [];
  private senderName: string = null;
  private receiverName: string = null;
  private showChatWindow = false;
  private pageCount = 1;
  private parentParamsSubscription: Subscription;
  private paramsSubscription: Subscription;
  private messagesSubscription: Subscription;
  private liveMessageSubscription: Subscription;
  private locationBtnstatus = false;
  private locationText = "Send location";

  constructor(
    private socketsService: SocketsService,
    private cookieService: CookieService,
    private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.parentParamsSubscription = this.route.parent.params
      .subscribe(params => {
        this.senderName = params["senderName"];
      });

    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.receiverName = params.receiverName;
        this.messageHistory = [];
        this.socketsService.getPrivateMessages(this.senderName, this.receiverName, this.pageCount)
          .subscribe((response) => {
            console.log('response---', response);
            this.pageCount = response.EOF ? -1 : this.pageCount;
          });
      });

    this.messagesSubscription = this.socketsService.messages$
      .subscribe((message: Message | LocationMessage) => {
        if (this.pageCount > 1) {
          this.messageHistory.unshift(message);
        } else {
          this.messageHistory.push(message);
        }
      });

    this.liveMessageSubscription = this.socketsService.message
      .subscribe((message: Message | LocationMessage) => {
        this.messageHistory.push(message);
      });
  }

  public ngOnDestroy() {
    this.parentParamsSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
    this.messagesSubscription.unsubscribe();
    this.liveMessageSubscription.unsubscribe();
  }

  private sendMessage(msg: string,type:string): void {
    this.receiverName = this.route.snapshot.params.receiverName;
    console.log('----',msg.length, type);
    if (type && type === "location") {
      console.log('send--',this.messageToBeSent instanceof Message);
      this.messageToBeSent = new LocationMessage(this.senderName, msg, Date());
      this.socketsService.sendMessage(this.messageToBeSent, this.receiverName);
    } else {
      if(msg.length > 0){
        this.messageToBeSent = new Message(this.senderName, msg, Date());
        this.socketsService.sendMessage(this.messageToBeSent, this.receiverName);
      }
    }
  }

  private sendLocation(): void {
    console.log('sending location...');
    this.locationBtnstatus = true;
    this.locationText = "Sending location...";
    if (!navigator.geolocation) {
      console.log('Browser does not support geolocation');
      this.locationBtnstatus = false;
      this.locationText = "Send location";
    } else {
      navigator.geolocation.getCurrentPosition((postion) => {
        console.log('position---', postion);
        this.sendMessage(`https://www.google.com/maps?q=${postion.coords.latitude},${postion.coords.longitude}`,'location');
        this.locationBtnstatus = false;
        this.locationText = "Send location";
      },
        (error) => {
          console.log('Geolocation error--', error);
          this.locationBtnstatus = false;
          this.locationText = "Send location";
        });
    }
    // setTimeout(()=>{
    //   this.locationBtnstatus = false;
    //   this.locationText = "Send location";
    // },2000);
  }

  @HostListener('window:scroll', ['$event'])
  private onScroll($event) {
    if ($event.srcElement.scrollTop === 0) {
      // console.log('We reached the top', $event, this.pageCount);
      if (this.pageCount !== -1) {
        this.pageCount++;
        this.socketsService.getPrivateMessages(this.senderName, this.receiverName, this.pageCount)
          .subscribe((response) => {
            // console.log('getPrivate messages response---', response)
            this.pageCount = response.EOF ? -1 : this.pageCount;
            // console.log('page count[scroll]--', this.pageCount)
          });
      }
    }
  }
}
