import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { LegalMentionsComponent } from './shared/legal-mentions/legal-mentions.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
    children: [
      {
        path: '',
        loadChildren: () => import('./map/map.module').then(m => m.MapModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'plants',
        loadChildren: () =>
          import('./plants/plants.module').then(m => m.PlantsModule)
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('./messages/messages.module').then(m => m.MessagesModule)
      },
      {
        path: 'legal-mentions',
        component: LegalMentionsComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      { path: 'not-found', component: NotFoundComponent }
    ]
  },
  { path: '**', redirectTo: '/not-found' },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
