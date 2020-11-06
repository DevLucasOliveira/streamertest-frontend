import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FramePageComponent } from './frame/frame';

const routes: Routes = [
  {
    path: '',
    component: FramePageComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
