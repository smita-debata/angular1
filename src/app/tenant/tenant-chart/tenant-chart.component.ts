import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexMarkers,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
} from 'ngx-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  colors: string[];
  legend: ApexLegend;
  labels: string[];
  fill: ApexFill;
};
@Component({
  selector: 'app-tenant-chart',
  templateUrl: './tenant-chart.component.html',
  styleUrls: ['./tenant-chart.component.css'],
})
export class TenantChartComponent implements OnInit {
  public chartOptions: any;
  ngOnInit() {
    this.chartOptions = {
      series: [
        {
          name: "Rental",
          group: "Rental",
          data: [44000, 55000, 41000, 67000, 22000, 43000]
        },
        {
          name: "Maintenance",
          group: "Maintenance",
          data: [48000, 50000, 40000, 65000, 25000, 40000]
        },
        {
          name: "Electricity",
          group: "Electricity",
          data: [48000, 50000, 40000, 65000, 25000, 40000]
        },

      ],
      chart: {
        toolbar: {
          show: false // Set this to false to hide the toolbar
        },
        type: "bar",
        height: 280,

      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      dataLabels: {
        formatter: (val: any) => {
          return Number(val) / 1000 + "K";
        }, enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 3,
        }
      },
      xaxis: {
        categories: [
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT"
        ]
      },
      title: {
        text: 'Column Chart Header Name',
      },
      fill: {
        opacity: 1
      },
      colors: ["#40afed", "#c8e7f8", "#e6e6e6"],
      yaxis: {
        labels: {
          formatter: (val: number) => {
            return val / 1000 + "K";
          }
        }
      },

      legend: {
        position: "top",
        horizontalAlign: "right"
      }
    };
  }

}


