import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}
  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        usernameOrEmail,
        password,
      },
      httpOptions
    );
  }

  register(nom : string , prenom : string ,username: string, email: string,telephone: string,genre: string, password: string, adresse: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        nom,
        prenom,
        username,
        email,
        telephone,
        genre,
        password,
        adresse
      },
      httpOptions
    );
  }

  logout():Observable<any>{
    // return this.http.post(
    //   AUTH_API + 'logout',{},httpOptions
    //   );
    const req = new HttpRequest('POST', AUTH_API + 'signout', {}, httpOptions);
return this.http.request(req);
  }



    // verification si le token est expiré ou pas
    public isAuthenticated(): boolean {
      const token = window.sessionStorage.getItem('auth-user');
      // Check whether the token is expired and return
      // true or false
      //return !this.jwtHelper.isTokenExpired(token);
      if(token){
        return true
      }else{
        return false;
      }
    }
}