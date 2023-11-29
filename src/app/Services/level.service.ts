import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Level } from '../Models/Models';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private url = 'http://localhost:8080/level';
  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<MyResponse<Level>> {
    return this.http.get<MyResponse<Level>>(this.url);
  }
  public save(level: Level): Observable<MyResponse<Level>> {
    return this.http.post<MyResponse<Level>>(this.url, level);
  }
  public update(level: Level): Observable<MyResponse<Level>> {
    return this.http.put<MyResponse<Level>>(this.url + "/" + level.id, level);
  }
  public delete(id: number): Observable<MyResponse<Level>> {
    return this.http.delete<MyResponse<Level>>(this.url + "/" + id);
  }
}
