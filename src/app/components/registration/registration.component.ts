import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  public registerNewDonor(user: User): void {
    this.userService.registerNewDonor(user).subscribe(
      (response: User) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'New donor registered successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl('/login');
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to register new donor.',
          showConfirmButton: true,
        });
      }
    );
  }
}
