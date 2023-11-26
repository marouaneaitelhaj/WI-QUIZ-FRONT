import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubjectResponse } from '../responses/subject-response';

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
