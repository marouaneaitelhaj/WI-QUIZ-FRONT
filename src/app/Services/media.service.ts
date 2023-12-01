import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Media from '../Models/Media';
import { MyResponse } from '../Response/Response';
@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private url = 'http://localhost:8080/media';
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dvr7oyo77/upload';
  private auth = 'NTk3ODkzMDk2MjY4ODkwMTQy.GyDHOZ.Y6Fl5asbIOKvfbflLSQSvQWbfGGDS8ELoN2z8c'
  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<MyResponse<Media>> {
    return this.http.get<MyResponse<Media>>(this.url);
  }
  public save(media: Media): Observable<MyResponse<Media>> {
    return this.http.post<MyResponse<Media>>(this.url, media);
  }
  public update(media: Media): Observable<MyResponse<Media>> {
    return this.http.put<MyResponse<Media>>(this.url + "/" + media.id, media);
  }
  public delete(id: number): Observable<MyResponse<Media>> {
    return this.http.delete<MyResponse<Media>>(this.url + "/" + id);
  }
  public upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'a8vbtvzm');

    return this.http.post(this.cloudinaryUrl, formData);
  }  
}
