import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
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

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'update-user/:userId', component: UpdateUserComponent },
      { path: 'make-donation', component: MakeDonationComponent },
      { path: 'donation-list', component: DonationListComponent },
      { path: 'donor-donation-list', component: DonorDonationListComponent },
      { path: 'view-donation/:donationId', component: ViewDonationComponent },
      { path: 'create-donation', component: CreateDonationComponent },
      { path: 'house-orphan-list', component: HouseOrphanListComponent },
      { path: 'house-list', component: HouseListComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'create-advertisement', component: CreateAdvertisementComponent },
      { path: 'advertisement-list', component: AdvertisementListComponent },
      { path: 'map', component: MapComponent },
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
