import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Donation } from 'src/app/models/donation';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DonationService } from 'src/app/services/donation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donor-donation-list',
  templateUrl: './donor-donation-list.component.html',
  styleUrls: ['./donor-donation-list.component.css'],
})
export class DonorDonationListComponent {
  public currentUser!: User;
  public donations!: Donation[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];

  constructor(
    private donationService: DonationService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserToLocalStorage();
    this.getAllDonations();
  }

  public getAllDonations(): void {
    this.donationService
      .getAllDonationsByUsername(this.currentUser.username)
      .subscribe(
        (response: Donation[]) => {
          this.donations = response;
        },
        (error: HttpErrorResponse) => {
          console.log('Failed to fetch users.');
        }
      );
  }

  public onTableDataChange(event: any): void {
    this.pageNumber = event;
    this.getAllDonations();
  }

  public onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllDonations();
  }

  public createNewDonation(formData: Donation): void {
    this.donationService
      .createNewDonation(formData, this.currentUser.userId)
      .subscribe(
        (response: Donation) => {
          console.log(response);
          document.getElementById('closeForm')?.click();
          this.getAllDonations();
          Swal.fire({
            icon: 'success',
            title: 'New donation created.',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to create new donation',
            showConfirmButton: true,
            // timer: 1500,
          });
        }
      );
  }

  public findDonation(donationId: number): void {
    this.donationService.findDonation(donationId).subscribe(
      (successResponse: Donation) => {
        this.router.navigate(['/dashboard/view-donation', donationId]);
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

  public deleteDonation(donation: number): void {
    this.donationService.deleteDonation(donation).subscribe(
      (successResponse: void) => {
        Swal.fire({
          icon: 'success',
          title: 'Donation deleted succeffully.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getAllDonations();
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
}
