import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { LocationService, Maps } from '../location.service';
import { LoginComponent } from '../login/login.component';
import { query } from '@angular/animations';
declare var maps: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedCity: string = '';
  selectedMatOption: string = '';
  filteredCities: string[] = [];
  filtereddata: any[] = [];
  allCountries: any;
  currentlocation: string = '';
  activeComponent: string;
  addressSuggestions: any[] = [];
  maps: any
  addressData: any
  @ViewChild('search')
  searchElementRef!: ElementRef;
  places: any = {
    lat: 0,
    lon: 0
  }
  constructor(private route: Router, private http: HttpClient, private location: LocationService, private zone: NgZone) {
    this.activeComponent = 'login';

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
        this.address = this.formatAddress(place);
        this.selectedCity = this.address
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
  latitude: number | null = null;
  longitude: number | null = null;
  address: string | null = null;
  error: string | null = null;
  enableLocation(param: any) {
    this.places.enable = param;
  }

  getLocationAndProceed() {
    console.log(this.searchElementRef.nativeElement);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          this.places.lat = position.coords.latitude;
          this.places.lon = position.coords.longitude;
          this.getReverseGeocodingData(this.places.lat, this.places.lon);
        }
      },
        (error: any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getReverseGeocodingData(lat: any, lng: any) {
    var latlng = new this.maps.LatLng(lat, lng);
    var geocoder = new this.maps.Geocoder();
    geocoder.geocode({ 'location': latlng }, (results: any, status: any) => {
      if (status !== this.maps.GeocoderStatus.OK) {
        alert('Sorry I am not in support');
      } else {
        // const fullname = `${results[0].address_components[1].long_name}, ${results[0].address_components[5].long_name}, ${results[0].address_components[6].long_name}, ${results[0].address_components[7].long_name}`
        const place = results[0];
        const formattedAddress = this.formatAddressForCurrentLocation(place);
        this.selectedCity = formattedAddress;
        console.log(formattedAddress)

      }

    });

  }

  formatAddressForCurrentLocation(place: any): string {
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

  @ViewChild('myButton') closeButton!: ElementRef;

  ngOnInit(): void {
    this.location.api.then((maps) => {
      this.initAutocomplete(maps);
      this.maps = maps;
    });
  }

  toNavigate() {
    if (this.selectedCity) {
      let allProperty = {
        ListingType: this.selectedMatOption,
        city: this.selectedCity
      }
      this.route.navigate(['propertylistings'], {
        queryParams: {
          data: JSON.stringify(allProperty) // Convert object to string
        }
      });
    }
  }

  closeMenu(trigger: MatMenuTrigger): void {
    trigger.closeMenu();
  }
  clearInput() {
    this.selectedCity = ''
  }
  toggleComponent(component: string) {
    this.activeComponent = component;
  }

  handleCloseMenu() {
    this.closeButton.nativeElement.click();
    this.activeComponent = 'login';
  }


}
