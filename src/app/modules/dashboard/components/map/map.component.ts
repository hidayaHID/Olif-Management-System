import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/services/house.service';

// interface House {
//   houseId: number;
//   houseNumber: string;
//   address: string;
//   location: string;
//   status: string;
//   latitude: number;
//   longitude: number;
// }

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  houses: House[] = [];

  constructor(private houseService: HouseService) {}

  ngOnInit(): void {
    this.getAllHouses();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  public getAllHouses(): void {
    this.houseService.getAllHouses().subscribe(
      (response: House[]) => {
        this.houses = response;
        this.addMarkers(); // Add markers once houses are fetched
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch houses.', error);
      }
    );
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-6.19423, 39.30494],
      zoom: 15,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  private addMarkers(): void {
    this.houses.forEach((house) => {
      let markerIcon;
      if (house.status === 'Received') {
        markerIcon = L.icon({
          iconUrl: 'assets/icons/received-house.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });
      } else {
        markerIcon = L.icon({
          iconUrl: 'assets/icons/pending-house.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });
      }
      L.marker([house.latitude, house.longitude], { icon: markerIcon })
        .addTo(this.map)
        .bindPopup(
          `<b>${house.houseNumber}</b><br>${house.address}</b><br>${house.status}`
        );
    });
  }
}
// export class MapComponent {
//   private map!: L.Map;

//   // houses: House[] = [
//   //   {
//   //     houseId: 1,
//   //     houseNumber: '1',
//   //     address: 'House 1',
//   //     location: 'Location 1',
//   //     latitude: -6.16802,
//   //     longitude: 39.19132,
//   //     status: 'Received',
//   //   },
//   //   {
//   //     houseId: 2,
//   //     houseNumber: '2',
//   //     address: 'House 2',
//   //     location: 'Location 2',
//   //     latitude: -6.16888,
//   //     longitude: 39.19012,
//   //     status: 'Pending',
//   //   },
//   //   {
//   //     houseId: 3,
//   //     houseNumber: '3',
//   //     address: 'House 3',
//   //     location: 'Location 3',
//   //     latitude: -6.16632,
//   //     longitude: 39.19069,
//   //     status: 'Received',
//   //   },
//   // ];

//   houses!: House[];

//   public getAllHouses(): void {
//     this.houseService.getAllHouses().subscribe(
//       (response: House[]) => {
//         this.houses = response;
//         console.log(this.houses);
//       },
//       (error: HttpErrorResponse) => {
//         console.log('Failed to fetch users.');
//       }
//     );
//   }

//   private initMap(): void {
//     this.map = L.map('map', {
//       center: [-6.19423, 39.30494],
//       zoom: 15,
//     });

//     const tiles = L.tileLayer(
//       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//       {
//         maxZoom: 18,
//         minZoom: 3,
//         attribution:
//           '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//       }
//     );
//     tiles.addTo(this.map);

//     this.houses.forEach((house) => {
//       let markerIcon;
//       if (house.status === 'Received') {
//         markerIcon = L.icon({
//           iconUrl: 'assets/icons/received-house.png',
//           iconSize: [25, 41],
//           iconAnchor: [12, 41],
//         });
//       } else {
//         markerIcon = L.icon({
//           iconUrl: 'assets/icons/pending-house.png',
//           iconSize: [25, 41],
//           iconAnchor: [12, 41],
//         });
//       }
//       L.marker([house.latitude, house.longitude], { icon: markerIcon })
//         .addTo(this.map)
//         .bindPopup(`<b>${house.houseNumber}</b><br>${house.address}`);
//     });
//   }

//   constructor(private houseService: HouseService) {}

//   ngOnInit(): void {
//     this.getAllHouses();
//   }

//   ngAfterViewInit(): void {
//     this.initMap();
//   }
// }
