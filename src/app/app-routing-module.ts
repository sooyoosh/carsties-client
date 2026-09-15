import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallback } from './core/components/auth-callback/auth-callback';
import { Home } from './features/home/home';
import { Create } from './features/create/create';
import { Detail } from './features/detail/detail';

const routes: Routes = [

  {
    path: '',
    component: Home,
  },
  {
    path: 'auth-callback',
    component: AuthCallback,
  },
  {
    path: 'create',
    component: Create,
  },
  {
    path: 'detail/:id',
    component: Detail,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
