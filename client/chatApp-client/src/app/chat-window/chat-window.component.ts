import { Component, OnInit } from '@angular/core';
import { SocketsService } from './../sockets.service'
import { Message } from './../message';
@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  public messageToBeSent : Message = null;
  public messageHistory : Message[]=[]
  constructor(private socketsService:SocketsService) {
    this.socketsService.messages$.subscribe(
      message =>{
        this.messageToBeSent = message;
        this.messageHistory.push(message);
      }
    )
   }

  ngOnInit() {
  }

  sendMessage(msg:string):void{
    this.messageToBeSent =  new Message('manju',msg,Date());
    console.log('Sending message---',this.messageToBeSent);
    this.socketsService.sendMessage(this.messageToBeSent);
  }
}
