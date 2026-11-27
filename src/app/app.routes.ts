import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'curriculum', loadComponent: () => import('./pages/portfolio/portfolio.component').then(m => m.PortfolioComponent) },
  { path: 'my-projects', loadComponent: () => import('./pages/my-projects/my-projects.component').then(m => m.MyProjectsComponent) },
  { path: '**', redirectTo: 'about' }
];
