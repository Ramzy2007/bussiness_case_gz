import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Location } from '../../interfaces/package';


@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'] // Note: It's styleUrls, not styleUrl
})
export class GoogleMapsComponent implements OnInit {

  constructor() { 
    this.directionsService = new google.maps.DirectionsService();
  }

  ngOnInit(): void {
    this.setMarkers();
    this.calculateRoute();
  }

  directionsService: google.maps.DirectionsService;

  @ViewChild(GoogleMap) map!: GoogleMap; 

  @Input() locationFrom!: Location;
  @Input() locationTo!: Location;

  center: google.maps.LatLngLiteral = { lat: 40.730610, lng: -73.935242 };
  zoom = 12;

  start: google.maps.LatLngLiteral = { lat: 40.730610, lng: -73.935242 };
  end: google.maps.LatLngLiteral = { lat: 40.712776, lng: -74.005974 };


  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  }

  markerPositions: google.maps.LatLngLiteral [] = [];

  addMarker(event: google.maps.MapMouseEvent){
    if(event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }

  setMarkers() {
    if (this.end) {
      this.markerPositions.push({
        lat: this.start.lat,
        lng: this.start.lng
      });
    }
    if (this.end) {
      this.markerPositions.push({
        lat: this.end.lat,
        lng: this.end.lng
      });
    }
  }

  calculateRoute() {
    if (this.locationFrom && this.locationTo) {
      const directionsService = new google.maps.DirectionsService();
      const request: google.maps.DirectionsRequest = {
        origin: new google.maps.LatLng(this.locationFrom.lat, this.locationFrom.lng),
        destination: new google.maps.LatLng(this.locationTo.lat, this.locationTo.lng),
        travelMode: google.maps.TravelMode.DRIVING
      };
  
      directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const directionsRenderer = new google.maps.DirectionsRenderer();
          
          // Vérifiez si this.map.googleMap est défini avant de l'utiliser
          if (this.map.googleMap) {
            directionsRenderer.setMap(this.map.googleMap);
          } else {
            console.error('La carte n\'est pas disponible');
          }
          
          directionsRenderer.setDirections(response);
        } else {
          console.error('Erreur lors du calcul de l\'itinéraire: ' + status);
        }
      });
    }
  }
  
}
