import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Boutiques } from '../Model/boutiques';
import { User } from '../Model/user';
import { BoutiquesService } from '../Services/boutiques.service';
// import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


    jaimes: any
    afficherBoutique: any;
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
    etat:any




public chart : any;
  basicData: any;

  multiAxisData: any;

  multiAxisOptions: any;

  lineStylesData: any;

  basicOptions: any;
  formmodule!: FormGroup;

  
    file: any;
  constructor(private fb: FormBuilder,
    private boutiqueservice : BoutiquesService,
    private route: ActivatedRoute,
    private routes: Router) {
 
        
}


  ngOnInit(): void {


    //chart
    // this.createChart();


 
    //
    // this.boutiqueservice.ajouterBout(this.boutique.nom, this.boutique.adresse, this.boutique.description, this.boutique.etat, this.boutique.user_id, this.file).subscribe(data=>{
        
    //     this.boutiques =data
    // })


    this.boutiqueservice.getAll().subscribe(data=>{
        this.afficherBoutique = data
        console.log("Afficher la  " +this.afficherBoutique);
      })
      //

    
    this.formmodule = this.fb.group({
        nom: ["", Validators.required],
        file: ["", Validators.required],
        description: ["", Validators.required],
        adresse: ["", Validators.required],
        etat:["",Validators.required],
        user_id:["",Validators.required]
      })

//     this.multiAxisData = {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [{
//           label: 'Dataset 1',
//           fill: false,
//           borderColor: '#42A5F5',
//           yAxisID: 'y',
//           tension: .4,
//           data: [65, 59, 80, 81, 56, 55, 10]
//       }, {
//           label: 'Dataset 2',
//           fill: false,
//           borderColor: '#00bb7e',
//           yAxisID: 'y1',
//           tension: .4,
//           data: [28, 48, 40, 19, 86, 27, 90]
//       }]
//   };

//   this.multiAxisOptions = {
//       stacked: false,
//       plugins: {
//           legend: {
//               labels: {
//                   color: '#495057'
//               }
//           }
//       },
//       scales: {
//           x: {
//               ticks: {
//                   color: '#495057'
//               },
//               grid: {
//                   color: '#ebedef'
//               }
//           },
//           y: {
//               type: 'linear',
//               display: true,
//               position: 'left',
//               ticks: {
//                   color: '#495057'
//               },
//               grid: {
//                   color: '#ebedef'
//               }
//           },
//           y1: {
//               type: 'linear',
//               display: true,
//               position: 'right',
//               ticks: {
//                   color: '#495057'
//               },
//               grid: {
//                   drawOnChartArea: false,
//                   color: '#ebedef'
//               }
//           }
//       }
//   };

//   this.multiAxisOptions = {
//     stacked: false,
//     plugins: {
//         legend: {
//             labels: {
//                 color: '#495057'
//             }
//         }
//     },
//     scales: {
//         x: {
//             ticks: {
//                 color: '#495057'
//             },
//             grid: {
//                 color: '#ebedef'
//             }
//         },
//         y: {
//             type: 'linear',
//             display: true,
//             position: 'left',
//             ticks: {
//                 color: '#495057'
//             },
//             grid: {
//                 color: '#ebedef'
//             }
//         },
//         y1: {
//             type: 'linear',
//             display: true,
//             position: 'right',
//             ticks: {
//                 color: '#495057'
//             },
//             grid: {
//                 drawOnChartArea: false,
//                 color: '#ebedef'
//             }
//         }
//     }
// };
// this.multiAxisOptions = {
//   stacked: false,
//   plugins: {
//       legend: {
//           labels: {
//               color: '#ebedef'
//           }
//       }
//   },
//   scales: {
//       x: {
//           ticks: {
//               color: '#ebedef'
//           },
//           grid: {
//               color: 'rgba(255,255,255,0.2)'
//           }
//       },
//       y: {
//           type: 'linear',
//           display: true,
//           position: 'left',
//           ticks: {
//               color: '#ebedef'
//           },
//           grid: {
//               color: 'rgba(255,255,255,0.2)'
//           }
//       },
//       y1: {
//           type: 'linear',
//           display: true,
//           position: 'right',
//           ticks: {
//               color: '#ebedef'
//           },
//           grid: {
//               drawOnChartArea: false,
//               color: 'rgba(255,255,255,0.2)'
//           }
//       }
//   }
// };
}
// onSubmit() {
//     if (this.form.valid) {
//       // Traitez les données du formulaire ici
//     }
//   }


//chart
// createChart() {
//     this.chart = new Chart("MyChart", {
//       type: 'bar',
//       data: {
//         labels: ['Jan', 'Fev', 'Mars', 'Av', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'],
//         datasets: [
//           {
//             label: "Sales",
//             data: [467, 577, 572, 79, 92, 574, 573, 576, 79, 92, 574, 573],
//             backgroundColor: '#695CFE'
//           },
//           {
//             label: "Profit",
//             data: [542, 542, 536, 327, 17, 0.00, 538, 541, 79, 92, 574, 1000],
//             backgroundColor: 'limegreen'
//           }
//         ]
//       },
//       options: {
//         aspectRatio: 2.5
//       }
//     });

//   }

  fileChang(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
  }
  
//   ajouerboutique1(){
//     console.log("ajoutttttttttttt de la boutique" + this.boutique.adresse + "  " + this.boutique.description + " " + this.boutique.etat +" " + this.boutique.nom + "  " + this.file)
//     this.boutique = this.formmodule.value
//     let data = new FormData()
//     this.boutiqueservice.ajouterBoutique(this.boutique.nom, this.boutique.description, this.boutique.adresse,this.boutique.user_id, this.boutique.etat, this.file).subscribe(data=>{
//         this.formmodule.reset()
//         this.message = " Boutique ajouté avec succès";
//         this.contenu = data.contenu
//     })
//     this.formmodule.reset()

//   };

//   ajouerboutique() {
//     Swal.fire({
//       title: 'Voulez-vous ajouter cette region?',
//       showDenyButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Save',
//       denyButtonText: `Don't save`,
//     }).then((result) => {
//       /* Read more about isConfirmed, isDenied below */

//       if (result.isConfirmed) {
//         this.boutiqueservice
//           .ajouterBoutique(
//             this.boutique.nom,
//             this.boutique.description,
//             this.boutique.adresse,
//             this.boutique.etat,
//             this.boutique.user_id,
//             this.file
//           )
//           .subscribe((data) => {
//             console.log("ajouttttttttttttttttttttttttttttttttttttttttt de la boutique" + this.boutique)
//             this.boutique = data;
//             console.log('ajout de la region' + this.boutique);
//           });
//         Swal.fire('Saved!', '', 'success');
//       } else if (result.isDenied) {
//         Swal.fire('Changes are not saved', '', 'info');
//       }
//     });
//   }


//la methode de jaime

Jaime(){
    // this.boutiqueservice.Jaime(this.jaimes, this.)
}


ajoutBout(){
    let data = new FormData()
    if(this.etat === "0"){
        this.boutique.etat = false
    }else{
        this.boutique.etat = true
    }
console.log(this.boutique)
    this.boutiqueservice.ajouterBoutique(this.boutique.nom, this.boutique.adresse, this.boutique.description, this.boutique.etat, this.boutique.user_id, this.file).subscribe(data=>{
        this.boutique = this.formmodule.value
       this.afficherBoutique =data
        this.formmodule.reset()
         this.message = " Boutique ajouté avec succès";
         this.contenu = data.contenu
        
    })
}


//listes de boutiques


}



  
