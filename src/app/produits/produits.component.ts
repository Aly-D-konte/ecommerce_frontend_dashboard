import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Produit } from '../Model/produit';
import { StorageService } from '../Services/authentification/stockage.service';
import { ProduitService } from '../Services/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {

  user:any;

  //produittttttttttttttttttttttttttttttttttttttttttttttt ajout 
  produits: any;
  formmodule: any;
  file : any;
  categorie :any
  isLoggedIn = false;
  isLoginFailed = false;
  //fomrulaire du produits

  produit: Produit={
    nom: "",
    description: "",
    marque: "",
    prix: 0,
    modele:"",
    capacite:"",
    quantite_disponible: 0,
    type:"",
  }
  message?: string;
  contenu: any;
  constructor(private produitService: ProduitService, private fb: FormBuilder, private TokenStorage: StorageService) { }

  ngOnInit(): void {

    this.user=this.TokenStorage.getUser;


    //Affichage des toutes les boutique

    this.produitService.AffichageProduit().subscribe(data=>{
      //console.log("La liste de produits")
      this.produits = data 
    })


    //@
    this.formmodule = this.fb.group({
      nom: ["", Validators.required],
      file: ["", Validators.required],
      description: ["", Validators.required],
      adresse: ["", Validators.required],
      etat:["",Validators.required],
      user_id:["",Validators.required],
      categorie_id:["",Validators.required]
    })
  }
  //evenment qui permet de prendre image en format image
 
  fileChang(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
  }
  

  //La methode permettant d'jouter un produit

  AjouterProduit(){
    this.produitService.PostProduit(this.produit.nom, this.produit.description, this.produit.marque, this.produit.modele, this.produit.prix, this.produit.quantite_disponible,this.produit.capacite, this.produit.type, this.produit.boutique_id, this.categorie.categorie_id, this.user.user_id, this.file).subscribe(data=>{
      this.produits = this.formmodule.value
      this.formmodule.reset()
       this.message = " Produit ajouté avec succès";
       this.contenu = data.contenu

       console.log("voir si marche "+ " " + this.produits)
  }  )

}
}
