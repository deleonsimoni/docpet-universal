import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Song } from './song';
import { SONGS } from './mock-songs';
import { Servicos } from './servicos';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/v1/servicos';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  song: Song[];
  servicos : Servicos[];
  constructor(private http: HttpClient) {
    this.song = [];
    this.servicos = [];
   }

  getSongs(year: number): Song[] {
    this.song = SONGS[year - 1].items;
    return this.song;
  }

  getServicos(): Observable<any>{
    return this.http.get(`${baseUrl}`);
  }

}


