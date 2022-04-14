import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const baseUrl = environment.apiURL + 'veterinarios';

@Injectable({
  providedIn: 'root'
})

export class VeterinarioService {

  constructor(private http: HttpClient) { }

  getByCRMV(crmv: any): Observable<any> {
    return this.http.get(`${baseUrl}/crmv/${crmv}`);
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  getListReviews(): Observable<any> {
    return this.http.get(`${baseUrl}/reviews/sort`);
  }

  getByEspecialidade(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/especialidades/${id}`);
  }

  getByEspecialidadeMunicipio(id: any, municipio: any): Observable<any> {
    return this.http.get(`${baseUrl}/especialidades/${id}/municipio/${municipio}`);
  }

  getByNoEspecialidadeMunicipio(especialidade: any, municipio: any): Observable<any> {
    return this.http.get(`${baseUrl}/pesquisa/${especialidade}/${municipio}`);
  }

  getByName(nomeFormated: any): Observable<any> {
    return this.http.get(`${baseUrl}/perfil/${nomeFormated}`);
  }

  getByNameEspecialidadeMunicipio(nomeFormated: any, especialidadeFormated: any, municipioFormated: any): Observable<any> {
    return this.http.get(`${baseUrl}/perfil/${nomeFormated}/${especialidadeFormated}/${municipioFormated}`);
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
    console.log(`${baseUrl}/review/${id}`);
    return this.http.post(`${baseUrl}/review/${id}`, data);
  }

  getByUser(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/usuario/${id}`);
  }
}
