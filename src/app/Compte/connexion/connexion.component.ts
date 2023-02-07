import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/authentification/auth.services';
import { StorageService } from 'src/app/Services/authentification/stockage.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

    //les attribues pour l'authentification
    form: any = {
      usernameOrEmail: null,
      password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    usernameOrEmail:any
  
    constructor(private authService: AuthService, private storageService: StorageService, private route: Router) { }
  
    ngOnInit(): void {
      if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
       // this.roles = this.storageService.getUser().roles;
        this.usernameOrEmail = this.storageService.getUser().username;
        this.route.navigateByUrl("sidebar/dashboard")
       
      }
    }
  
    onSubmit(): void {
      const { usernameOrEmail, password } = this.form;
  
      this.authService.login(usernameOrEmail, password).subscribe({
        next: data => {
          this.storageService.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;

          
      
        // this.route.navigateByUrl("sidebar/dashboard")
        // this.route.navigate(['/sidebar/dashboard']).then(()=>{
        //   setTimeout(() => {
        //     location.reload();
        //   }, 100);
        // });
        this.roles = this.storageService.getUser().roles;
    
       this.route.navigateByUrl("/sidebar/dashboard")

        //  this.roles = this.storageService.getUser().roles;
         // this.reloadPage();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          
        }
      });
    }
  
    reloadPage(): void {
     window.location.reload();
   // this.route.navigateByUrl("/sidebar/w")
    }
  }


