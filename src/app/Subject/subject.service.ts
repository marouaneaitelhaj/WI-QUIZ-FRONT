import { Injectable } from '@angular/core';
import { SubjectResponse } from './subject-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MyService } from '../Shared/interfaces/MyService';


@Injectable({
  providedIn: 'root'
})
export class SubjectService implements MyService {

  private apiUrl = 'http://localhost:8080/subject';
  
  constructor(private http: HttpClient) {
  }

  public getSubjects(): Observable<SubjectResponse> {
    return this.http.get<SubjectResponse>(this.apiUrl);
  }
  save(): void {
    
  }
  get(): void {
    console.log('get from subject service');
  }
  delete(): void {
    console.log('delete from subject service');
  }
  update(): void {
    console.log('update from subject service');
  }
}
