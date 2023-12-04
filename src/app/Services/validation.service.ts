import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Validation from '../Models/Validation';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private url = 'http://localhost:8080/validation';
  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<MyResponse<Validation>> {
    return this.http.get<MyResponse<Validation>>(this.url);
  }
  public save(validation: Validation): Observable<MyResponse<Validation>> {
    return this.http.post<MyResponse<Validation>>(this.url, validation);
  }
  public update(validation: Validation): Observable<MyResponse<Validation>> {
    return this.http.put<MyResponse<Validation>>(this.url + "/" + validation.id, validation);
  }
  public delete(id: number): Observable<MyResponse<Validation>> {
    return this.http.delete<MyResponse<Validation>>(this.url + "/" + id);
  }
}
