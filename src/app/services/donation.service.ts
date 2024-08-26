import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donation } from '../models/donation';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  private apiUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  public createNewDonation(
    donation: Donation,
    donorId: number
  ): Observable<Donation> {
    return this.httpClient.post<Donation>(
      `${this.apiUrl}/donations/create/${donorId}`,
      donation
    );
  }

  public getAllDonations(): Observable<Donation[]> {
    return this.httpClient.get<Donation[]>(`${this.apiUrl}/donations/all`);
  }

  public getAllDonationsByUsername(username: string): Observable<Donation[]> {
    return this.httpClient.get<Donation[]>(
      `${this.apiUrl}/donations/all/username/${username}`
    );
  }

  public updateDonation(
    donation: Donation,
    donationId: number
  ): Observable<Donation> {
    return this.httpClient.put<Donation>(
      `${this.apiUrl}/donations/update/${donationId}`,
      donation
    );
  }

  public findDonation(donationId: number): Observable<Donation> {
    return this.httpClient.get<Donation>(
      `${this.apiUrl}/donations/${donationId}`
    );
  }

  public deleteDonation(donationId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/donations/delete/${donationId}`
    );
  }
}
