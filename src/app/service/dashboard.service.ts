import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '@appconstants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  httpOptions = {
    headers: AppConstants.Headers
  };
  constructor(private http: HttpClient) {

  }
  getIndustryList(): Observable<any> {
    return this.http.get<any>(AppConstants.BaseUrl + 'getIndustryList', this.httpOptions);
  }
  getTop10List(): Observable<any> {
    return this.http.get<any>(AppConstants.BaseUrl + 'gettoplist', this.httpOptions);
  }

  getDashboardData(symbol: any): Observable<any> {
    return this.http.post<any>(AppConstants.BaseUrl + 'dashboard', symbol, this.httpOptions);
  }
}
