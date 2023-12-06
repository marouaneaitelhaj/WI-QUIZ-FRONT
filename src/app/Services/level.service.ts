import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Level from '../Models/Level';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private url = 'http://localhost:8080/level';
  constructor(private http: HttpClient) {
    this.findAll();
  }
  public levels = new BehaviorSubject<Level[]>([]);
  public findAll(): void {
    this.http.get<MyResponse<Level>>(this.url).subscribe(
      (response) => {
        this.levels.next(response.content);
      }
    );
  }
  public save(level: Level): void {
    this.http.post<MyResponse<Level>>(this.url, level).subscribe(
      (response) => {
        this.levels.next(this.levels.getValue().concat([response.data]));
      }
    );
  }
  public update(level: Level): void {
    this.http.put<MyResponse<Level>>(this.url + "/" + level.id, level).subscribe(
      (response) => {
        const levels = this.levels.getValue();
        const index = levels.findIndex((s) => s.id === level.id);
        levels[index] = response.data;
        this.levels.next(levels);
      }
    );
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Level>>(this.url + "/" + id).subscribe(
      (response) => {
        const levels = this.levels.getValue();
        const index = levels.findIndex((s) => s.id === id);
        levels.splice(index, 1);
        this.levels.next(levels);
      }
    );
  }
}
