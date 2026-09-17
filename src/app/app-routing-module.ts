import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallback } from './core/components/auth-callback/auth-callback';
import { Home } from './features/home/home';
import { Create } from './features/create/create';
import { Detail } from './features/detail/detail';
import { Update } from './features/update/update';

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
  {
    path: 'update/:id',
    component: Update,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
