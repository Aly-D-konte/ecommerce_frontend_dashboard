import { Component, OnInit } from '@angular/core';
import { ApplicationConfig } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  basicData: any;

  multiAxisData: any;

  multiAxisOptions: any;

  lineStylesData: any;

  basicOptions: any;

  subscription: Subscription | undefined;

  config: ApplicationConfig | undefined;
  constructor() {}

  ngOnInit(): void {

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
}



  
