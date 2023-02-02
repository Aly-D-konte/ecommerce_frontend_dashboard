import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Services/authentification/stockage.service';
import { UserService } from 'src/app/Services/authentification/utilisateur.service';
import { BoutiquesService } from 'src/app/Services/boutiques.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  users: any
  nomboutique: any
  constructor(private storageService: StorageService, private utilisateurService: UserService, 
    private boutiqueservice: BoutiquesService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.utilisateurService.getAllUser().subscribe(data=>{
      this.users= data
    });

    this.boutiqueservice.getAll().subscribe(data=>{
      this.nomboutique = data
     // console.log("Afficher la  " +this.nomboutique);

    })
  }
}
