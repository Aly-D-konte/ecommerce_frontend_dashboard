import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {


  url = "http://localhost:8080/panier/";

  constructor( private http: HttpClient) { }

  //affichage de panier
}
