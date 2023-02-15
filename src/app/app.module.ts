import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { JwtModule } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
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
    UtilisateursComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),

    
    JwtModule.forRoot({
      config: {
       tokenGetter: tokenGetter,
      allowedDomains: ["localhost:4200"]
      },
    }),
  ],  schemas: [NO_ERRORS_SCHEMA],
    

    

  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
