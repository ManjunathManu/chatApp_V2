import { Component, OnInit, Input } from '@angular/core';
import { Message } from './../message'
import { SocketsService } from '../sockets.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message = null;
  constructor(private socketService: SocketsService) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
