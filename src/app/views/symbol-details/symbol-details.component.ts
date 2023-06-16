import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-symbol-details',
  templateUrl: './symbol-details.component.html',
  styleUrls: ['./symbol-details.component.css']
})
export class SymbolDetailsComponent implements OnChanges {
  @Input() symbolModal = '';
  @Input() score = 0;
  @Input() avgtotalscore = 0;

  gridData: any[] = [];
  closePriceCategoryArr: any[] = [];
  closePriceValueArr: any[] = [];

  scoreCategoryArr: any[] = [];
  scoreValueArr: any[] = [];

  avgtotalscoreCategoryArr: any[] = [];
  avgtotalscoreValueArr: any[] = [];

  tqntscoreCategoryArr: any[] = [];
  tqntscoreValueArr: any[] = [];

  ttqscoreCategoryArr: any[] = [];
  ttqscoreValueArr: any[] = [];

  nmfscoreCategoryArr: any[] = [];
  nmfscoreValueArr: any[] = [];

  delpercentscoreCategoryArr: any[] = [];
  delpercentscoreValueArr: any[] = [];
  constructor(private dashService: DashboardService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getdata();
  }

  getdata() {
    const params: any = {
      symbol: this.symbolModal
    }
    this.dashService.getSymbolDetails(params).subscribe(
      (res: any) => {
        this.gridData = res[0];

        const resultClosePrice = this.getchartdataarrange(res[1], 'CLOSE_PRICE'); 
        this.closePriceCategoryArr = resultClosePrice[0];
        this.closePriceValueArr = resultClosePrice[1];

        const resultScore = this.getchartdataarrange(res[2], 'SCORE'); 
        this.scoreCategoryArr = resultScore[0];
        this.scoreValueArr = resultScore[1];

        const resultavgtotalscore = this.getchartdataarrange(res[3], 'AVG_TOTAL_SCORE'); 
        this.avgtotalscoreCategoryArr = resultavgtotalscore[0];
        this.avgtotalscoreValueArr = resultavgtotalscore[1];

        const resulttqntscore = this.getchartdataarrange(res[4], 'TQNT_SCORE'); 
        this.tqntscoreCategoryArr = resulttqntscore[0];
        this.tqntscoreValueArr = resulttqntscore[1];

        const resultTTQscore = this.getchartdataarrange(res[5], 'TTQ_SCORE'); 
        this.ttqscoreCategoryArr = resultTTQscore[0];
        this.ttqscoreValueArr = resultTTQscore[1];

        const resultNMFscore = this.getchartdataarrange(res[6], 'NMF_SCORE'); 
        this.nmfscoreCategoryArr = resultNMFscore[0];
        this.nmfscoreValueArr = resultNMFscore[1];

        const resultDelPercentscore = this.getchartdataarrange(res[7], 'DEL_PERCENT_SCORE'); 
        this.delpercentscoreCategoryArr = resultDelPercentscore[0];
        this.delpercentscoreValueArr = resultDelPercentscore[1];

      }
    )
  }

  getchartdataarrange(json: any, charttype: string): [any[], any[]] {
    const jsondata = json;
    const arrCategory: any[] = [];
    const arrValue: any[] = [];
    if (jsondata != null && jsondata != '') {
      if (charttype === 'CLOSE_PRICE') {
        jsondata.forEach((element: { TRADING_DATE: any; CLOSE_PRICE: any; }) => {
          arrCategory.push(element.TRADING_DATE);
          arrValue.push(element.CLOSE_PRICE);
        });
      } else if (charttype === 'SCORE') {
        jsondata.forEach((element: { TRADING_DATE: any; SCORE: any; }) => {
          arrCategory.push(element.TRADING_DATE);
          arrValue.push(element.SCORE);
        });
      } else if (charttype === 'AVG_TOTAL_SCORE') {
        jsondata.forEach((element: { TRADING_DATE: any; AVG_TOTAL_SCORE: any; }) => {
          arrCategory.push(element.TRADING_DATE);
          arrValue.push(element.AVG_TOTAL_SCORE);
        });
      } else if (charttype === 'TQNT_SCORE') {
        jsondata.forEach((element: { TRADING_DATE: any; SCORE_TQ_NT: any; }) => {
          arrCategory.push(element.TRADING_DATE);
          arrValue.push(element.SCORE_TQ_NT);
        });
      } else if (charttype === 'TTQ_SCORE') {
        jsondata.forEach((element: { TRADING_DATE: any; SCORE_TTQ: any; }) => {
          arrCategory.push(element.TRADING_DATE);
          arrValue.push(element.SCORE_TTQ);
        });
      } else if (charttype === 'NMF_SCORE') {
        jsondata.forEach((element: { TRADING_DATE: any; SCORE_NMF: any; }) => {
          arrCategory.push(element.TRADING_DATE);
          arrValue.push(element.SCORE_NMF);
        });
      } else if (charttype === 'DEL_PERCENT_SCORE') {
        jsondata.forEach((element: { TRADING_DATE: any; SCORE_DEL_PERCENT: any; }) => {
          arrCategory.push(element.TRADING_DATE);
          arrValue.push(element.SCORE_DEL_PERCENT);
        });
      }
    }

    return [arrCategory, arrValue];
  }


}
