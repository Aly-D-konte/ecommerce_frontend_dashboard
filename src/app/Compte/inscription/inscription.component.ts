import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import { AuthService } from 'src/app/Services/authentification/auth.services';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  //les attribues pour l'authentification
  // nom!: string;
  // email!: string;
  // motdepass!: string;
  
  form: any = {
    nom: null,
    prenom: null,
    username: null,
    telephone:null,
    genre: null,
    email: null,
    password: null,
    adresse : null

  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  utilisateur! : User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  //button pour l'inscription

  register(): void {
    // console.log("-------------------------------------------")
    
    // let user = new User({
    //   "username": this.nom,
    //   "password": this.motdepass,
    //   "useremail": this.email
    // })
    const { nom, prenom, username, telephone,genre, email, password, adresse } = this.form;
    this.authService.register(nom, prenom, username, telephone,genre, email, password, adresse).subscribe({
      // console.log("-------------------------------------------")
      // this.utilisateur = data;
      // console.table(data)
      next: data => {
        console.table(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });

  }
}
