import { Component, OnInit } from '@angular/core';
import { Categorie } from '../Model/categorie';
import { CategorieService } from '../Services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  p = 1;
  categories: any
  categorie: Categorie={

    nom: '',
  
  };

  constructor(  private categorieService: CategorieService)   { }

  ngOnInit(): void {

    //Afficher les categories

    this.categorieService.AfficherCategorie().subscribe(data =>{
      this.categories = data;
      
      for(let test of this.categories){
        console.log("voir si ca marche:" + test.nom);

     }

 
    })
  }

}
