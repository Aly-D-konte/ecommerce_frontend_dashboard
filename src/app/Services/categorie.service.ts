import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../Model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  url = "http://localhost:8080/api/categorie/liste"


  constructor( private http : HttpClient) { }

  AfficherCategorie(): Observable<Categorie[]>{
    return this.http.get<Categorie[]>(`${this.url}`);
  }

  //methode permettant d'ajouter une categorie
  ajouterCategorie(nom:any,  file:any): Observable<any>{
    console.log("nom : " + nom )
        const data = new FormData()
        data.append('nom', nom );
        data.append('file', file );
       
        console.log(file)
        
        return this.http.post<any>("http://localhost:8080/api/categorie/ajouter", data)
      }

}
