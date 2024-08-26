import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  public updateUser = new User();
  public currentUsername!: string;
  public profileImage!: File;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  public getUserInfo(): void {
    const userId = this.activatedRoute.snapshot.params['userId'];
    this.userService.findUserByUserId(userId).subscribe(
      (successResponse: User) => {
        this.updateUser = successResponse;
        this.currentUsername = successResponse.username;
      },
      (errorResponse: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'An error occured while processing.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  // UPDATE USER INFORMATION
  public updateUserInfo(): void {
    const formData = this.userService.createUserFormData(
      this.currentUsername,
      this.updateUser,
      this.profileImage
    );
    this.userService.updateUser(formData).subscribe(
      (successResponse: User) => {
        this.router.navigateByUrl('/dashboard/user-list');
        Swal.fire({
          icon: 'success',
          title: 'User updated succeffully.',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (errorResponse: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'An error occured while processing.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  // save profileImage
  public onProfileImageChange(profileImage: File): void {
    this.profileImage = profileImage;
  }
}
