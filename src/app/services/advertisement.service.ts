import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Advertisement } from '../models/advertisement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {
  private apiUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  public createAdvertisement(
    formData: FormData,
    useId: number
  ): Observable<Advertisement> {
    return this.httpClient.post<Advertisement>(
      `${this.apiUrl}/advertisements/create/user/${useId}`,
      formData
    );
  }

  public updateAdvertisement(
    formData: FormData,
    id: number
  ): Observable<Advertisement> {
    return this.httpClient.put<Advertisement>(
      `${this.apiUrl}/advertisements/update/${id}`,
      formData
    );
  }

  public getAllAdvertisements(): Observable<Advertisement[]> {
    return this.httpClient.get<Advertisement[]>(
      `${this.apiUrl}/advertisements/all`
    );
  }

  public findAdvertisement(id: number): Observable<Advertisement> {
    return this.httpClient.get<Advertisement>(
      `${this.apiUrl}/advertisements/${id}`
    );
  }

  public deleteAdvertisement(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/advertisements/delete/${id}`
    );
  }

  public createAdvertisementFormData(
    bookAuthor: Advertisement,
    image: File
  ): FormData {
    const formData = new FormData();
    formData.append('title', bookAuthor.title);
    formData.append('description', bookAuthor.description);
    formData.append('image', image);
    return formData;
  }
}
