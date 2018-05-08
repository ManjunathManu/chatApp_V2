import { Component, OnInit, Input } from '@angular/core';
import { Message } from './../message'
import { SocketsService } from '../sockets.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
 private messageHistory :Message[] = [];
  constructor(private socketService:SocketsService) { 
    this.socketService.messages$.subscribe((message)=>{
      this.messageHistory.push(message);
      console.log('message--',this.messageHistory)
    })
  }

  ngOnInit() {
  }

  ngOnChanges(){
    
    // console.log('messafe-----',typeof this.message, this.message)
    // this.messageHistory.push(this.message);   
    // console.log('Message history',this.messageHistory)
  }
}
