import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-dashboard-symbol',
  templateUrl: './dashboard-symbol.component.html',
  styleUrls: ['./dashboard-symbol.component.css']
})
export class DashboardSymbolComponent implements OnInit {
  deliveryPercent = 0;
  score = 0;
  avgTotalScore = 0;
  industryList: any;
  topList: any = [];
  symbolModal = '';
  nifty50 = false;
  niftyit = false;
  niftybank = false;
  industry = '';

  constructor(private dashService: DashboardService) { }

  ngOnInit(): void {
    this.getIndustry();
    this.getTop10List();
  }
  rangeUpdate(val: any) {
    this.deliveryPercent = val.target.value;
  }

  getIndustry() {
    this.dashService.getIndustryList().subscribe(
      (result: any) => {
        console.log(result);
        this.industryList = result;

      }
    );
  }

  getTop10List() {
    const params = {
      symbol: this.symbolModal,
      nifty_50: this.nifty50,
      nifty_it: this.niftyit,
      nifty_bank: this.niftybank,
      industry: this.industry,
      score_filter: this.score,
      avg_total_score_filter: this.avgTotalScore,
      deliverable_percent_filter: this.deliveryPercent

    };
    console.log(params);
    this.dashService.getDashboardData(params).subscribe(
      (data: any) => {
        console.log(data);
        this.topList = data;

      }
    );
  }

  searchSymbol() {
    this.getTop10List();

    
  }


}
