import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private baseUrl = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/artists`);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/artist/${id}`);
  }

  public create(data): Observable<any> {
    return this.http.post(`${this.baseUrl}/artist`, data);
  }

  public get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/artist/${id}`);
  }

  public update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/artist/${id}`, data);
  }

}
