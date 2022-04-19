import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';


const baseUrl = environment.apiURL + 'dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardAdmin() {
    return this.http.get(baseUrl + '/dashboardAdmin');
  }

  markAccess() {
    return this.http.get(baseUrl + '/markAccess');
  }

}
