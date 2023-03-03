import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  styleUrls: ['./produits.component.scss'],
})
export class ProduitsComponent implements OnInit {
  user: any;
  searhText: any
  p:number = 1


  //produittttttttttttttttttttttttttttttttttttttttttttttt ajout
  ProduitPartype: any;
  produits: any;
  produitParUser: any;
  formmodule: any;
  file: any;
  categorie: any;
  isLoggedIn = false;
  isLoginFailed = false;
  categories: any;
  cates: any;
  // idcategorie: any;
  //fomrulaire du produits

  produit: Produit = {
    nom: '',
    description: '',
    marque: '',
    prix: 0,
    modele: '',
    capacite: '',
    quantite_disponible: 0,
    type: '',
  };

  form: any = {
    nom: '',
    description: '',
    marque: '',
    prix: 0,
    quantite_disponible: 0,
    type: '',
    categorie: "",
    boutique: "",
  };

  afficherBoutique: any;
  affich: any;
  categorieAll: any;
  idcategorie = [];
  Options = [];
  boutiqueMult = {
    singleSelection: false,
    idField: 'id',
    textField: 'nom',
    selectAllText: 'Tout',
    unSelectAllText: 'Tout',
    noDataAvailablePlaceholderText: 'No data available',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };

  // optionsCate=[]
  optionsCat = [];
  categoMult = {
    singleSelection: false,
    idField: 'id',
    textField: 'nom',
    selectAllText: 'Tout',
    unSelectAllText: 'Tout',
    noDataAvailablePlaceholderText: 'No data available',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };
  message?: string;
  contenu: any;
  ProduitForm!: FormGroup;
  errorMessage: any;
  status: any;
  cate: any;
  idcategories: any;
  typep: any;
  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private boutiqueservice: BoutiquesService,

    private storageService: StorageService,
    private fb: FormBuilder,
    private TokenStorage: StorageService,
    private boutique: BoutiquesService
  ) {}

  ngOnInit(): void {
    this.loadList();

    this.user = this.storageService.getUser();

    //Affichage de produit par user

    this.produitService.AfficherParUser(this.user.id).subscribe((data) => {
      //console.log('listes de produits ' + this.produitParUser);
      this.produitParUser = data;
    });

    // this.categorieService.AfficherCategorieP().subscribe(data =>{
    //   this.optionsCat = data[0];
    //    alert("c'est quoi le prob " + this.optionsCat)
    //   this.cate= data;

    //  })

    this.categorieService.AfficherCategorie().subscribe((data) => {
      this.categorieAll = data;
      // alert(JSON.stringify( this.categorieAll [1].id))

      // alert("c'est quoi le prob " + this.cates)
      this.cate = data;
    });

    this.produitService.AffichageProduitParType().subscribe((data) => {
      this.ProduitPartype = data;
      for (let bts of this.ProduitPartype) {
        this.typep = bts.id;
      }
      // alert(JSON.stringify( this.ProduitPartype[1].nom))
    });
    this.boutiqueservice.getAll().subscribe((data) => {
      this.afficherBoutique = data;
      // this.loadCategories();
      for (let bt of this.afficherBoutique) {
        this.affich = bt.id;
      }
      // console.log('Afficher la  ' +JSON.stringify(this.afficherBoutique));
    });

    this.idcategorie = this.route.snapshot.params['idcategorie'];

    //@
    this.formmodule = this.fb.group({
      nom: ['', Validators.required],
      file: ['', Validators.required],
      description: ['', Validators.required],
      adresse: ['', Validators.required],
      etat: ['', Validators.required],
      user_id: ['', Validators.required],
      categorie: ['', Validators.required],
      boutique: ['', Validators.required],
    });

    this.ProduitForm = new FormGroup({
      nom: new FormControl(''),
      description: new FormControl(''),
      marque: new FormControl(''),
      quantite_disponible: new FormControl(''),
      prix: new FormControl(''),
      type: new FormControl(''),
      categorie: new FormControl(''),
      user_id: new FormControl(''),
      boutique: new FormControl(''),
      // categorie: new FormControl([Validators.required, Validators.pattern("^[0-9]$")]),
      // // user_id: new FormControl([Validators.required, Validators.pattern("^[0-9]$")]),
      // boutique: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
      image: new FormControl(''),
      fileSource: new FormControl('', [Validators.required]),
    });
  }
  //evenment qui permet de prendre image en format image

  fileChang(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  async loadList() {
    await this.produitService.AffichageProduit().subscribe((data) => {
      this.produits = data;
    });
  }
  //La methode permettant d'jouter un produit

  AjouterProduits() {

    // alert(
    //   JSON.stringify(
    //  "fffffff"+
    //  this.ProduitPartype.type_produit,
    //  )
    // );
    console.log("test1 = "+this.form.ProduitPartype)
    console.log("test2 = "+this.form.afficherBoutique)
    console.log("test3 = "+this.form.categorie)

    this.produitService
      .PostProduit(
        this.form.nom,
        this.form.description,
        this.form.marque,
        this.form.prix,
        this.form.quantite_disponible,
        this.form.ProduitPartype,
        this.form.categorie,
        this.user.id,
        this.form.afficherBoutique,
        this.file
      )

      .subscribe((data) => {
        console.log('nom' + this.produit.nom);
        this.produit = this.formmodule.value;
        this.produit = data;
        Swal.fire({
          heightAuto: false,
          // position: 'top-end',
          icon: 'success',
          text: 'Produit créée avec succès',
          showConfirmButton: false,
          timer: 2500,
        });

      //   // La methode permettra d'actualiser la page apres l'ajout
        window.location.reload();

        //finnnnnnnnnnnnnnnnnnnnnnnnnnn
        this.formmodule.reset();
        this.message = ' Produit ajouté avec succès';
        this.contenu = data.contenu;
      });
  }

  //Suppression
  supprimerProduit(): void {
    this.produitService.Supprimer(this.produit.id).subscribe((data) => {
      this.produit = data;
    });
  }

  onFileChangePhoto(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ProduitForm.patchValue({
        fileSource: file,
      });
    }
  }

  // onSubmit() {
  //   if (this.ProduitForm.valid) {

  //     const formData = new FormData();
  //     // const categorie= this.ProduitForm.value.categorie.map((optionsCat: { id: any; }) => optionsCat.id);
  //     // // const user = this.ProduitForm.value.user.map((options2: { id: any; }) => options2.id);
  //     // const boutique = this.ProduitForm.value.boutique.map((Options: { id: any; }) => Options.id);

  //     formData.append('categorie', this.ProduitForm.value.categorie);
  //     // formData.append('user', user);
  //     formData.append('boutique', this.ProduitForm.value.boutique);
  //     formData.append('nom', this.ProduitForm.value.nom);
  //     formData.append('description', this.ProduitForm.value.description);
  //     formData.append('type', this.ProduitForm.value.type);
  //     formData.append('marque', this.ProduitForm.value.marque);
  //     formData.append('prix', this.ProduitForm.value.prix);
  //     formData.append('image', this.ProduitForm.value.fileSource);

  //     alert("mm"+JSON.stringify(this.ProduitForm.value.nom))
  //     this.produitService.AjouterProduit(formData).subscribe((data: any) => {
  //       this.errorMessage = data.message;
  //       this.status = data.status;
  //       this.ProduitForm.reset();
  //     });
  //   } else {
  //     this.errorMessage = "Tous les champs champs sont obligatoirs !!";

  //   }
  // }
}
