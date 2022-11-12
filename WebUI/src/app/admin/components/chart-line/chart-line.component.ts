import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartOptions, ChartType, Color } from 'chart.js';
import { BillService } from 'src/app/services/http/bill.service';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit {


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total Revenue',
        borderColor: 'rgb(8,153,93)',
        fill: true,
        tension: 0.1,
        backgroundColor: 'rgba(0,255,0,0.2)',
        borderWidth: 2,
      }
    ]
  }
    ;
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Chart of Total Revenue Per Month In ${new Date().getFullYear()} `,
        position: 'bottom',
        font: {
          size: 20,
        },
      }
    }
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  protected chart: Chart | any;
  private billService: BillService;
  constructor(dialog: MatDialog, private router: Router, http: HttpClient) {
    this.billService = new BillService(http);
    let date = new Date();
    let thisMonth = date.getMonth();
    this.lineChartData.labels = Array.from({ length: thisMonth }, (item, i) => {
      return new Date(0, i).toLocaleString('en-US', { month: 'long' })
    });
  }

  ngOnInit(): void {
    this.getTotolRevenueListOfYear();
  }
  getTotolRevenueListOfYear() {
    this.billService.getTotolRevenueListOfYear().subscribe((list: number[]) => {
      this.lineChartData.datasets[0].data = list;
      this.chart = new Chart("lineChart", {
        type: 'line',
        data: this.lineChartData,
        options: this.lineChartOptions
      })
    });
  }
}
