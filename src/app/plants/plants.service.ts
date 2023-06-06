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
    watering: '2 fois / jour',
    optimalTemperature: '15°C'
  },
  {
    id: 2,
    name: 'Arbre',
    description: 'truc',
    sunExposure: 'Moyenne',
    watering: '2 fois / semaine',
    optimalTemperature: '20°C'
  },
  {
    id: 3,
    name: 'Ficus Robusta',
    description: 'truc',
    sunExposure: 'Haute',
    watering: '2 fois / jour',
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
      sunExposure: 'Haute',
      watering: '2 fois / jour',
      optimalTemperature: '17°C'
    },
    hasRequest: false,
    hasAdvice: false
  },
  {
    id: 2,
    name: 'Bo the crazy bonsai',
    description: '',
    imageUrls: ['bonsai.jpg'],
    species: {
      id: 1,
      name: 'Bonsai',
      description: 'A beautiful plantae of the bikonta subdomain.',
      sunExposure: 'Moyenne',
      watering: '1 fois / mois',
      optimalTemperature: '20°C'
    },
    hasRequest: true,
    hasAdvice: false
  },
  {
    id: 4,
    name: 'Garfield',
    description: '',
    imageUrls: ['gardenia.jpg'],
    species: {
      id: 1,
      name: 'Gardénia',
      description: 'A beautiful plantae of the bikonta subdomain.',
      sunExposure: 'Moyenne',
      watering: '2 fois / semaine',
      optimalTemperature: '15°C'
    },
    hasRequest: false,
    hasAdvice: true
  },
  {
    id: 3,
    name: 'Rosalia',
    description: '',
    imageUrls: ['rose.jpg'],
    species: {
      id: 1,
      name: 'Rose',
      description: 'A beautiful plantae of the bikonta subdomain.',
      sunExposure: 'Basse',
      watering: '2 fois / jour',
      optimalTemperature: '15°C'
    },
    hasRequest: false,
    hasAdvice: true
  }
];
