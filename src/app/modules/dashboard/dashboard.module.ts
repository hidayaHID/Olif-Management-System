import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { DonorDonationListComponent } from './components/donor-donation-list/donor-donation-list.component';
import { ViewDonationComponent } from './components/view-donation/view-donation.component';
import { HouseOrphanListComponent } from './components/house-orphan-list/house-orphan-list.component';
import { HouseListComponent } from './components/house-list/house-list.component';
import { MakeDonationComponent } from './components/make-donation/make-donation.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreateAdvertisementComponent } from './components/create-advertisement/create-advertisement.component';
import { AdvertisementListComponent } from './components/advertisement-list/advertisement-list.component';
import { CreateDonationComponent } from './components/create-donation/create-donation.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent,
    DashboardComponent,
    UpdateUserComponent,
    DonationListComponent,
    DonorDonationListComponent,
    ViewDonationComponent,
    HouseOrphanListComponent,
    HouseListComponent,
    MakeDonationComponent,
    UserProfileComponent,
    CreateAdvertisementComponent,
    AdvertisementListComponent,
    CreateDonationComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgxPaginationModule,
  ],
})
export class DashboardModule {}
