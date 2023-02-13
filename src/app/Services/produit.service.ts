import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../Model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  url = 'http://localhost:8080/api/produit'

  constructor(private http: HttpClient) { }

  //affichage de toutes les produits
  AffichageProduit():Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.url}/liste`);
  }

  
  //La mthode permettant d'ajouter un produit

  PostProduit(nom:any, description :any, marque: any,  prix:any, modele: any, capacite:any, quantite_disponible: any, user_id:any, categorie_id:any, boutique_id: any ,type:any , file :any){
    const data = new FormData()
    data.append('nom', nom );
    data.append('description', description );
    data.append('marque', marque );
    data.append('prix', prix );
    data.append('modele', modele );
    data.append('capacite', capacite );
    data.append('quantite_disponible', quantite_disponible );
    data.append('type', type );
    data.append('file', file );
    data.append('user_id', user_id );
    data.append('categorie_id', categorie_id );
    data.append('boutique_id', boutique_id );
    console.log(file)
    
    return this.http.post<any>(`${this.url}/ajouter` ,data)
  }



  modifier(id: any, data: any): Observable<any> {
    return this.http.put(`${this.url}/modifier/${id}`, data);
  }
  //Suppression

  Supprimer(id: any): Observable<any> {
    return this.http.delete(`${this.url}/supprimer/${id}`);
  }
}
