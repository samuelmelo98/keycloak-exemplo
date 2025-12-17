import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { ProtegidaComponent } from './paginas/protegida.component';

import { AuthGuard } from './guards/guard.auth';

import { TesteComponent } from './paginas/teste.component';
import { HomeComponent } from './paginas/home.component';


//onst routes: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'protegida',
    component: ProtegidaComponent,
    canActivate: [AuthGuard]   // ✔️ Guard aplicado
  },
  {

    path: 'nova-rota',
    component: TesteComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
