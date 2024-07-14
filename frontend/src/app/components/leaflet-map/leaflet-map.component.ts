import { Component, OnInit } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.css'
})
export class LeafletMapComponent implements OnInit {

  ngOnInit(): void {
    this.configMap()
  }

  map: any;

  // config map
  configMap(){
    this.map =  L.map('map', {
      center: [ 40.4258686, 86.9080655 ],
     zoom: 6
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 6,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.map);

  }
}
