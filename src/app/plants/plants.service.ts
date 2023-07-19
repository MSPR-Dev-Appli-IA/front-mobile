import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserPlantsService {
  species: any;
  constructor(private http: HttpClient, private authService: AuthService) {}
  getPlants(): Observable<Plant[]> {
    return this.http
      .get<{ result: Plant[] }>(environment.apiUrl + 'plant', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(
        map((res: any) => res.result),
        shareReplay()
      );
  }

  getSpecies(): Observable<Species[]> {
    return this.http
      .get<Species[]>(environment.apiUrl + 'species', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(
        map((res: Species[]) =>
          res.map(species => ({
            ...species,
            optimalTemperature: species.optimalTemperature + '°C'
          }))
        ),
        shareReplay()
      );
  }

  getSpeciesById(id: number): Observable<Species | undefined> {
    return of(SPECIES.find(species => species.id === id));
  }

  askForAdvice(plantId: number) {
    console.log('askForAdvice', plantId);
    this.http.post('plants/' + plantId + '/ask-for-advice', {});
  }

  instanceOfFile(object: any): object is Image {
    return 'path' in object;
  }

  savePlant(plant: Plant) {
    const formData = new FormData();
    formData.append('name', plant.name);
    if (
      plant.images &&
      plant.images?.length > 0 &&
      plant.images[0] instanceof File
    )
      formData.append('file', plant.images[0]);

    return this.http.post(environment.apiUrl + 'plant', formData, {
      withCredentials: true
    });
  }

  // determinePlantSpecies(image: string): Observable<any> {
  //   return this.http.post<any>(
  //     'https://plant.id/api/v3/identification?language=fr&async=true&details=taxonomy',
  //     {
  //       images: [image]
  //     },
  //     {
  //       headers: {
  //         'Api-Key': environment.plantIdAPIKey,
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   );
  // }
}

export interface Image {
  id: string;
  path: string;
}

export interface Plant {
  id: number;
  name: string;
  description: string;
  images?: (Image | File)[];
  species?: Species;
  hasRequest?: boolean;
  hasAdvice?: boolean;
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
    // images: ['plant.png'],
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
    // images: ['bonsai.jpg'],
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
    // images: ['gardenia.jpg'],
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
    // images: ['rose.jpg'],
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
