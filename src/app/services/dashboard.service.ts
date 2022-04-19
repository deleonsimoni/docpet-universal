import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';


const baseUrl = environment.apiURL + 'dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: TransferHttpService) { }

  getDashboardAdmin() {
    return this.http.get(baseUrl + '/dashboardAdmin');
  }

  markAccess() {
    return this.http.get(baseUrl + '/markAccess');
  }

}
