import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component';
import { CommandeComponent } from './commande/commande.component';
import { ConnexionComponent } from './Compte/connexion/connexion.component';
import { InscriptionComponent } from './Compte/inscription/inscription.component';

import { ProfileComponent } from './Compte/profile/profile.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitsComponent } from './produits/produits.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [

  {path: 'connexion', component: ConnexionComponent},
  {
    path: '',
    redirectTo: 'connexion',
    pathMatch: 'full'
  },
  {path: 'inscription', component: InscriptionComponent},
  {
    
    path: "sidebar",
    component: SidebarComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'categorie', component: CategorieComponent},
      {path: 'produit', component: ProduitsComponent},
      {path: 'commande', component: CommandeComponent},
      {path: 'profile', component: ProfileComponent},

    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
