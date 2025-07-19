import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then(m => m.ContactoPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule),
    canActivate: [authGuardGuard]
  },
  {
    path: 'agendar',
    loadChildren: () => import('./pages/agendar/agendar.module').then(m => m.AgendarPageModule),
    canActivate: [authGuardGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [authGuardGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./components/tabs/tabs.module').then(m => m.TabsModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}