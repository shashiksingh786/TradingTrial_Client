import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '@appconstants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  httpOptions = {
    headers: AppConstants.Headers,
  };
  routeUrl = 'api/TradingTrial/';
  constructor(private http: HttpClient) {}
  getIndustryList(): Observable<any> {
    return this.http.get<any>(
      AppConstants.BaseUrl + this.routeUrl + 'getIndustryList',
      this.httpOptions
    );
  }
  getTop10List(): Observable<any> {
    return this.http.get<any>(
      AppConstants.BaseUrl + this.routeUrl + 'gettoplist',
      this.httpOptions
    );
  }

  getDashboardData(modal: any): Observable<any> {
    return this.http.post<any>(
      AppConstants.BaseUrl + this.routeUrl +'dashboard',
      modal,
      this.httpOptions
    );
  }

  getSymbolDetails(modal: any): Observable<any> {
    return this.http.post<any>(
      AppConstants.BaseUrl + this.routeUrl +'symboldetails',
      modal,
      this.httpOptions
    );
  }
}
