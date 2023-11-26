import { Injectable } from '@angular/core';
import { SubjectResponse } from './subject-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private apiUrl = 'http://localhost:8080/subject';
  
  constructor(private http: HttpClient) {
  }

  public getSubjects(): Observable<SubjectResponse> {
    return this.http.get<SubjectResponse>(this.apiUrl);
  }
}
