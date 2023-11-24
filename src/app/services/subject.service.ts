import { Injectable } from '@angular/core';
import { Subject } from '../classes/subject';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  subjects: Subject[] = [];
  constructor() {

  }
  getSubjects() {
    axios.get('http://localhost:8080/subject')
      .then(response => {
        this.subjects = response.data.content;
      })
    return this.subjects;
  }
}
