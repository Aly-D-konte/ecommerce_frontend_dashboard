import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../Model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  url = "http://localhost:8080/api/categorie/liste"


  constructor( private htttp : HttpClient) { }

  AfficherCategorie(): Observable<Categorie[]>{
    return this.htttp.get<Categorie[]>(`${this.url}`);
  }
}
