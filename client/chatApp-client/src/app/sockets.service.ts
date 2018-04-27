import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Message } from './message'
import { Subject } from 'rxjs/Subject'
@Injectable()
export class SocketsService {
  private socket: any = null;
  // Observable string sources
  private messagesSource = new Subject<Message>();

  // Observable string streams
  messages$ = this.messagesSource.asObservable();
  constructor() { }
  intializeSocketConnection(): void {
    this.socket = io('http://localhost:3000');
    console.log(this.socket)
    this.socket.on('connect', () => {
      console.log(`socket====${this.socket.connected},${this.socket.disconnected},${this.socket.id}`);
      console.log('Connected to server');
    })
  }

  sendMessage(msg): void {
    this.socket.emit('message', {
      message: msg,
    });
    this.messagesSource.next(msg);
  }
}
