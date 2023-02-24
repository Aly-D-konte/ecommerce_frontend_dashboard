import { Component, OnInit } from '@angular/core';
import { StorageService } from '../Services/authentification/stockage.service';
import { UserService } from '../Services/authentification/utilisateur.service';
import { CommandeService } from '../Services/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {
  searchText: any;
  commandes:any
  user:any;
  commandeParUser: any;
  constructor( private commandeService :CommandeService, private userservice: UserService,private storageService: StorageService) { }

  ngOnInit(): void {
    this.user=this.storageService.getUser();


    //Recuperer toutes les commandes
    // console.log("voir si ca marche:" + this.commandes.code);

    this.commandeService.AffichageCommande().subscribe(data =>{
      return this.commandes= data
    })
    //recuperer toutes les 

    this.commandeService.AfficherParUser(this.user.id).subscribe(data=>{
      this.commandeParUser = data ;

    })

  }


}
