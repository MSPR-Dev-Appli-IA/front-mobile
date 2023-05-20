import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../auth/auth.service';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserPlantsService {
  species: any;
  constructor(private http: HttpClient) {}
  getPlants(): Observable<Plant[]> {
    return of(PLANTS);
  }

  getSpecies(): Observable<Species[]> {
    /*return this.http
      .get<Species[]>(environment.apiUrl + 'species', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(
        map((res: any) => ({
          ...res,
          optimalTemperature: res.local.optimalTemperature + '°C'
        })),
        shareReplay()
      );*/
    return of(SPECIES);
  }

  getSpeciesById(id: number): Observable<Species | undefined> {
    return of(SPECIES.find(species => species.id === id));
  }

  askForAdvice(plantId: number) {
    console.log('askForAdvice', plantId);
    this.http.post('plants/' + plantId + '/ask-for-advice', {});
  }

  savePlant(plant: Plant) {
    this.http.post('plants/' + plant.id + '/save', {
      plant: plant
    });
  }
}

export interface Plant {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
  species?: Species;
  hasRequest: boolean;
  hasAdvice: boolean;
}

export interface Species {
  id: number;
  name: string;
  description: string;
  sunExposure: string;
  watering: string;
  optimalTemperature: string;
}

const SPECIES: Species[] = [
  {
    id: 1,
    name: 'Rose',
    description: 'truc',
    sunExposure: 'Moyenne',
    watering: '2x/j',
    optimalTemperature: '15°C'
  },
  {
    id: 1,
    name: 'Arbre',
    description: 'truc',
    sunExposure: 'Moyenne',
    watering: '2x/semaine',
    optimalTemperature: '20°C'
  }
];

const PLANTS: Plant[] = [
  {
    id: 1,
    name: 'Ficascio',
    description: '',
    imageUrls: ['plant.png'],
    species: {
      id: 1,
      name: 'Ficus Robusta',
      description: 'A beautiful plantae of the bikonta subdomain.',
      sunExposure: 'Moyenne',
      watering: '2 fois / jour',
      optimalTemperature: '17°C'
    },
    hasRequest: true,
    hasAdvice: true
  },
  {
    id: 2,
    name: 'Modulos',
    description: '',
    imageUrls: ['plant.png'],
    species: {
      id: 1,
      name: 'Ficus Robusta 2',
      description: 'A beautiful plantae of the bikonta subdomain.',
      sunExposure: 'Moyenne',
      watering: '2 fois / jour',
      optimalTemperature: '15°C'
    },
    hasRequest: false,
    hasAdvice: false
  }
];
