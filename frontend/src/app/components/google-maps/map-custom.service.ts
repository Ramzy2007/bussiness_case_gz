import { Injectable, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class MapCustomService {
  cbAddress: EventEmitter<any> = new EventEmitter<any>();

  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 40.416906;
  lng = -3.7056721;
  zoom = 3;
  wayPoints: Array<any> = [];
  markerDriver: mapboxgl.Marker | null = null;

  constructor(private httpClient: HttpClient, private socket: Socket) {
    // Mapbox token can be set directly in the map options
  }

  buildMap(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [this.lng, this.lat],
          accessToken: environment.mapPk // Set the accessToken here
        });

        const geocoder = new MapboxGeocoder({
          accessToken: environment.mapPk,
          mapboxgl: mapboxgl
        });

        // Add the geocoder to the map and listen for the 'result' event
        this.map.addControl(geocoder);

        // geocoder.on('result', (event: { result: any }) => {
        //   const { result } = event;
        //   geocoder.clear();
        //   this.cbAddress.emit(result);
        // });

        resolve({
          map: this.map,
          geocoder
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  loadCoords(coords: [number, number][]): void {
    const url = [
      `https://api.mapbox.com/directions/v5/mapbox/driving/`,
      `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
      `?steps=true&geometries=geojson&access_token=${environment.mapPk}`,
    ].join('');

    this.httpClient.get(url).subscribe((res: any) => {
      const data = res.routes[0];
      const route = data.geometry.coordinates;

      if (this.map.getSource('route')) {
        this.map.removeLayer('route');
        this.map.removeSource('route');
      }

      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        }
      });

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': 'red',
          'line-width': 5
        }
      });

      this.wayPoints = route;
      this.map.fitBounds([route[0], route[route.length - 1]], {
        padding: { top: 100, bottom: 100, left: 100, right: 100 }
      });

      this.socket.emit('find-driver', { points: route });
    }, (error) => {
      console.error('Error loading coordinates:', error);
    });
  }

  addMarkerCustom(coords: [number, number]): void {
    if (this.markerDriver) {
      this.markerDriver.setLngLat(coords).addTo(this.map);
    } else {
      const el = document.createElement('div');
      el.className = 'marker';
      this.markerDriver = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .addTo(this.map);
    }
  }
}
