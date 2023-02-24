import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationConfig } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Boutiques } from '../Model/boutiques';
import { User } from '../Model/user';
import { UserService } from '../Services/authentification/utilisateur.service';
import { BoutiquesService } from '../Services/boutiques.service';
import * as Chart from 'chart.js';
import { interval, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html' ,
  styleUrls: ['./dashboard.component.scss'],
 
})
export class DashboardComponent implements OnInit {
  
  p: number = 1;
  jaimes: any;
  afficherBoutique: any;
  // form: FormGroup;
noms:any;
  boutique: Boutiques = {    
    nom: '',
    description: '',
    adresse: '',
    etat: false,
    user_id: new User(),
  };
  isLoggedIn = false;
  isLoginFailed = false;
  message?: string;

  errorMessage = '';
  content?: string;
  contenu?: string;
  etat: any;

  public chart: any;
  public Piecharts: any;
  basicData: any;

  multiAxisData: any;
  multiAxisOptions: any;
  lineStylesData: any;
  basicOptions: any;
  formmodule!: FormGroup;
  idboutique: any
  aly=12;
  mali=13
  file: any;
  user: any;
  modifierBoutiquenId: any;
  affich: any;
  nom: any;
  etatchange: any;
  name: any;
  maboutique: any;
  modifier: any;
  constructor(
    private fb: FormBuilder,
    private boutiqueservice: BoutiquesService,
    private route: ActivatedRoute,
    private routes: Router,
    private userService: UserService
  ) {}

  //chart line
  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['jan', 'fe', 'mars','mai',
								 'juin', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: [],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: [this.aly,this.mali,this.aly,0,10,17],
            // backgroundColor: 'limegreen',
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
//chart pie
PieChart(){
  
  this.Piecharts = new Chart("pieChart", {
    type: 'pie', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: ['jan', 'fe', 'mars','mai',
               'juin', '2022-05-15', '2022-05-16','2022-05-17', ], 
       datasets: [
        // {
        //   label: "Sales",
        //   data: [],
        //   backgroundColor: 'blue'
        // },
        {
          label: "Profit",
          data: [this.aly,this.mali,this.aly,0,10,17],
          // backgroundColor: 'limegreen',
        }  
      ]
    },
    options: {
      aspectRatio:2.5
    }
    
  });
}
  ngOnInit(): void {
    // this.loadList();
    // this.loadCategories();
    this.getboutiquebyid(this.idboutique);

  this.idboutique = this.route.snapshot.params['idboutique'];
    const moi=1;
    console.log("mon id =========================",this.idboutique)
    /* this.boutiqueservice.AfficheBoutiqueParId(this.idboutique).subscribe(data=>{      
      this.affich = data;
     // this.nom=data.nom;
      console.log("id de la boutique" + JSON.stringify( this.affich.nom));
      // this.boutiqueservice.changeEtat(this.idboutique, this.etat.etat).subscribe(data=>{
      //   console.log('est ce que ça marche ' + data)
      //   this.etat = data;
      //   console.log('est ce que ça marche ' + this.etat)
      // })
    }) */
 
  
    //
    // this.boutiqueservice.ajouterBout(this.boutique.nom, this.boutique.adresse, this.boutique.description, this.boutique.etat, this.boutique.user_id, this.file).subscribe(data=>{

    //     this.boutiques =data
    // })
    this.createChart();
    this.boutiqueservice.getAll().subscribe((data) =>{
      this.afficherBoutique = data;
      // this.loadCategories();
      for(let bt of this.afficherBoutique)
      {
        this.affich = bt.id
      }
      // console.log('Afficher la  ' +JSON.stringify(this.afficherBoutique));
    });
    //liste des utilisateurs

    this.userService.getAllUser().subscribe((data) => {
      this.user = data;
    });

    this.formmodule = this.fb.group({
      nom: ['', Validators.required],
      file: ['', Validators.required],
      description: ['', Validators.required],
      adresse: ['', Validators.required],
      etat: ['', Validators.required],
      user_id: ['', Validators.required],
    });

  }
async loadList(){
   await this.boutiqueservice.getAll().subscribe((data) =>{
    this.afficherBoutique = data;
    // for(let bt of this.afficherBoutique)
    // {
    //   this.modifierBoutiquenId = bt.id
    // }
    console.log('Afficher la  ' + this.afficherBoutique);
  });
}

