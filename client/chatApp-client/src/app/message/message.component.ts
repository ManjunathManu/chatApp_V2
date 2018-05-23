import { Component, OnInit, Input } from '@angular/core';
import { Message } from './../message';
import { SocketsService } from '../sockets.service';
import { LocationMessage } from './../locationMessage';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() private message: Message | LocationMessage = null;
  constructor(private socketService: SocketsService) { }

  public ngOnInit() {
  }


  private isTextMessage(msg:Message | LocationMessage){
    if(msg.hasOwnProperty('text')){
      return true;
    }
    return false;
  }
}
