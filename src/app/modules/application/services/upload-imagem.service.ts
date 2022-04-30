import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';


const baseUrl = environment.apiURL + 'upload';

@Injectable({
  providedIn: 'root'
})
export class UploadImagemService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  createAwait(data) {
    return this.http.post(baseUrl, data).toPromise();
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
