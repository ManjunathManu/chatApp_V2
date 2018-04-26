import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  @Input() users = String;
  constructor() { }

  ngOnInit() {

  }

}
