import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Donation } from 'src/app/models/donation';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DonationService } from 'src/app/services/donation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.css'],
})
export class CreateDonationComponent {
  public currentUser!: User;

  constructor(
    private donationService: DonationService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserToLocalStorage();
  }

  public createNewDonation(formData: Donation): void {
    this.donationService
      .createNewDonation(formData, this.currentUser.userId)
      .subscribe(
        (response: Donation) => {
          console.log(response);
          this.router.navigateByUrl('/dashboard/donor-donation-list');
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
}
