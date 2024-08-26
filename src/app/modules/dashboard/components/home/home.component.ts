import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/role';
import { Donation } from 'src/app/models/donation';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DonationService } from 'src/app/services/donation.service';
import { HouseService } from 'src/app/services/house.service';
import { OrphanService } from 'src/app/services/orphan.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public currentUser!: User;
  public users!: User[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 400;
  public filterSize: any = [50, 100, 150, 200, 250]; //changes
  public totalUsers!: number;
  public totalDonors!: number;
  public totalHouses!: number;
  public totalOrphans!: number;

  constructor(
    private donationService: DonationService,
    private userService: UserService,
    private houseService: HouseService,
    private orphanService: OrphanService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserToLocalStorage();
    this.getAllUsers();
    this.getTotalUsers();
    this.getTotalDonors();
    this.getTotalHouses();
    this.getTotalOrphans();
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

  public getTotalUsers(): void {
    this.userService.getTotalUsers().subscribe(
      (response: number) => {
        this.totalUsers = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch users.');
      }
    );
  }

  public getTotalDonors(): void {
    this.userService.getTotalDonors().subscribe(
      (response: number) => {
        this.totalDonors = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch users.');
      }
    );
  }

  public getTotalHouses(): void {
    this.houseService.getTotalHouses().subscribe(
      (response: number) => {
        this.totalHouses = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch users.');
      }
    );
  }

  public getTotalOrphans(): void {
    this.orphanService.getTotalOrphans().subscribe(
      (response: number) => {
        this.totalOrphans = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch users.');
      }
    );
  }

  // GET USER ROLES
  public getUserRole(): string {
    return this.authenticationService.getUserToLocalStorage().role;
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
