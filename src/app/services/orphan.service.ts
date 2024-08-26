import { Injectable } from '@angular/core';
import { Orphan } from '../models/orphan';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrphanService {
  private apiUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  public registerNewOrphan(
    orphan: Orphan,
    houseId: number
  ): Observable<Orphan> {
    return this.httpClient.post<Orphan>(
      `${this.apiUrl}/orphans/register/house/${houseId}`,
      orphan
    );
  }

  public getAllOrphans(): Observable<Orphan[]> {
    return this.httpClient.get<Orphan[]>(`${this.apiUrl}/orphans/all`);
  }

  public updateOrphan(orphan: Orphan, orphanId: number): Observable<Orphan> {
    return this.httpClient.put<Orphan>(
      `${this.apiUrl}/orphans/update/${orphanId}`,
      orphan
    );
  }

  public findOrphan(orphanId: number): Observable<Orphan> {
    return this.httpClient.get<Orphan>(`${this.apiUrl}/orphans/${orphanId}`);
  }

  public deleteOrphan(orphanId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/orphans/delete/${orphanId}`
    );
  }

  public getTotalOrphans(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/orphans/total-orphans`);
  }
}
