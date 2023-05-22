import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagePageComponent } from './message-page/message-page.component';
import { MessageWindowComponent } from './message-window/message-window.component';

const routes: Routes = [
  {
    path: '',
    component: MessagePageComponent,
    children: [
      {
        path: ':id',
        component: MessageWindowComponent
      }
    ]
  },
  {
    path: 'mobile/:id',
    component: MessageWindowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule {}
