import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Donation } from 'src/app/models/donation';
import { User } from 'src/app/models/user';
import { DonationService } from 'src/app/services/donation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-donation',
  templateUrl: './view-donation.component.html',
  styleUrls: ['./view-donation.component.css'],
})
export class ViewDonationComponent {
  public donation = new Donation();
  public profileImage!: File;

  constructor(
    private donationService: DonationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDonationInfo();
  }

  public getDonationInfo(): void {
    const donationId = this.activatedRoute.snapshot.params['donationId'];
    this.donationService.findDonation(donationId).subscribe(
      (successResponse: Donation) => {
        this.donation = successResponse;
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
