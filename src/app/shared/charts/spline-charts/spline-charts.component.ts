import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as highcharts from 'highcharts';

declare var require: any;

let boost = require('highcharts/modules/boost');
let nodata = require('highcharts/modules/no-data-to-display');
let more = require('highcharts/highcharts-more');
boost(highcharts);
nodata(highcharts);
more(highcharts);

@Component({
  selector: 'app-spline-charts',
  templateUrl: './spline-charts.component.html',
  styleUrls: ['./spline-charts.component.css']
})
export class SplineChartsComponent implements OnChanges {
  @Input() chartId: any;
  @Input() seriesData: any[] = [];
  @Input() categoryData: any[] = [];
  @Input() chartTitle = '';
  @Input() yaxisTitle = '';
  @Input() seriesName = '';
  chartOption: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.getChartId();

    setTimeout(() => {
      this.BindChartData();
    }, 100);
  }

  getChartId() {
    this.chartId = this.chartId + Math.floor(Math.random() * 6 + 1).toString();
  }

  BindChartData() {

    this.chartOption = {
      chart: {
        type: 'spline',
        height: 300
      },
      title: {
        text: '',
        align: 'left'
      },
      xAxis: {
        categories: this.categoryData
      },
      yAxis: {
        title: {
          text: this.yaxisTitle
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        layout: 'horizontal',
        align: 'right',
        horizontalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          //pointStart: 2010
        }
      },

      series: [{
        name: this.seriesName,
        data: this.seriesData
      },],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };

    // highcharts.setOptions({
    //   colors:highcharts.Co
    // })

    highcharts.chart(this.chartId, this.chartOption);

  }

}
