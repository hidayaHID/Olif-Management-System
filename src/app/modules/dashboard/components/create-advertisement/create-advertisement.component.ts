import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Advertisement } from 'src/app/models/advertisement';
import { User } from 'src/app/models/user';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-advertisement',
  templateUrl: './create-advertisement.component.html',
  styleUrls: ['./create-advertisement.component.css'],
})
export class CreateAdvertisementComponent {
  public image!: File;
  public currentUser!: User;

  constructor(
    private advertisementService: AdvertisementService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserToLocalStorage();
  }

  public createAdvertisementFormData(advertisement: Advertisement): void {
    const formData = this.advertisementService.createAdvertisementFormData(
      advertisement,
      this.image
    );
    this.advertisementService
      .createAdvertisement(formData, this.currentUser.userId)
      .subscribe(
        (response: Advertisement) => {
          this.router.navigateByUrl('/dashboard/advertisement-list');
        },
        (error: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to create book author.',
            showConfirmButton: true,
            // timer: 1500,
          });
        }
      );
  }

  // save profileImage
  public onImageChange(image: File): void {
    this.image = image;
  }
}
