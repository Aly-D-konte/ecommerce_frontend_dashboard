import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../Services/authentification/utilisateur.service';
import { BoutiquesService } from '../Services/boutiques.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  afficherBoutique: any;
  p: number = 1;
  affich: any;
  ajout:any;
  etatchange: any;
  isLoggedIn = false;
  isLoginFailed = false;
  message?: string;
  boutique:any;
  errorMessage = '';
  content?: string;
  contenu?: string;
  etat: any;
  formmodule!: FormGroup;
  file:any;
  user: any;

  form={
    nom:null,
    prenom:null,
  }



  constructor(    private boutiqueservice: BoutiquesService,
    private fb: FormBuilder,
    private userService: UserService,

    ) { }

  ngOnInit(): void {
    this.boutiqueservice.getAll().subscribe((data) =>{
      this.afficherBoutique = data;
      // this.loadCategories();
      for(let bt of this.afficherBoutique)
      {
        this.affich = bt.id
      }
      // console.log('Afficher la  ' +JSON.stringify(this.afficherBoutique));
    });
    this.formmodule = this.fb.group({
      nom: ['', Validators.required],
      file: ['', Validators.required],
      description: ['', Validators.required],
      adresse: ['', Validators.required],
      etat: ['', Validators.required],
      user_id: ['', Validators.required],
    });

    this.userService.getAllUser().subscribe((data) => {
      this.user = data;
      console.log('Afficher la  ' +JSON.stringify(this.user));
    });
    
  }

  fileChang(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
  
  ChangeEtat(idboutique:number,etat:boolean){
    console.log(idboutique + "boutique donnée")
    console.log(etat + "etat donné")
    this.boutiqueservice.changeEtat(idboutique, etat).subscribe(data=>{
      // console.log('est ce que ça marche ' + data)
      this.etatchange = data
      // console.log(data + "etat donné")
       this.reloadPage();    
    })
  }
  reloadPage(): void {
    window.location.reload();
  // this.route.navigateByUrl("/sidebar/w")
   }
   ajoutBout() {
 
    //console.log(this.boutique);
    this.boutiqueservice
      .ajouterBoutique(
        this.ajout.nom,
        this.ajout.adresse,
        this.ajout.description,
        this.ajout.etat,
        this.ajout.user_id,
        this.file
      )
      .subscribe((data) => {
        this.ajout = this.formmodule.value;
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
        this.formmodule.reset();
        this.message = ' Boutique ajouté avec succès';
        this.contenu = data.contenu;
      });
  }
}
