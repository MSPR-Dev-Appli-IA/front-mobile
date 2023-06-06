import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantPageComponent } from './plant-page/plant-page.component';

const routes: Routes = [
  {
    path: '',
    component: PlantPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantsRoutingModule {}
