import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/role';
import { Advertisement } from 'src/app/models/advertisement';
import { User } from 'src/app/models/user';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css'],
})
export class AdvertisementListComponent {
  public advertisements!: Advertisement[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 200;
  public filterSize: any = [5, 10, 15, 20, 25];

  constructor(
    private advertisementService: AdvertisementService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.advertisementService.getAllAdvertisements().subscribe(
      (response: Advertisement[]) => {
        this.advertisements = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch advertisements.');
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

  // public addNewUser(formData: User): void {
  //   this.advertisementService.addNewUser(formData).subscribe(
  //     (response: User) => {
  //       console.log(response);
  //       document.getElementById('closeForm')?.click();
  //       this.getAllUsers();
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'New user registered.',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     },
  //     (error: HttpErrorResponse) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Failed to register new user',
  //         showConfirmButton: true,
  //         // timer: 1500,
  //       });
  //     }
  //   );
  // }

  public findUserByUserId(id: number): void {
    this.advertisementService.findAdvertisement(id).subscribe(
      (successResponse: Advertisement) => {
        // this.router.navigate(['/dashboard/update-user', id]);
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

  public deleteAdvertisement(id: number): void {
    this.advertisementService.deleteAdvertisement(id).subscribe(
      (successResponse: void) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted succeffully.',
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

  truncateDescription(description: string, words: number): string {
    if (!description) return '';
    const wordArray = description.split(' ');
    if (wordArray.length <= words) return description;
    return wordArray.slice(0, words).join(' ') + '...';
  }

  // GET USER ROLES
  public getUserRole(): string {
    return this.authService.getUserToLocalStorage().role;
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
