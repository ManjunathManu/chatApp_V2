import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Message } from './message'
import { Subject } from 'rxjs/Subject'
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class SocketsService {
  private socket: any = null;
  // Observable string sources
  private messagesSource = new Subject<Message>();

  // Observable string streams
  messages$ = this.messagesSource.asObservable();
  private cookieValue: String = null;

  constructor(private cookieService: CookieService,
    private route: ActivatedRoute) { }

    intializeSocketConnection(senderName): void {
    this.socket = io('http://localhost:3000');
    console.log(this.socket)
    this.socket.on('connect', () => {
      this.updateSocketId(senderName, 'add')
      console.log(`socket====${this.socket.connected},${this.socket.disconnected},${this.socket.id}`);
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('discc ', this.cookieValue)
      this.updateSocketId(senderName, 'remove')
      console.log(`socket====${this.socket.connected},${this.socket.disconnected},${this.socket.id}`);
      console.log('DisConnected to server');
    });

    this.socket.on('message', (msg:any) => {
      // console.log('new message from server',msg)
      this.messagesSource.next(msg);
    })
  }

  sendMessage(message,receiverName): void {
    this.socket.emit('message',message,receiverName);
    // this.messagesSource.next(msg);
  }

  updateSocketId(userId, operation): void {
    console.log('userid ',userId)
    this.socket.emit('update_socket_id', userId, operation, (err) => {
      if (err) {
        alert(err);
      }
    })
  }
}
