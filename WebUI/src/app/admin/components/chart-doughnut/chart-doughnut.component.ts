import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartData, ChartType, ChartTypeRegistry } from 'chart.js';
import { BillService } from 'src/app/services/http/bill.service';

@Component({
  selector: 'app-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.scss']
})
export class ChartDoughnutComponent {

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Order to home',
    'Order in restaurent',
  ];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart of Order This Month',
        position: 'bottom',
        font: {
          size: 20,
        },
      }
    }
  };
  private CHART_COLORS = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ];
  protected chart: Chart | any;
  private billService: BillService;
  constructor(dialog: MatDialog, private router: Router, http: HttpClient) {
    this.billService = new BillService(http);
  }

  ngOnInit(): void {
    this.getTotolRevenueListOfYear();
  }
  getTotolRevenueListOfYear() {
    this.billService.getTotolRevenueOfOrderInCurrentMonth().subscribe((list: number[]) => {
      this.chart = new Chart("doughnutChart", {
        type: 'doughnut',
        data: {
          labels: this.doughnutChartLabels,
          datasets: [
            {
              data: list,
              backgroundColor: [this.CHART_COLORS[Math.floor(Math.random() * 7)], this.CHART_COLORS[Math.floor(Math.random() * 7)]],
            }
          ]
        },
        options: this.doughnutChartOptions,
      })
    });
  }
}