  fileChang(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  //la methode de jaime

  Jaime() {
    // this.boutiqueservice.Jaime(this.jaimes, this.)
    console.log("dehors de la fonction "+this.affich.nom);

  }

  ajoutBout() {
    let data = new FormData();
    if (this.etat === '0') {
      this.boutique.etat = false;
    } else {
      this.boutique.etat = true;
    }
    console.log(this.boutique);
    this.boutiqueservice
      .ajouterBoutique(
        this.boutique.nom,
        this.boutique.adresse,
        this.boutique.description,
        this.boutique.etat,
        this.boutique.user_id,
        this.file
      )
      .subscribe((data) => {
        this.boutique = this.formmodule.value;
        this.afficherBoutique = data;
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



  ///MOdificationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
  
//   modifierBoutique(idboutique:any) {
   
//     // console.log("azetyrut" +id);

// console.log("nom :"+ this.boutique.nom)
// console.log("adresse :"+ this.boutique.adresse)
// console.log("adresse :"+ this.boutique.adresse)
// console.log("etat :"+ this.boutique.etat)

//     this.boutiqueservice
//       .modifierBoutique(idboutique,
//         this.boutique.nom,
//         this.boutique.adresse,
//         this.boutique.adresse,
//         this.boutique.etat,
//         this.boutique.user_id,
//         this.file
//       )
//       .subscribe((data) => {
//         this.boutique = this.formmodule.value;
//         this.afficherBoutique = data;
//         Swal.fire({
//           heightAuto: false,
//           // position: 'top-end',
//           icon: 'success',
//           text: 'Boutique modifiée avec succès',
//           showConfirmButton: false,
//           timer: 2500,
//         });
//         // this.routes.navigateByUrl("/sidebar/dashboard")
//         // La methode permettra d'actualiser la page apres l'ajout
//         window.location.reload();

//         //finnnnnnnnnnnnnnnnnnnnnnnnnnn
//         this.formmodule.reset();
//         this.message = ' Boutique modifiée avec succès';
//         this.contenu = data.contenu;
//       });
//   }

  //Modifier etat

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
   
   onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
     
    }
  }
  //  +++++++++++++++++++++++++++++++++++


//   async loadCategories() {
 
// this.affich = await firstValueFrom(this.boutiqueservice.getAll());
// //console.log("mon objet===========",this.affich.nom);
// }
  modifierBout(id:any){
    //  alert("Je suis ID /////////////////////////"+ id)
      this.boutiqueservice.modifierBoutique(id,
        this.maboutique.nom,
        this.maboutique.adresse,
        this.maboutique.adresse,
        this.maboutique.user_id,
        this.maboutique.file
      ).subscribe(data=>{
      this.maboutique = data
      // this.name=data[0]
      Swal.fire({
        heightAuto: false,
        // position: 'top-end',
        icon: 'success',
        text: 'Boutique modifiée avec succès',
        showConfirmButton: false,
        timer: 2500,
      });
      window.location.reload();

      //finnnnnnnnnnnnnnnnnnnnnnnnnnn
      this.formmodule.reset();
      // console.log(data)
      // console.log("je boutique//////////////////////////////////////////////////// "+JSON.stringify(this.affich))
      })      
  }
getboutiquebyid(id:any){
  this.boutiqueservice.getbyid(id).subscribe(data=>{
    this.maboutique=data
    // console.log(this.maboutique)
  })

}






//================================================ suprimer ===================

openModal(nom : any, id : number) {
  Swal.fire({
    title: nom,
    text: "Commfirmer la suppression ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText : "NON",
    confirmButtonText: 'OUI'
  }).then((result) => {
    if (result.isConfirmed) {
      //suppp
      this.boutiqueservice.suprimerBoutique(id).subscribe(() => {});
      console.log(id)
      Swal.fire({
        title: 'Supprimer  avec succès',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      window.location.reload()


    }
  });
}


}
