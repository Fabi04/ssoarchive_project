import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { HorsesComponent } from './pages/horses/horses';
import { CollectiblesComponent } from './pages/collectibles/collectibles';
import { AccessoriesComponent } from './pages/accessories/accessories';
import { HorsePageComponent } from './pages/horse-page/horse-page';
import { HorsePageIndividual } from './pages/horse-page-individual/horse-page-individual';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'horses', component: HorsesComponent },
  { path: 'collectibles', component: CollectiblesComponent },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'horse-page', component: HorsePageComponent },
  { path: 'horse-page-individual/:id', component: HorsePageIndividual},

];