import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Produit } from '../Model/produit';
import { StorageService } from '../Services/authentification/stockage.service';
import { BoutiquesService } from '../Services/boutiques.service';
import { CategorieService } from '../Services/categorie.service';
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
  categories : any;
  // idcategorie: any;
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

  idcategorie= [];
Options=[]
boutiqueMult = {
    singleSelection: false,
    idField: 'id',
    textField: 'nom',
    selectAllText: 'Tout',
    unSelectAllText: 'Tout',
    noDataAvailablePlaceholderText: 'No data available',
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };

  optionsCate=[]
  categoMult = {
    singleSelection: false,
    idField: 'id',
    textField: 'nom',
    selectAllText: 'Tout',
    unSelectAllText: 'Tout',
    noDataAvailablePlaceholderText: 'No data available',
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  message?: string;
  contenu: any;
  ProduitForm: any;
  errorMessage: any;
  status: any;
  idcategories: any;
  constructor(private produitService: ProduitService,
    private categorieService: CategorieService,
    private route: ActivatedRoute,

     private fb: FormBuilder, private TokenStorage: StorageService,private boutique:BoutiquesService) { }

  ngOnInit(): void {

    this.user=this.TokenStorage.getUser;


    //Affichage des toutes les boutique

    this.produitService.AffichageProduit().subscribe(data=>{
      this.produits = data 

    })

    this.categorieService.AfficherCategorieP().subscribe(data =>{
      this.optionsCate = data[0];
          
     })

     this.boutique.getAll1().subscribe(data=>{
      this.Options=data;

     })

     this.idcategorie = this.route.snapshot.params['idcategorie'];


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

    this.ProduitForm = new FormGroup({
      nom: new FormControl(''),
      description: new FormControl(''),
      marque: new FormControl(''),
      quantite_disponible: new FormControl(''),
      prix: new FormControl(''),
      type: new FormControl(''),
      categorie_id: new FormControl([Validators.required, Validators.pattern("^[0-9]$")]),
      user_id: new FormControl([Validators.required, Validators.pattern("^[0-9]$")]),
      boutique_id: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
      image: new FormControl(''),
      fileSource: new FormControl('', [Validators.required])
    });
  }
  //evenment qui permet de prendre image en format image
 
  fileChang(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
  }
  

  //La methode permettant d'jouter un produit



AjouterProduit() {
 
  this.produitService
    .PostProduit(this.produit.nom, this.produit.description, this.produit.marque, this.produit.modele, this.produit.prix, this.produit.quantite_disponible,this.produit.capacite, this.produit.type, this.produit.boutique_id, this.categorie.categorie_id, this.user.user_id, this.file
    )
    .subscribe((data) => {
      this.produit = this.formmodule.value;
      this.produits = data;
      Swal.fire({
        heightAuto: false,
        // position: 'top-end',
        icon: 'success',
        text: 'Produit créée avec succès',
        showConfirmButton: false,
        timer: 2500,
      });
      
      // La methode permettra d'actualiser la page apres l'ajout
      window.location.reload();

      //finnnnnnnnnnnnnnnnnnnnnnnnnnn
      this.formmodule.reset();
      this.message = ' Produit ajouté avec succès';
      this.contenu = data.contenu;
    });
}

//Suppression
supprimerProduit(): void{
  this.produitService.Supprimer(this.produit.id).subscribe(data=>{
    this.produit = data;
  })
}



onFileChangePhoto(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.ProduitForm.patchValue({
      fileSource: file
    });
  }
}

onSubmit() {
  if (this.ProduitForm.valid) {
    const formData = new FormData();
    const categorie_id = this.ProduitForm.value.categorie_id.map((options: { id: any; }) => options.id);
    const user_id = this.ProduitForm.value.user_id.map((options2: { id: any; }) => options2.id);
    const boutique_id = this.ProduitForm.value.boutique_id.map((options1: { id: any; }) => options1.id);

    formData.append('categorie_id', categorie_id);
    formData.append('user_id', user_id);
    formData.append('boutique_id', boutique_id);
    formData.append('nom', this.ProduitForm.value.nom);
    formData.append('description', this.ProduitForm.value.description);
    formData.append('type', this.ProduitForm.value.type);
    formData.append('marque', this.ProduitForm.value.marque);
    formData.append('prix', this.ProduitForm.value.prix);
    formData.append('image', this.ProduitForm.value.fileSource);

    this.produitService
    .AjouterProduit(formData).subscribe((data: any) => {
      this.errorMessage = data.message;
      this.status = data.status;
      // this.ProduitForm.reset();
    });
  } else {
    this.errorMessage = "Tous les champs champs sont obligatoirs !!";

  }
}
}
