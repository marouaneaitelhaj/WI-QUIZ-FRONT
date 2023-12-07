import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Media from '../Models/Media';
import { MyResponse } from '../Response/Response';
import { AlertService } from '../Components/alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private url = 'http://localhost:8080/media';
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dvr7oyo77/upload';
  private auth = 'NTk3ODkzMDk2MjY4ODkwMTQy.GyDHOZ.Y6Fl5asbIOKvfbflLSQSvQWbfGGDS8ELoN2z8c'
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.findAll();
  }
  public medias = new BehaviorSubject<Media[]>([]);
  public findAll(): void {
    this.http.get<MyResponse<Media>>(this.url).subscribe(
      (response) => {
        this.medias.next(response.content);
      }
    )
  }
  public save(media: Media): void {
    this.http.post<MyResponse<Media>>(this.url, media).subscribe(
      (response) => {
        this.medias.next(this.medias.getValue().concat([response.data]));
        this.alertService.showMsg(response.message);
      },
      (error) => {
        this.alertService.showMsg(error.error.message);
      }
    )
  }
  public update(media: Media): void {
    this.http.put<MyResponse<Media>>(this.url + "/" + media.id, media).subscribe(
      (response) => {
        const medias = this.medias.getValue();
        const index = medias.findIndex((s) => s.id === media.id);
        medias[index] = response.data;
        this.medias.next(medias);
        this.alertService.showMsg(response.message);
      },
      (error) => {
        this.alertService.showMsg(error.error.message);
      }
    )
  }
  public delete(id: number): void {
    this.http.delete<MyResponse<Media>>(this.url + "/" + id).subscribe(
      (response) => {
        const medias = this.medias.getValue();
        const index = medias.findIndex((s) => s.id === id);
        medias.splice(index, 1);
        this.medias.next(medias);
        this.alertService.showMsg(response.message);
      },
      (error) => {
        this.alertService.showMsg(error.error.message);
      }
    )
  }
  public upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'a8vbtvzm');
    return this.http.post(this.cloudinaryUrl, formData);
  }  
}
