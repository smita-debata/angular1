import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { LocationService, Maps } from 'src/app/location.service';


@Component({
  selector: 'app-tenantdashboard',
  templateUrl: './tenantdashboard.component.html',
  styleUrls: ['./tenantdashboard.component.css']
})
export class TenantdashboardComponent implements OnInit {
  selectedMatOption: string = '';

  profile: boolean = false;
  maps: any
  @ViewChild('search')
  searchElementRef!: ElementRef;
  places: any = {
    lat: 0,
    lon: 0
  }
  personName: any;
  personEmail: any;

  constructor(private route: Router, private authservice: AuthService, private location: LocationService, private zone: NgZone) {

  }
  ngOnInit(): void {
    this.location.api.then((maps) => {
      this.initAutocomplete(maps);
      this.maps = maps;
    });
    this.authservice.getUserData().subscribe((res: any) => {
      console.log(res)
      this.personName = `${res.firstName} ${res.lastName}`
      this.personName = this.personName.charAt(0).toUpperCase() + this.personName.slice(1)
      this.personEmail = res.email
    })
  }
  searchInput: string = ''
  cancelInput() {
    this.searchInput = ''
  }
  toNavigateProperties() {
    if (this.searchInput) {
      let allProperty = {
        ListingType: this.selectedMatOption,
        city: this.searchInput
      }
      this.route.navigate(['/propertylistings'], {
        queryParams: {
          data: JSON.stringify(allProperty)
        }
      });
    }
  }

  onMenuButtonClick(event: Event) {
    event.stopPropagation();
  }
  LogOut() {
    this.authservice.logOut()
  }
  initAutocomplete(maps: Maps) {
    let autocomplete = new maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          console.log('Place not found');
          return;
        }
        const address = this.formatAddress(place);
        this.searchInput = address
      });
    });
  }

  formatAddress(place: any): string {
    let formattedAddress = '';
    const components = place.address_components;
    if (components) {
      for (const component of components) {
        const types = component.types;
        if (types.includes('street_number')) {
          formattedAddress += component.long_name + ' ';
        }
        if (types.includes('route')) {
          formattedAddress += component.long_name + ', ';
        }
        if (types.includes('locality')) {
          formattedAddress += component.long_name + ', ';
        }
        if (types.includes('administrative_area_level_1')) {
          formattedAddress += component.short_name + ' ';
        }
        if (types.includes('postal_code')) {
          formattedAddress += component.long_name;
        }
      }
    }
    return formattedAddress;
  }

}
