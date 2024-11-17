import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DashboardService } from 'src/app/service/dashboard.service';
import * as jQuery from 'jquery';
import { FileUploadService } from 'src/app/service/fileUpload/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-dashboard-symbol',
  templateUrl: './dashboard-symbol.component.html',
  styleUrls: ['./dashboard-symbol.component.css'],
})
export class DashboardSymbolComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

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
  tq_nt_condition = false;
  loading = false;

  scoreDet = 0;
  avgtotalscoreDet = 0;
  symbolModalDet = '';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  constructor(
    private dashService: DashboardService,
    private router: Router,
    private uploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      paging: true,
      ordering: true,
    };
    this.getIndustry();
    this.getTop10List();
  }
  private loadjs() {
    jQuery(function () {
      jQuery('#dtlist').DataTable();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }
  rangeUpdate(val: any) {
    this.deliveryPercent = val.target.value;
  }

  getIndustry() {
    this.dashService.getIndustryList().subscribe((result: any) => {
      console.log(result);
      this.industryList = result;
    });
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
      deliverable_percent_filter: this.deliveryPercent,
      tq_nt_condition_filter: this.tq_nt_condition,
    };
    console.log(params);
    this.dashService.getDashboardData(params).subscribe((data: any) => {
      this.loading = false;
      console.log(data);
      this.topList = data;
      this.rerender();
    });
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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.uploadFile(this.currentFile).subscribe({
          next: (event: any) => {
            if(event==='SUCCESS'){
              this.currentFile = undefined;
              console.log('File upload success');
            }
            else if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.status=="SUCCESS"?"File Uploaded Successfully":event.body.status;
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err?.error && err?.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'could not upload file!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
}
