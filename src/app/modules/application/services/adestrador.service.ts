import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../../../environments/environment';

const baseUrl = environment.apiURL + 'adestrador';

@Injectable({
  providedIn: 'root'
})
export class AdestradorService {

  constructor(private http: HttpClient) { }

  getByRG(rg: any): Observable<any> {
    return this.http.get(`${baseUrl}/rg/${rg}`);
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getByEspecialidade(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/especialidades/${id}`);
  }

  getByEspecialidadeMunicipio(id: any, municipio: any): Observable<any> {
    return this.http.get(`${baseUrl}/especialidades/${id}/municipio/${municipio}`);
  }


  getByName(nomeFormated: any): Observable<any> {
    return this.http.get(`${baseUrl}/perfil/${nomeFormated}`);
  }

  getByNameMunicipio(nomeFormated: any, municipio: any): Observable<any> {
    return this.http.get(`${baseUrl}/perfil/${nomeFormated}/municipio/${municipio}`);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  getReview(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/review/${id}`);
  }

  createReview(id: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/review/${id}`, data);
  }

  getByUser(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/usuario/${id}`);
  }
}
