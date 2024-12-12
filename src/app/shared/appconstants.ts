import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})

export class AppConstants {

    public static get Headers(): any {
        return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    public static get BaseUrl(): string {
        return 'http://localhost:7886/';  
    }
}