import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { House } from '../models/house';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private apiUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  public registerNewHouse(house: House): Observable<House> {
    return this.httpClient.post<House>(`${this.apiUrl}/houses/register`, house);
  }

  public assignHouseToDonation(
    houseId: number,
    donationId: number
  ): Observable<House> {
    return this.httpClient.post<House>(
      `${this.apiUrl}/houses/assign/${houseId}/donation/${donationId}`,
      null
    );
  }

  public getAllHouses(): Observable<House[]> {
    return this.httpClient.get<House[]>(`${this.apiUrl}/houses/all`);
  }

  public updateHouse(house: House, houseId: number): Observable<House> {
    return this.httpClient.put<House>(
      `${this.apiUrl}/houses/update/${houseId}`,
      house
    );
  }

  public findHouse(houseId: number): Observable<House> {
    return this.httpClient.get<House>(`${this.apiUrl}/houses/${houseId}`);
  }

  public deleteHouse(houseId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/houses/delete/${houseId}`
    );
  }

  public getTotalHouses(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/houses/total-houses`);
  }
}
