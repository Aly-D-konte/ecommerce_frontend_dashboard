import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../Model/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  url = 'http://localhost:8080/api/commande/liste'
  constructor( private http: HttpClient) { }


  //affichage de commandes

  AffichageCommande(): Observable<Commande[]>{
  return  this.http.get<Commande[]>(`${this.url}`);
  }
}
