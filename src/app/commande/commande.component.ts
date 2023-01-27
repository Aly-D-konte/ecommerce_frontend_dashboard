import { Component, OnInit } from '@angular/core';
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
  constructor( private commandeService :CommandeService, private userservice: UserService) { }

  ngOnInit(): void {

    //Recuperer toutes les commandes

    this.commandeService.AffichageCommande().subscribe(data =>{
      return this.commandes= data
    })
    //recuperer toutes les 

  }


}
