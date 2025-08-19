import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'curriculum', component: PortfolioComponent },
  { path: 'my-projects', component: MyProjectsComponent },
  { path: '**', redirectTo: 'about' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
