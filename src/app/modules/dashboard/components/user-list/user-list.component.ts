import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  public users!: User[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.userService.fetchAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch users.');
      }
    );
  }

  public onTableDataChange(event: any): void {
    this.pageNumber = event;
    this.getAllUsers();
  }

  public onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllUsers();
  }

  public addNewUser(formData: User): void {
    this.userService.addNewUser(formData).subscribe(
      (response: User) => {
        console.log(response);
        document.getElementById('closeForm')?.click();
        this.getAllUsers();
        Swal.fire({
          icon: 'success',
          title: 'New user registered.',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to register new user',
          showConfirmButton: true,
          // timer: 1500,
        });
      }
    );
  }

  public findUserByUserId(userId: number): void {
    this.userService.findUserByUserId(userId).subscribe(
      (successResponse: User) => {
        this.router.navigate(['/dashboard/update-user', userId]);
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

  // DELETE USER
  public deleteUserByUserId(userId: number): void {
    this.userService.deleteUserByUserId(userId).subscribe(
      (successResponse: User) => {
        Swal.fire({
          icon: 'success',
          title: 'User deleted succeffully.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getAllUsers();
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
}
