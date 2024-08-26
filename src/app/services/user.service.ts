import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  public registerNewDonor(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${this.apiUrl}/api/users/register`,
      user
    );
  }

  public addNewUser(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${this.apiUrl}/api/users/add-new-user`,
      user
    );
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.httpClient.put<User>(
      `${this.apiUrl}/api/users/updateUser`,
      formData
    );
  }

  public getTotalUsers(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/api/users/total-users`);
  }

  public getTotalDonors(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/api/users/total-donors`);
  }

  public fetchAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/api/users/all`);
  }

  public findUserByUserId(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/api/users/${userId}`);
  }

  public findUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(
      `${this.apiUrl}/api/users/username/${username}`
    );
  }

  public deleteUserByUserId(userId: number): Observable<User> {
    return this.httpClient.delete<User>(
      `${this.apiUrl}/api/users/deleteUser/${userId}`
    );
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<any>> {
    return this.httpClient.put<any>(
      `${this.apiUrl}/api/users/updateProfileImage`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  public createUserFormData(
    loggedInUsername: string,
    user: User,
    profileImage: File
  ): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('email', user.email);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('dateOfBirth', user.dateOfBirth);
    formData.append('address', user.address);
    formData.append('gender', user.gender);
    formData.append('profileImage', profileImage);
    formData.append('role', user.role);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNotLocked', JSON.stringify(user.notLocked));
    return formData;
  }
}
