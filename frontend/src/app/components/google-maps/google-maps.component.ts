import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Location } from '../../interfaces/package';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
})
export class GoogleMapsComponent implements OnInit {
  directionsService: google.maps.DirectionsService;

  @ViewChild(GoogleMap) map!: GoogleMap;

  @Input() locationFrom!: Location;
  @Input() locationTo!: Location;
  @Input() location!: Location;

  center: google.maps.LatLngLiteral = { lat: 6.130419, lng: 1.215829 };
  zoom = 12;

  start!: google.maps.LatLngLiteral;
  end!: google.maps.LatLngLiteral;
  current!: google.maps.LatLngLiteral;

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };

  markerPositions: google.maps.LatLngLiteral[] = [];
  infoWindows: google.maps.InfoWindow[] = [];

  constructor() {
    this.directionsService = new google.maps.DirectionsService();
  }

  ngOnInit(): void {
    this.start = { lat: this.locationFrom.lat, lng: this.locationFrom.lng };
    this.end = { lat: this.locationTo.lat, lng: this.locationTo.lng };
    this.current = { lat: this.location.lat, lng: this.location.lng };

    this.setMarkers();
    this.calculateRoute();
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      const position = event.latLng.toJSON();
      this.markerPositions.push(position);
      this.addInfoWindow(position, 'New Marker');
    }
  }

  setMarkers() {
    if (this.start) {
      this.markerPositions.push(this.start);
      this.addInfoWindow(this.start, 'Start Location');
    }
    if (this.end) {
      this.markerPositions.push(this.end);
      this.addInfoWindow(this.end, 'End Location');
    }
    if (this.current) {
      this.markerPositions.push(this.current);
      this.addInfoWindow(this.current, 'Current Location');
    }
  }

  addInfoWindow(position: google.maps.LatLngLiteral, content: string) {
    const infoWindow = new google.maps.InfoWindow({
      content: content,
      position: position,
    });
    this.infoWindows.push(infoWindow);
  }

  calculateRoute() {
    if (this.locationFrom && this.locationTo) {
      const request: google.maps.DirectionsRequest = {
        origin: new google.maps.LatLng(
          this.locationFrom.lat,
          this.locationFrom.lng,
        ),
        destination: new google.maps.LatLng(
          this.locationTo.lat,
          this.locationTo.lng,
        ),
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const directionsRenderer = new google.maps.DirectionsRenderer();

          if (this.map.googleMap) {
            directionsRenderer.setMap(this.map.googleMap);
            directionsRenderer.setDirections(response);
          } else {
            console.error("La carte n'est pas disponible");
          }
        } else {
          console.error("Erreur lors du calcul de l'itinéraire: " + status);
        }
      });
    }
  }

  showInfoWindows() {
    this.infoWindows.forEach((infoWindow) => {
      infoWindow.open(this.map.googleMap);
    });
  }
}
