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
}

export interface Plant {
  id: number;
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
    description: '',
    imageUrls: ['plant.png'],
    species: {
      name: 'Ficus Robusta',
      description: 'A beautiful plantae of the bikonta subdomain.',
      sunExposure: 'Moyenne',
      watering: '2 fois / jour',
      optimalTemperature: '',
    },
    hasRequest: true,
    hasAdvice: true,
  },
  {
    id: 2,
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
    hasAdvice: true,
  },
];
