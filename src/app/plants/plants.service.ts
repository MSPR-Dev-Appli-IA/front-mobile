import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserPlantsService {
  constructor(private http: HttpClient) {}
  getPlants(): Observable<Plant[]> {
    return of(PLANTS);
  }

  askForAdvice(plantId: number) {
    console.log('askForAdvice', plantId);
    this.http.post('/api/plants/' + plantId + '/ask-for-advice', {});
  }

  savePlant(plant: Plant) {
    this.http.post('/api/plants/' + plant.id + '/save', {
      plant: plant,
    });
  }
}

export interface Plant {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
  species: Species;
  hasRequest: boolean;
  hasAdvice: boolean;
}

export interface Species {
  name: string;
  description: string;
  sunExposure: string;
  watering: string;
  optimalTemperature: string;
}

const PLANTS: Plant[] = [
  {
    id: 1,
    name: 'Ficascio',
    description: '',
    imageUrls: ['plant.png'],
    species: {
      name: 'Ficus Robusta',
      description: 'A beautiful plantae of the bikonta subdomain.',
      sunExposure: 'Moyenne',
      watering: '2 fois / jour',
      optimalTemperature: '17°C',
    },
    hasRequest: true,
    hasAdvice: true,
  },
  {
    id: 2,
    name: 'Modulos',
    description: '',
    imageUrls: ['plant.png'],
    species: {
      name: 'Ficus Robusta 2',
      description: 'A beautiful plantae of the bikonta subdomain.',
      sunExposure: 'Moyenne',
      watering: '2 fois / jour',
      optimalTemperature: '15°C',
    },
    hasRequest: false,
    hasAdvice: false,
  },
];
