import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component';
import { ConnexionComponent } from './Compte/connexion/connexion.component';
import { InscriptionComponent } from './Compte/inscription/inscription.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitsComponent } from './produits/produits.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [

  {path: 'connexion', component: ConnexionComponent},
  {path: 'inscription', component: InscriptionComponent},
  {
    path: "sidebar",
    component: SidebarComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'categorie', component: CategorieComponent},
      {path: 'produit', component: ProduitsComponent},

    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
