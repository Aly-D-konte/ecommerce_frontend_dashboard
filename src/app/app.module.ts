import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConnexionComponent } from './Compte/connexion/connexion.component';
import { InscriptionComponent } from './Compte/inscription/inscription.component';
import { ProfileComponent } from './Compte/profile/profile.component';
import { CategorieComponent } from './categorie/categorie.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProduitsComponent } from './produits/produits.component';
import { CommandeComponent } from './commande/commande.component';
import { PanierComponent } from './panier/panier.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    ConnexionComponent,
    InscriptionComponent,
    ProfileComponent,
    CategorieComponent,
    ProduitsComponent,
    CommandeComponent,
    PanierComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
