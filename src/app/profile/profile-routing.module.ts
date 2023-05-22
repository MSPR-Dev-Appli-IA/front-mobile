import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    children: [
      {
        path: 'general',
        component: ProfileSettingsComponent
      }
    ]
  },
  {
    path: 'general-mobile',
    component: ProfileSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
