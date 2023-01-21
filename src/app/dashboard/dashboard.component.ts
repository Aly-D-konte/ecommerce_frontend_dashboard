import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationConfig } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Boutiques } from '../Model/boutiques';
import { User } from '../Model/user';
import { BoutiquesService } from '../Services/boutiques.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

   // form: FormGroup;
    boutique: Boutiques = {
        nom: '',
        description: '',
        adresse: '',

        etat: false,
        user_id: new User
      };

    isLoggedIn = false;
    isLoginFailed = false;
    message?: string;

    errorMessage = '';
    content?: string;
    contenu?: string;





  basicData: any;

  multiAxisData: any;

  multiAxisOptions: any;

  lineStylesData: any;

  basicOptions: any;
  formmodule!: FormGroup;

  subscription: Subscription | undefined;

  config: ApplicationConfig | undefined;
    file: any;
  constructor(private fb: FormBuilder,
    private boutiqueservice : BoutiquesService) {
 
        
}


  ngOnInit(): void {
    
    this.formmodule = this.fb.group({
        nom: ["", Validators.required],
        file: ["", Validators.required],
        description: ["", Validators.required],
        adresse: ["", Validators.required],
        etat:["",Validators.required]
        // user_id:["",Validators.required]
      })

    this.multiAxisData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
          label: 'Dataset 1',
          fill: false,
          borderColor: '#42A5F5',
          yAxisID: 'y',
          tension: .4,
          data: [65, 59, 80, 81, 56, 55, 10]
      }, {
          label: 'Dataset 2',
          fill: false,
          borderColor: '#00bb7e',
          yAxisID: 'y1',
          tension: .4,
          data: [28, 48, 40, 19, 86, 27, 90]
      }]
  };

  this.multiAxisOptions = {
      stacked: false,
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y1: {
              type: 'linear',
              display: true,
              position: 'right',
              ticks: {
                  color: '#495057'
              },
              grid: {
                  drawOnChartArea: false,
                  color: '#ebedef'
              }
          }
      }
  };

  this.multiAxisOptions = {
    stacked: false,
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            ticks: {
                color: '#495057'
            },
            grid: {
                drawOnChartArea: false,
                color: '#ebedef'
            }
        }
    }
};
this.multiAxisOptions = {
  stacked: false,
  plugins: {
      legend: {
          labels: {
              color: '#ebedef'
          }
      }
  },
  scales: {
      x: {
          ticks: {
              color: '#ebedef'
          },
          grid: {
              color: 'rgba(255,255,255,0.2)'
          }
      },
      y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
              color: '#ebedef'
          },
          grid: {
              color: 'rgba(255,255,255,0.2)'
          }
      },
      y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
              color: '#ebedef'
          },
          grid: {
              drawOnChartArea: false,
              color: 'rgba(255,255,255,0.2)'
          }
      }
  }
};
}
// onSubmit() {
//     if (this.form.valid) {
//       // Traitez les données du formulaire ici
//     }
//   }

  fileChang(event: any) {
    this.file = event.target.files[0];
  }
  
  ajouerboutique1(){
    this.boutique = this.formmodule.value
    let data = new FormData()
    this.boutiqueservice.ajouterBoutique(this.boutique.nom, this.boutique.description, this.boutique.adresse,this.boutique.user_id, this.boutique.etat, this.file).subscribe(data=>{
        this.formmodule.reset()
        this.message = " Boutique ajouté avec succès";
        this.contenu = data.contenu
    })

  };

  ajouerboutique() {
    Swal.fire({
      title: 'Voulez-vous ajouter cette region?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */

      if (result.isConfirmed) {
        this.boutiqueservice
          .ajouterBoutique(
            this.boutique.nom,
            this.boutique.description,
            this.boutique.adresse,
            this.boutique.etat,
            this.boutique.user_id,
            this.file
          )
          .subscribe((data) => {
            console.log("ajouttttttttttttttttttttttttttttttttttttttttt de la boutique" + this.boutique)
            this.boutique = data;
            console.log('ajout de la region' + this.boutique);
          });
        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

}



  
