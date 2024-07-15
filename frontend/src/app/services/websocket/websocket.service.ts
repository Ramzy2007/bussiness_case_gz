import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private statusSubject = new Subject<string>();

  constructor() {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket('ws://localhost:3000');

    this.socket.onmessage = (event) => {
      const status = JSON.parse(event.data).status;
      console.log('....................................................');
      console.log(status);
      console.log('*****************************************************');
      this.statusSubject.next(status);
    };

    // this.socket.onclose = (event) => {
    //   console.log('Close: ', event);
    // };
  }

  // public openWebSocket(){
  //   this.socket = new WebSocket('ws://localhost:8080/delivery');

  //   this.socket.onopen = (event) => {
  //     console.log('Open: ', event);
  //   };

  //   this.webSocket.onmessage = (event) => {
  //     const chatMessageDto = JSON.parse(event.data);
  //     this.chatMessages.push(chatMessageDto);
  //   };

  //   this.webSocket.onclose = (event) => {
  //     console.log('Close: ', event);
  //   };
  // }

  getStatusUpdates() {
    return this.statusSubject.asObservable();
  }

  sendStatus(data: { deliveryId: any; status: any; }): void {
   const { deliveryId, status } = data;
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ deliveryId: deliveryId, status: status }));
    } else {
      console.error('WebSocket is not open. Unable to send status.');
    }
  }
}
