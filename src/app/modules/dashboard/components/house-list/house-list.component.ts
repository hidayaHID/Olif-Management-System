import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/services/house.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css'],
})
export class HouseListComponent {
  public houses!: House[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public updateHouse = new House();

  constructor(private houseService: HouseService, private router: Router) {}

  ngOnInit(): void {
    this.getAllHouses();
  }

  public getAllHouses(): void {
    this.houseService.getAllHouses().subscribe(
      (response: House[]) => {
        this.houses = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch users.');
      }
    );
  }

  public onTableDataChange(event: any): void {
    this.pageNumber = event;
    this.getAllHouses();
  }

  public onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllHouses();
  }

  public registerNewHouse(formData: House): void {
    this.houseService.registerNewHouse(formData).subscribe(
      (response: House) => {
        document.getElementById('closeForm')?.click();
        this.getAllHouses();
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

  public findHouse(houseId: number): void {
    this.houseService.findHouse(houseId).subscribe(
      (successResponse: House) => {
        this.updateHouse = successResponse;
        // this.router.navigate(['/dashboard/update-user', houseId]);
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

  public onUpdateHouse(formData: House): void {
    this.houseService.updateHouse(formData, this.updateHouse.houseId).subscribe(
      (response: House) => {
        document.getElementById('closeUpHouseForm')?.click();
        this.getAllHouses();
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to update house',
          showConfirmButton: true,
          // timer: 1500,
        });
      }
    );
  }

  public deleteHouse(houseId: number): void {
    this.houseService.deleteHouse(houseId).subscribe(
      (successResponse: void) => {
        Swal.fire({
          icon: 'success',
          title: 'User deleted succeffully.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getAllHouses();
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
