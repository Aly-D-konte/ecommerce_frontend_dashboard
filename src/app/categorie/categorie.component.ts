import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Categorie } from '../Model/categorie';
import { CategorieService } from '../Services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  p: number = 1;
  searchText: any;

  categories: any
 // catego:any
  categorie: Categorie={

    nom: '',
  
  };
  isLoggedIn = false;
  isLoginFailed = false;

  formmodule!: FormGroup;
  file: any;

  constructor(  private categorieService: CategorieService, private fb: FormBuilder
    )   { }

  ngOnInit(): void {

    //Afficher les categories

    this.categorieService.AfficherCategorie().subscribe(data =>{
      this.categories = data;
      
     })


     this.formmodule = this.fb.group({
      nom: ["", Validators.required],
     
    })
  }
  fileChang(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
  }

  AjoutCategorie(){
    this.categorieService.ajouterCategorie(this.categorie.nom, this.file).subscribe(data=>{
      //console.log("c'est quel nom" + )
      this.categorie =this.formmodule.value;
      this.categorie =data

      Swal.fire({
        heightAuto: false,
        // position: 'top-end',
        icon: 'success',
        text: 'Categorie créée avec succès',
        showConfirmButton: false,
        timer: 2500
      })
   // La methode permettra d'actualiser la page apres l'ajout
     window.location.reload();
    })
  }
}
