import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallback } from './core/components/auth-callback/auth-callback';
import { Home } from './features/home/home';

const routes: Routes = [

  {
    path: '',
    component: Home,
  },
  {
    path: 'auth-callback',
    component: AuthCallback,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
