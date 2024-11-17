import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '@appconstants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formdata = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest(
      'POST',
      AppConstants.BaseUrl + 'api/TradingTrial/upload',
      formdata,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }
}
