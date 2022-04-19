import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../../../environments/environment';

const baseUrl = environment.apiURL + 'estabelecimentos';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getByCNPJ(cnpj: any): Observable<any> {
    return this.http.get(`${baseUrl}/cnpj/${cnpj.replace(/[^0-9]/g, '')}`);
  }

  getByIdVet(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/veterinario/${id}`);
  }

  getByName(name: any): Observable<any> {
    return this.http.get(`${baseUrl}/nome/${name}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }

  getLocale(cep: any): Observable<any> {
    return this.http.get(`${baseUrl}/cep/${cep}`);
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
