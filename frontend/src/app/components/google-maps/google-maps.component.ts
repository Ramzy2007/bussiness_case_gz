import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Socket, SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { WayPoints } from '../../interfaces/others';
import { MapCustomService } from './map-custom.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule
  ],
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'] // Note: It's styleUrls, not styleUrl
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild('asGeoCoder', { static: true })
  asGeoCoder!: ElementRef;
  
  modeInput = 'start';
  wayPoints: WayPoints = { start: null, end: null };

  constructor(
    private mapCustomService: MapCustomService,
    private renderer2: Renderer2,
    private socket: Socket
  ) {}

  ngOnInit(): void {
    this.mapCustomService.buildMap()
      .then(({ geocoder, map }) => {
        // Append the geocoder to the asGeoCoder element
        this.renderer2.appendChild(this.asGeoCoder.nativeElement, geocoder.onAdd(map));
        console.log('*** Map loaded successfully ***');
      })
      .catch((err) => {
        console.log('******* ERROR ******', err);
      });

    this.mapCustomService.cbAddress.subscribe((getPoint) => {
      if (this.modeInput === 'start') {
        this.wayPoints.start = getPoint;
      }
      if (this.modeInput === 'end') {
        this.wayPoints.end = getPoint;
      }
    });

    this.socket.fromEvent('position')
      .subscribe(({ coords }: any) => {
        console.log('******* Position from server ****', coords);
        this.mapCustomService.addMarkerCustom(coords);
      });
  }

  drawRoute(): void {
    console.log('***** ORIGIN and DESTINATION POINTS', this.wayPoints)
    const coords = [
      this.wayPoints.start.center,
      this.wayPoints.end.center
    ];

    this.mapCustomService.loadCoords(coords);
  }

  changeMode(mode: string): void {
    this.modeInput = mode;
  }

  testMarker(): void {
    this.mapCustomService.addMarkerCustom([-8.628139488926513, 41.159082702543635]);
  }
}
