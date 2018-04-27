import { Component, OnInit, Input } from '@angular/core';
import { Message } from './../message'
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
 @Input()message:Message;
 private messageHistory :Message[] = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.messageHistory.push(this.message);
  }

}
