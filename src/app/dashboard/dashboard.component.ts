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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  jaimes: any;
  afficherBoutique: any;
  // form: FormGroup;

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

  aly=12;
   mali=13
  file: any;
  user: any;
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
  
    //
    // this.boutiqueservice.ajouterBout(this.boutique.nom, this.boutique.adresse, this.boutique.description, this.boutique.etat, this.boutique.user_id, this.file).subscribe(data=>{

    //     this.boutiques =data
    // })
    this.createChart();


    this.boutiqueservice.getAll().subscribe((data) => {
      this.afficherBoutique = data;
      console.log('Afficher la  ' + this.afficherBoutique);
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


  fileChang(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  //la methode de jaime

  Jaime() {
    // this.boutiqueservice.Jaime(this.jaimes, this.)
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

  //listes de boutiques
}
