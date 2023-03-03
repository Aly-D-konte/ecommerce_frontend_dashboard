import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component';
import { CommandeComponent } from './commande/commande.component';
import { ConnexionComponent } from './Compte/connexion/connexion.component';
import { InscriptionComponent } from './Compte/inscription/inscription.component';
import { ProfileComponent } from './Compte/profile/profile.component';
import { DashComponent } from './dash/dash.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProduitsComponent } from './produits/produits.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';

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
    component: SidebarComponent, canActivate: [AuthGuardService],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'dash', component: DashComponent},

      // {path: 'dashboard/:idboutique', component: DashboardComponent},
      {path: 'categorie', component: CategorieComponent},
      {path: 'produit', component: ProduitsComponent},
      {path: 'commande', component: CommandeComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'utilisateur', component: UtilisateursComponent},

    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuardService]
})
export class AppRoutingModule { }
