import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as mapboxgl from "mapbox-gl";
import { geojson } from './map-source';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 44.837789;
  lng = -0.57918;

  apiKey = environment.mapboxApiKey;

    constructor() { }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: this.apiKey,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', () => {
      this.map.loadImage(
          "https://img.icons8.com/material/256/marker.png",
          (error, image: any) => {
            if (error) throw error;
            this.map.addImage('custom-marker', image);
          }
      );
      this.map.addSource('points', geojson);

      this.map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          'icon-anchor': 'bottom',
          'icon-offset': [0,75],
          'icon-image': 'custom-marker',
          'icon-size': 0.15,
          'text-field': ['get', 'title'],
          'text-font': [
            'Open Sans Semibold',
            'Arial Unicode MS Bold'
          ],
          'text-offset': [0, 1.25],
          'text-anchor': 'top'
        }
      });
    });

  }
}
