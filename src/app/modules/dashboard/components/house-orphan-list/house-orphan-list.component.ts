import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { House } from 'src/app/models/house';
import { Orphan } from 'src/app/models/orphan';
import { HouseService } from 'src/app/services/house.service';
import { OrphanService } from 'src/app/services/orphan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-house-orphan-list',
  templateUrl: './house-orphan-list.component.html',
  styleUrls: ['./house-orphan-list.component.css'],
})
export class HouseOrphanListComponent {
  public houseOrphans!: Orphan[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public houses!: House[];
  public houseId!: number;
  public updateOrphan = new Orphan();

  constructor(
    private orphanService: OrphanService,
    private houseService: HouseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllOrphans();
    this.getAllHouses();
  }

  public getAllOrphans(): void {
    this.orphanService.getAllOrphans().subscribe(
      (response: Orphan[]) => {
        this.houseOrphans = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch orphans.');
      }
    );
  }

  public onTableDataChange(event: any): void {
    this.pageNumber = event;
    this.getAllOrphans();
  }

  public onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllOrphans();
  }

  // FETCH ALL HOUSES
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

  public registerNewOrphan(formData: Orphan): void {
    this.orphanService.registerNewOrphan(formData, this.houseId).subscribe(
      (response: Orphan) => {
        console.log(response);
        document.getElementById('closeForm')?.click();
        this.getAllOrphans();
        Swal.fire({
          icon: 'success',
          title: 'New Orphan registered.',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to register new orphan',
          showConfirmButton: true,
          // timer: 1500,
        });
      }
    );
  }

  public getHouseId(event: any) {
    this.houseId = event.target.value;
    console.log(this.houseId);
  }

  public onUpdateOrphan(formData: Orphan): void {
    this.orphanService
      .updateOrphan(formData, this.updateOrphan.orphanId)
      .subscribe(
        (response: Orphan) => {
          console.log(response);
          document.getElementById('closeUpdateForm')?.click();
          this.getAllOrphans();
          Swal.fire({
            icon: 'success',
            title: 'Update successfully.',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to update',
            showConfirmButton: true,
            // timer: 1500,
          });
        }
      );
  }

  public findOrphan(orphanId: number): void {
    this.orphanService.findOrphan(orphanId).subscribe(
      (response: Orphan) => {
        this.updateOrphan = response;
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

  // DELETE USER
  public deleteOrphan(orphanId: number): void {
    this.orphanService.deleteOrphan(orphanId).subscribe(
      (successResponse: void) => {
        Swal.fire({
          icon: 'success',
          title: 'Orphan deleted succeffully.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getAllOrphans();
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
