import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/authentification/utilisateur.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {
  user: any;

  constructor(private userservice : UserService) { }

  ngOnInit(): void {


    //afficher toutes les utilisateurs
    this.userservice.getAllUser().subscribe(data=>{
      this.user = data
    })
  }

}
