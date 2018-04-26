import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketsService {

  constructor() { }
  intializeSocketConnection() :void{
    const socket = io('http://localhost:3000');
    console.log(socket)
    console.log(`socket====${socket.connected},${socket.disconnected},${socket.id}`)
  }

}
