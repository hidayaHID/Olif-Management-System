import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public apiUrl = environment.backendUrl;
  public isAuthenticated = false;

  constructor(private httpClient: HttpClient) {}

  public login(loginUser: User): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(`${this.apiUrl}/auth/login`, loginUser, {
      observe: 'response',
    });
  }

  public addUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserToLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public isUserLoggedIn(): boolean {
    if (this.getUserToLocalStorage() != null) {
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      this.logOut();
      return false;
    }
  }

  public logOut() {
    localStorage.removeItem('user');
    this.isAuthenticated = false;
  }
}
