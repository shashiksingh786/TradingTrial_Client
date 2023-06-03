import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-dashboard-symbol',
  templateUrl: './dashboard-symbol.component.html',
  styleUrls: ['./dashboard-symbol.component.css']
})
export class DashboardSymbolComponent implements OnInit {
  deliveryPercent = 10;
  industryList: any;
  topList: any = [];
  symbolModal = '';
  nifty_50=false;
  nifty_it=false;
  nifty_bank=false;
  industry='';
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
      symbol: this.symbolModal
    };
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
