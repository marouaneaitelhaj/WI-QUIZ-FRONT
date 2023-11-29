import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../Models/Models';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private url = 'http://localhost:8080/response';
  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<MyResponse<Response>> {
    return this.http.get<MyResponse<Response>>(this.url);
  }
  public save(response: Response): Observable<MyResponse<Response>> {
    return this.http.post<MyResponse<Response>>(this.url, response);
  }
  public update(response: Response): Observable<MyResponse<Response>> {
    return this.http.put<MyResponse<Response>>(this.url + "/" + response.id, response);
  }
  public delete(id: number): Observable<MyResponse<Response>> {
    return this.http.delete<MyResponse<Response>>(this.url + "/" + id);
  }
}
