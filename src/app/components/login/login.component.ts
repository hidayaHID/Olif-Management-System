import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/dashboard/home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public loginUser(user: User): void {
    this.authenticationService.login(user).subscribe(
      (response: HttpResponse<User>) => {
        this.authenticationService.addUserToLocalStorage(response.body!);
        this.router.navigateByUrl('/dashboard/home');
        console.log('You have been successfully login');
        Swal.fire({
          icon: 'success',
          title: 'You have been successfully login',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (errorResponse: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Username or password incorrect',
          showConfirmButton: true,
          // timer: 1500,
        });
      }
    );
  }
}
