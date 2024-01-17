import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexMarkers, ApexStroke, ApexTitleSubtitle, ApexXAxis } from 'ngx-apexcharts';
import { AuthService } from 'src/app/authentication/auth.service';
import { LocationService, Maps } from 'src/app/location.service';
import { LandlordService } from 'src/app/services/landlord.service';
import { PropertylistingsService } from 'src/app/services/propertylistings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent {
  constructor(private authservice: AuthService, private landlordservice: LandlordService, private http: HttpClient) {

  }

  mypropertydetails: any[] = [];
  getMyProperties() {
    this.landlordservice.getLandLordProperties().subscribe({
      next: (res: any) => {
        this.mypropertydetails = res.data
      }
    })
  }
    ngOnInit(): void {
    this.getMyProperties();
  }

}
