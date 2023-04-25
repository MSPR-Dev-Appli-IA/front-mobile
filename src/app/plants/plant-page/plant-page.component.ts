import { Component, OnInit } from '@angular/core';
import { Plant, UserPlantsService } from '../plants.service';
import { Observable } from 'rxjs';

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
}
