import { Component, effect, input, signal } from '@angular/core';
import { MonthlyEarning } from '@root/app/shared/models/monthly-earning';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-earnings-chart',
  imports: [HighchartsChartComponent],
  templateUrl: './earnings-chart.html',
  styleUrl: './earnings-chart.css',
})
export class EarningsChart {
  monthlyEarnings = input.required<MonthlyEarning[] | []>();
  earningsData = signal<number[]>([]);

  private currentYear = new Date().getFullYear();

  exportOptions: Highcharts.ExportingButtonsOptions = {
    contextButton: {
      enabled: true,
    },
  };
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'area',
      renderTo: 'container',
      reflow: true,
      width: null,
    },
    title: {
      text: 'Revenue Overview',
      align: 'left',
      margin: 30,
    },
    subtitle: {
      text: `Monthly earnings this ${this.currentYear}`,
      align: 'left',
    },
    lang: {
      noData: `No monthly earnings to be shown this ${this.currentYear}`,
    },
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#64748b',
      },
      position: {
        align: 'left', // Aligns the message to the left to match your title
        x: 10,
      },
    },
    xAxis: {
      allowDecimals: false,
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      accessibility: {
        rangeDescription: 'Months',
      },
    },
    yAxis: {
      title: {
        text: 'Earnings',
      },
    },
    tooltip: {
      shared: true,
      valuePrefix: '₱',
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(34, 197, 94, 0.3)'],
            [1, 'rgba(34, 197, 94, 0)'],
          ],
        },
        marker: { radius: 4 },
        lineWidth: 3,
        color: '#22c55e',
        threshold: null,
      },
    },
    series: [
      {
        name: 'Earnings',
        type: 'area',
        data: [],
      },
    ],
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          enabled: true,
        },
      },
    },
  };

  constructor() {
    effect(() => {
      this.loadEarningsData();
      const data = (this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            name: 'Earnings',
            type: 'area',
            data: this.earningsData(),
          },
        ],
      });
    });
  }

  loadEarningsData() {
    const earningsArray = Array<number>(new Date().getMonth() + 1).fill(0);

    this.monthlyEarnings().forEach((item) => {
      earningsArray[item.month - 1] = item.earning;
    });

    this.earningsData.set(earningsArray);
  }
}
