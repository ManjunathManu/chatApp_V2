import { Injectable,EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Message } from './message';
import { Subject } from 'rxjs/Subject';
import { CookieService } from 'angular2-cookie';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { LocationMessage } from './locationMessage';

@Injectable()
export class SocketsService {
  private socket: any = null;
  private userUrl = '/api/user';  // URL to web api
  private pageSize  = 10;
  // Observable string sources
  private messagesSource = new Subject<Message | LocationMessage>();
  public message = new Subject<Message | LocationMessage>();
  private usersSource = new Subject<User>();
  // Observable string streams
  public messages$ = this.messagesSource.asObservable();
  public users$ = this.usersSource.asObservable();
  
  private cookieValue: String = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private route: ActivatedRoute) { }

  public intializeSocketConnection(senderName): void {

    this.socket = io('http://localhost:3000');
    console.log(this.socket);
    this.socket.on('connect', () => {
      this.updateSocketId(senderName, 'add');
      console.log(`socket====${this.socket.connected},${this.socket.disconnected},${this.socket.id}`);
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('discc ', this.cookieValue);
      this.updateSocketId(senderName, 'remove');
      console.log(`socket====${this.socket.connected},${this.socket.disconnected},${this.socket.id}`);
      console.log('DisConnected from server');
    });

    this.socket.on('message', (msg: any) => {
      this.messagesSource.next(msg);
    });

    this.socket.on('updateUserList',(user:User)=>{
      this.usersSource.next(user);
    });
  }

  public sendMessage(message, receiverName): void {
    this.socket.emit('message', message, receiverName);
    this.message.next(message);
  }

  public updateSocketId(userId, operation): void {
    console.log('userid ', userId);
    this.socket.emit('update_socket_id', userId, operation, (err) => {
      if (err) {
        alert(err);
      }
    });
  }

  public getPrivateMessages(senderName, receiverName,pageNumber):Observable<any>{
    const url = `${this.userUrl}/chat/${senderName}/${receiverName}?pageNumber=${pageNumber}&size=${this.pageSize}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.cookieService.get('chatApp_V2')
      })
    };

    return  this.http.get<any>(url, httpOptions)
    .pipe(
      tap ( _ => {this.pushMessages(_,pageNumber);console.log('Fetched All private messaged',_);}),
    );
  }

  public pushMessages(response:any,pageNumber:number){
    console.log('push messages',response);
    if(pageNumber === 1){
      response.chatMessages.reverse();
    }
    response.chatMessages.map(message => {
      this.messagesSource.next(message);});
  }

}
