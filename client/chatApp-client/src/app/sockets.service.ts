import { Injectable,EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Message } from './message'
import { Subject } from 'rxjs/Subject'
import { CookieService } from 'angular2-cookie';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
// import {ChatWindowComponent} from './chat-window/chat-window-component'
@Injectable()
export class SocketsService {
  private socket: any = null;
  private userUrl = '/api/user';  // URL to web api
  private pageSize :number = 10;
  // Observable string sources
  private messagesSource = new Subject<Message>();
  private usersSource = new Subject<User>();
  public EOF:boolean = false;
  // Observable string streams
  messages$ = this.messagesSource.asObservable();
  users$ = this.usersSource.asObservable();
  
  private cookieValue: String = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
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
      console.log('DisConnected from server');
    });

    this.socket.on('message', (msg: any) => {
      this.messagesSource.next(msg);
    })

    this.socket.on('updateUserList',(user:User)=>{
      this.usersSource.next(user);
    })
  }

  sendMessage(message, receiverName): void {
    this.socket.emit('message', message, receiverName);
    this.messagesSource.next(message);
  }

  updateSocketId(userId, operation): void {
    console.log('userid ', userId)
    this.socket.emit('update_socket_id', userId, operation, (err) => {
      if (err) {
        alert(err);
      }
    })
  }

  getPrivateMessages(senderName, receiverName,pageNumber){
    const url = `${this.userUrl}/chat/${senderName}/${receiverName}?pageNumber=${pageNumber}&size=${this.pageSize}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.cookieService.get('chatApp_V2')
      })
    }

    const messages =  this.http.get<any>(url, httpOptions)
    .pipe(
      tap ( _ => {this.pushMessages(_,pageNumber);console.log('Fetched All private messaged',_)}),
      // map((message,i) => {console.log('map on Message----',Array.isArray(message),message[i]);this.messagesSource.next(message[i])})
    )
    .subscribe(message => console.log(message) )
  }

  pushMessages(response:any,pageNumber:number){
    console.log('push messages',response);
    if(pageNumber == 1){
      response.chatMessages.reverse();
    }
    if(response.EOF){
      console.log('EOF');
      this.EOF = true;
    }
    // console.log('after reve',messages)
    response.chatMessages.map(message => {
      this.messagesSource.next(message)})
  }

}
