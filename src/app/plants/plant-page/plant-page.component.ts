import { Component, OnInit } from '@angular/core';
import { Plant, UserPlantsService } from '../plants.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddEditPlantModalComponent } from '../add-edit-plant-modal/add-edit-plant-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';

@Component({
  selector: 'app-plant-page',
  templateUrl: './plant-page.component.html',
  styleUrls: ['./plant-page.component.scss']
})
export class PlantPageComponent implements OnInit {
  plants: Observable<Plant[]> | undefined;
  isMobile$: Observable<boolean>;

  constructor(
    private service: UserPlantsService,
    public dialog: Dialog,
    private responsive: BreakpointObserver
  ) {
    this.isMobile$ = this.responsive
      .observe(Breakpoints.HandsetPortrait)
      .pipe(map((result: BreakpointState): boolean => result.matches));
  }

  ngOnInit() {
    this.plants = this.service.getPlants();
  }

  applyFilter(event: Event) {
    this.plants = this.service.getPlants().pipe(
      map(plants =>
        plants.filter(plant => {
          const input = (<HTMLInputElement>event.target).value.toLowerCase();
          return (
            plant.species?.name.toLowerCase().includes(input) ||
            plant.name.toLowerCase().includes(input)
          );
        })
      )
    );
  }

  openDialog() {
    this.dialog.open(AddEditPlantModalComponent, {
      minWidth: '400px',
      data: {
        plant: undefined
      }
    });
  }
}
