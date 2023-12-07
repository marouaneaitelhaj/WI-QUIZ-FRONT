import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Validation from '../Models/Validation';
import { MyResponse } from '../Response/Response';
import { AlertService } from '../Components/alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private url = 'http://localhost:8080/validation';
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.findAll();
  }

  public validations = new BehaviorSubject<Validation[]>([]);
  // readonly currentValidations = this.validations.asObservable();

  public findAll(): void {
    this.http.get<MyResponse<Validation>>(this.url).subscribe(
      (response) => {
        this.validations.next(response.content);
      }
    )
  }
  public save(validation: Validation): void {
    this.http.post<MyResponse<Validation>>(this.url, validation).subscribe(
      (response) => {
        this.validations.next(this.validations.getValue().concat([response.data]));
        this.alertService.showMsg("Validation saved successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to save validation");
      }
    )
  }
  public update(validation: Validation): void {
    this.http.put<MyResponse<Validation>>(this.url + "/" + validation.id, validation).subscribe(
      (response) => {
        const validations = this.validations.getValue();
        const index = validations.findIndex((s) => s.id === validation.id);
        validations[index] = response.data;
        this.validations.next(validations);
        this.alertService.showMsg("Validation updated successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to update validation");
      }
    )
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Validation>>(this.url + "/" + id).subscribe(
      (response) => {
        const validations = this.validations.getValue();
        const index = validations.findIndex((s) => s.id === id);
        validations.splice(index, 1);
        this.validations.next(validations);
        this.alertService.showMsg("Validation deleted successfully");
      },
      (error) => {
        this.alertService.showMsg("Failed to delete validation");
      }
    )
  }
}
