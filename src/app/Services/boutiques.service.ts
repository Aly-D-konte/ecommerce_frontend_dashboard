import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boutiques } from '../Model/boutiques';

@Injectable({
  providedIn: 'root'
})
export class BoutiquesService {
url = 'http:localhost:8080/api/boutique'
jaime ='http://localhost:8080/jaime/ajouter'
  constructor(private http : HttpClient) { }

  //Affficher toutes les boutiques

  getAll(): Observable<Boutiques[]> {
    return this.http.get<Boutiques[]>(`http://localhost:8080/api/boutique/liste`);
  }

    //methode permettant d'ajouter une boutique
    ajouterBoutique(nom:any, description :any, adresse: any, etat:any, user_id:any,  file :any): Observable<any>{
      console.log("nom : " + nom + "etat :" + etat    + "description: " + description)
          const data = new FormData()
          data.append('nom', nom );
          data.append('description', description );
          data.append('adresse', adresse );
          data.append('etat', etat );
          data.append('file', file );
          data.append('user_id', user_id );
          console.log(file)
          
          return this.http.post<any>("http://localhost:8080/api/boutique/ajouter", data)
        }

        // ajouterBout(nom:any, description :any, adresse: any, etat:any, user_id:any,  file :any): Observable<any>{
        //   console.log("nom : " + nom + "etat :" + etat    + "description: " + description)
        //       const data:FormData = new FormData()
            
              
        //       return this.http.post<Boutiques>(`http://localhost:8080/api/boutique/ajouter/${nom}/${description}/${adresse}/${user_id}/${file}`, data)
        //     }


        //ajouter un jaime 

        Jaime(Jaime : any ,user_id:any, boutique_id:any):Observable<any>{

          let data = new FormData();
          data.append("jaime", this.jaime)

          return this.http.post<any>(`http://localhost:8080/jaime/ajouter/${user_id}/${boutique_id}`, data)
        }

        //Nombre totals de boutique

        nombreBoutique(id : number):Observable<any>{
          return this.http.get(`${this.url}/${id}`)
        }
}
