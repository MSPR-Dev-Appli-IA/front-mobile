import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { geojson } from './map-page/map-source';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
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
      center: [this.lng, this.lat]
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
          'text-anchor': 'top'
        }
      });
    });
  }

  getListings(): Observable<Listing[]> {
    return of(LISTINGS);
  }
}

const LISTINGS = [
  {
    id: 1,
    title: 'Yucca gloriosa',
    date: '5 juin - 12 septembre',
    district: 'Chartrons',
    sun_exposure: 'Haute',
    water_needs: '2 fois / jour',
    temperature: '20°C',
    image_url: 'yucca.jpg'
  },
  {
    id: 2,
    title: 'Bégonia',
    date: '12 juillet - 10 août',
    district: 'Saint-Michel',
    sun_exposure: 'Moyenne',
    water_needs: '4 fois / semaine',
    temperature: '20°C',
    image_url: 'begonia.jpg'
  },
  {
    id: 3,
    title: 'Hibiscus',
    date: '7 août - 12 août',
    district: 'La Bastide',
    sun_exposure: 'Moyenne',
    water_needs: '1 fois / jour',
    temperature: '20°C',
    image_url: 'hibiscus.jpg'
  },
  {
    id: 4,
    title: 'Monstera',
    date: '7 août - 12 août',
    district: 'Caudéran',
    sun_exposure: 'Bas',
    water_needs: '3 fois / jour',
    temperature: '25°C',
    image_url: 'monstera.jpg'
  }
];

export interface Listing {
  id: number;
  title: string;
  date: string;
  district: string;
  sun_exposure: string;
  water_needs: string;
  temperature: string;
  image_url: string;
}
