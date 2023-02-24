import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit , Inject,  PLATFORM_ID } from '@angular/core';
import { AuthService } from '../Services/authentification/auth.services';
import { StorageService } from '../Services/authentification/stockage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  //les attributions pour l'authentification
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  showDashboard:any;
  Role!:any;

  isLoginFailed = false;
  showAdmin=false;
  showSuperAdmin=false;

  constructor( 
    @Inject(PLATFORM_ID) private platformId: object,
    private storageService: StorageService, private authService: AuthService,
    ) { }

  ngOnInit(): void {

      //la methode pour l'authenfication
      this.isLoggedIn = this.storageService.isLoggedIn();

      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;
        this.Role= this.roles;

        this.showDashboard = this.roles.includes('ROLE_SUPER_ADMIN');

        this.showDashboard = this.roles.includes('ROLE_ADMIN');
        this.showDashboard = this.roles.includes('ROLE_USER');
  
        this.username = user.username;
      }
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });





    


    if (isPlatformBrowser(this.platformId)) {
      const navMain = document.getElementById('navbarCollapse');
      if (navMain) {
        navMain.onclick = function onClick() {
          if (navMain) {
            navMain.classList.remove('show');
          }
        };
      }
    }
  }



}
