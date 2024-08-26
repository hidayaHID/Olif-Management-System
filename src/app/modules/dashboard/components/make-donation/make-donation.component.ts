import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Donation } from 'src/app/models/donation';
import { House } from 'src/app/models/house';
import { DonationService } from 'src/app/services/donation.service';
import { HouseService } from 'src/app/services/house.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-make-donation',
  templateUrl: './make-donation.component.html',
  styleUrls: ['./make-donation.component.css'],
})
export class MakeDonationComponent {
  public donations!: Donation[];
  public houses!: House[];
  public houseId!: number;
  public donationId!: number;

  constructor(
    private donationService: DonationService,
    private houseService: HouseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllHouses();
    this.getAllDonations();
  }

  public getAllHouses(): void {
    this.houseService.getAllHouses().subscribe(
      (response: House[]) => {
        this.houses = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch houses.');
      }
    );
  }

  public getHouseId(event: any): void {
    this.houseId = event.target.value;
  }

  public getAllDonations(): void {
    this.donationService.getAllDonations().subscribe(
      (response: Donation[]) => {
        this.donations = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch donations.');
      }
    );
  }

  public getDonationId(event: any): void {
    this.donationId = event.target.value;
  }

  public makeDonation(): void {
    this.houseService
      .assignHouseToDonation(this.houseId, this.donationId)
      .subscribe(
        (response: House) => {
          this.router.navigateByUrl('/dashboard/house-list');
          Swal.fire({
            icon: 'success',
            title: 'Donated  successfully.',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to make donation.',
            showConfirmButton: true,
            // timer: 1500,
          });
        }
      );
  }
}
