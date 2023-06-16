import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-dashboard-symbol',
  templateUrl: './dashboard-symbol.component.html',
  styleUrls: ['./dashboard-symbol.component.css']
})
export class DashboardSymbolComponent implements OnInit {
  deliveryPercent = 0;
  industryList: any;
  topList: any = [];
  symbolModal = '';
  nifty_50 = false;
  nifty_it = false;
  nifty_bank = false;
  industry = '';
  avgtotalscore = 0;
  score = 0;
  loading = false;

  scoreDet = 0;
  avgtotalscoreDet = 0;
  symbolModalDet = '';
  constructor(private dashService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.getIndustry();
    // this.getTop10List();
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
    this.loading = true;
    const params = {
      symbol: this.symbolModal,
      nifty_50: this.nifty_50,
      nifty_it: this.nifty_it,
      nifty_bank: this.nifty_bank,
      industry: this.industry,
      score_filter: this.score,
      avg_total_score_filter: this.avgtotalscore,
      deliverable_percent_filter: this.deliveryPercent
    };
    console.log(params);
    this.dashService.getDashboardData(params).subscribe(
      (data: any) => {
        this.loading = false;
        console.log(data);
        this.topList = data;
      }
    );
  }

  searchSymbol() {
    this.getTop10List();
  }
  gotodetails(item: any) {
    this.scoreDet = item.SCORE;
    this.avgtotalscoreDet = item.AVG_TOTAL_SCORE;
    this.symbolModalDet = item.SYMBOL;
  }
  clearmodal() {
    this.symbolModal = '';
    this.industry = '';
    this.score = 0;
    this.avgtotalscore = 0;
    this.deliveryPercent = 0;
  }
  syncdata() {
    this.clearmodal();
    this.getTop10List();
  }

}
