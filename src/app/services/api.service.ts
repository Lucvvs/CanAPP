import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = 'http://192.168.100.9:3000';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Obtener todas las novedades
  getNovedades(): Observable<any> {
    console.log('🌐 URL usada para novedades:', `${this.apiURL}/novedades`);
    return this.http.get(`${this.apiURL}/novedades`);
  }


  getNovedad(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/novedades/${id}`);
  }

  createNovedad(novedad: any): Observable<any> {
    return this.http.post(`${this.apiURL}/novedades`, novedad, this.httpOptions);
  }


  updateNovedad(id: number, novedad: any): Observable<any> {
    return this.http.put(`${this.apiURL}/novedades/${id}`, novedad, this.httpOptions);
  }

  deleteNovedad(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/novedades/${id}`, this.httpOptions);
  }

  getNacionalidades(): Observable<any[]> {
    return this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=translations');
  }
}