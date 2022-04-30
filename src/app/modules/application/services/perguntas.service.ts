import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
const baseUrl = environment.apiURL + 'perguntas';

@Injectable({
  providedIn: 'root'
})
export class PerguntasService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getAllAdmin(): Observable<any> {
    return this.http.get(baseUrl + '/admin');
  }
  getPerguntasParaResponder(): Observable<any> {
    return this.http.get(baseUrl + '/responder');
  }
  getDetailPergunta(id): Observable<any> {
    return this.http.get(baseUrl + '/' + id + '/detalhe');
  }

  validarPergunta(id, status): Observable<any> {
    return this.http.put(baseUrl + '/' + id + '/validar', { status });
  }

  changeEspecialidade(id, especialidade): Observable<any> {
    return this.http.put(baseUrl + '/' + id + '/changeEspecialidade', { especialidade });
  }

  responderPergunta(id, resposta): Observable<any> {
    return this.http.put(baseUrl + '/' + id + '/responder', { resposta });
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getDashboard() {
    return this.http.get(baseUrl + '/dashboard');
  }


}
