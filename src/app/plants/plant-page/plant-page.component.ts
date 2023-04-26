import { Component, OnInit } from '@angular/core';
import { Plant, UserPlantsService } from '../plants.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-plant-page',
  templateUrl: './plant-page.component.html',
  styleUrls: ['./plant-page.component.scss'],
})
export class PlantPageComponent implements OnInit {
  plants: Observable<Plant[]> | undefined;
  constructor(private service: UserPlantsService) {}

  ngOnInit() {
    this.plants = this.service.getPlants();
  }

  applyFilter(event: Event) {
    console.log((<HTMLInputElement>event.target).value);
    this.plants = this.service.getPlants().pipe(
      map(plants =>
        plants.filter(plant => {
          const input = (<HTMLInputElement>event.target).value.toLowerCase();
          return (
            plant.species.name.toLowerCase().includes(input) ||
            plant.name.toLowerCase().includes(input)
          );
        })
      )
    );
  }
}
