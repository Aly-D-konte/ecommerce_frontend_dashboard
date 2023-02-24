import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../Model/user';
import { AuthService } from '../Services/authentification/auth.services';
import { UserService } from '../Services/authentification/utilisateur.service';
import { BoutiquesService } from '../Services/boutiques.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

  p: number =1;
  searchText: any;

  user: any;
  errorMessage: any;
  status: any;
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
  utilisateur! : User;
  userForm: any;
  users:any
  maboutique: any;
  boutiqueParUser: any;
  constructor(private userservice : UserService, private authService: AuthService, private boutiqueservice: BoutiquesService,
    ) { }

  ngOnInit(): void {


    //afficher toutes les utilisateurs
    this.userservice.getAllUser().subscribe(data=>{
      this.user = data
    })

    console.log("etiyrotuyiu " +this.user.id)

    this.boutiqueservice.AfficherParUser(this.users.id).subscribe(data=>{
      console.log("etiyrotuyiu  "+this.user.id)

      console.log("listes de boutique "+ this.boutiqueParUser);
      this.boutiqueParUser = data 

    })
  }

  

onFileChangePhoto(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.userForm.patchValue({
      fileSource: file
    });
  }

  
}

onSubmit() {
  if (this.userForm.valid) {
    const formData = new FormData();
    
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
   

  } else {
    this.errorMessage = "Tous les champs champs sont obligatoirs !!";

  }
}



Inscription() {

  const { nom , prenom,username, email,telephone,genre, password, adresse } = this.form;
  this.authService.register(nom , prenom,username, email,telephone,genre, password, adresse).subscribe((data)=> {
    Swal.fire({
      heightAuto: false,
      // position: 'top-end',
      icon: 'success',
      text: 'Boutique créée avec succès',
      showConfirmButton: false,
      timer: 2500,
    });
    // this.routes.navigateByUrl("/sidebar/dashboard")
    // La methode permettra d'actualiser la page apres l'ajout
    window.location.reload();

    //finnnnnnnnnnnnnnnnnnnnnnnnnnn
    console.log(data);
  })
}
getboutiquebyid(id:any){
  this.boutiqueservice.getbyid(id).subscribe(data=>{
    this.maboutique=data
    console.log(this.maboutique)
  })

}
}
