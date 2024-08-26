import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { Role } from 'src/app/enums/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  public currentUser!: any;
  public fileName!: string;
  public profileImage!: File;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserToLocalStorage();
  }

  // UPDATE USER
  public onUpdateUser(): void {
    const formData = this.userService.createUserFormData(
      this.currentUser.username,
      this.currentUser,
      this.profileImage
    );
    this.userService.updateUser(formData).subscribe(
      (response: User) => {
        this.authenticationService.addUserToLocalStorage(response);
        Swal.fire({
          icon: 'success',
          title: 'Updated successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to update user details.',
          showConfirmButton: true,
        });
      }
    );
  }

  public onSaveUpdateUserProfile(): void {
    document.getElementById('btnUpdateUserProfile')?.click();
  }

  public updateProfileImage(): void {
    const formData = new FormData();
    formData.append('username', this.currentUser.username);
    formData.append('profileImage', this.profileImage);
    this.userService.updateProfileImage(formData).subscribe(
      (response: HttpEvent<any>) => {
        this.currentUser.profileImage += `?updated_at=${new Date().getTime()}`;
      },
      (errorResponse: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to update profile image.',
          showConfirmButton: true,
        });
      }
    );
  }

  public changeProfileImage(fileName: string, profileImage: File): void {
    this.fileName = fileName;
    this.profileImage = profileImage;
  }

  public onSaveProfileImage(): void {
    document.getElementById('profileImageInput')?.click();
  }

  // GET USER ROLES
  public getUserRole(): string {
    return this.authenticationService.getUserToLocalStorage().role;
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ROLE_ADMIN;
  }

  public get isDonor(): boolean {
    return this.getUserRole() === Role.ROLE_DONOR;
  }

  public get isAdminOrDonor(): boolean {
    return this.isAdmin || this.isDonor;
  }
}
