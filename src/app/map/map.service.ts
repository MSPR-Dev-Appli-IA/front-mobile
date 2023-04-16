import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { geojson } from './map-page/map-source';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 44.837789;
  lng = -0.57918;
  private apiKey = environment.mapboxApiKey;

  init(): mapboxgl.Map {
    return new mapboxgl.Map({
      accessToken: this.apiKey,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });
  }

  configure(map: mapboxgl.Map) {
    // Add map controls
    map.addControl(new mapboxgl.NavigationControl());
    map.on('load', () => {
      map.loadImage(
        'https://img.icons8.com/material/256/marker.png',
        (error, image: any) => {
          if (error) throw error;
          map.addImage('custom-marker', image);
        }
      );
      map.addSource('points', geojson);

      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'points',
        layout: {
          'icon-anchor': 'bottom',
          'icon-offset': [0, 75],
          'icon-image': 'custom-marker',
          'icon-size': 0.15,
          'text-field': ['get', 'title'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 1.25],
          'text-anchor': 'top',
        },
      });
    });
  }
}
