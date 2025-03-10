import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Location } from '../../interfaces/package';

@Injectable({
  providedIn: 'root',
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
      const data = JSON.parse(event.data);
      this.statusSubject.next(data.data);
    };
  }

  getStatusUpdates() {
    return this.statusSubject.asObservable();
  }

  sendLocation(data: {
    event: string;
    delivery_id: string;
    location: Location;
  }): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open. Unable to send status.');
    }
  }

  sendStatus(data: {
    event: string;
    delivery_id: string;
    status: string;
  }): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open. Unable to send status.');
    }
  }
}
