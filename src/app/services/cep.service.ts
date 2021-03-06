import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';

const baseUrl = 'https://viacep.com.br/ws';
const baseUrlServer = environment.apiURL + 'veterinarios';

@Injectable({
  providedIn: 'root'
})
export class CEPService {

  constructor(private http: TransferHttpService) { }

  get(cep: any): Observable<any> {
    return this.http.get(`${baseUrl}/${cep}/json/`);
  }

  getLocale(cep: any): Observable<any> {
    return this.http.get(`${baseUrlServer}/cep/${cep}`);
  }

  getPlace(search: any): Observable<any> {
    return this.http.get(`${baseUrlServer}/locale/${search}`);
  }
}
