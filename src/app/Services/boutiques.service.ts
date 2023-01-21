import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boutiques } from '../Model/boutiques';

@Injectable({
  providedIn: 'root'
})
export class BoutiquesService {
url = 'http:localhost:8080/boutique'
  constructor(private http : HttpClient) { }

  //Affficher toutes les boutiques

  getAll(): Observable<Boutiques[]> {
    return this.http.get<Boutiques[]>(`${this.url}/liste`);
  }

    //methode permettant d'ajouter une boutique
    ajouterBoutique(nom:any, description :any, adresse: any, etat:any, user_id:any,  file :any): Observable<any>{
      console.log("nom : " + nom + "etat :" + etat    + "description: " + description)
          const data:FormData = new FormData()
          data.append('nom', nom );
          data.append('description', description );
          data.append('adresse', adresse );
          data.append('etat', etat );
          data.append('file', file );
          data.append('user_id', user_id );
          console.log("my data : " +  data)
          
          return this.http.post<Boutiques>("http://localhost:8080/boutique/ajouter", data)
        }
}
