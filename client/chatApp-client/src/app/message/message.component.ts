import { Component, OnInit, Input } from '@angular/core';
import { Message } from './../message'
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
 @Input()message:Message;
 @Input('privateMessages') messageHistory : Message[] = [];
//  private messageHistory :Message[] = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log('messafe-----',typeof this.message, this.message)
    this.messageHistory.push(this.message);
    console.log('Message history',this.messageHistory)
  }

}
