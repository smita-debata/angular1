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

interface Investment {
  property: string;
  propertyid: number;
  investmentId?: number;
  investmentName: string;
  id?: number;
}
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-pmdashboard',
  templateUrl: './pmdashboard.component.html',
  styleUrls: ['./pmdashboard.component.css']
})

export class PmdashboardComponent implements OnInit, OnDestroy {
  @ViewChild('myButton') closeButton!: ElementRef;
  @ViewChild('closeInvest') closeinvest!: ElementRef;
  @ViewChild('resetpassword') ResetButton!: ElementRef;
  @ViewChild('matclosebutton') matclosebutton!: ElementRef;
  selectedMatOption: string = '';
  filteredCities: string[] = [];
  profile: boolean = false;
  showOptions: boolean = true;
  public chartOptions1: any;
  public chartOptions: any;
  personName: any;
  personEmail: any;
  maps: any
  @ViewChild('search')
  searchElementRef!: ElementRef;
  places: any = {
    lat: 0,
    lon: 0
  }
  farmhouseInvestmentData: any = {
    investmentName: '',
    propertyId: '',
    userId: '',
  };
  properties: any[] = [];
  investments: any[] = [];
  investmentData: any[] = [];
  showInvestmentsTable = false;
  editIndex: number | null = null;
  isEditMode: boolean = false;
  propertiesid: any[] = [];
  showAddIcon = true; 
  netWorthValue: any;
  propertiesIds: any;
  investment!: FormGroup;
  activestatusButton: string = ''
  constructor(private fb: FormBuilder, private authservice: AuthService, private propertyservice: PropertylistingsService, private route: Router, private location: LocationService, private zone: NgZone, private landlordservice: LandlordService, private http: HttpClient) {
    this.activestatusButton = 'Occupied'

    this.chartOptions1 = {
      colors: ['#40afed', '#80e0da', '#ff9898'],
      series: [80, 30, 10],
      chart: {
        type: "donut",
      }, dataLabels: {
        enabled: false
      },
      labels: ["Occupied", "Vacant", "Under construction"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
              height: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptions = {
      series: [
        {
          name: "Income",
          group: "budget",
          data: [44000, 55000, 41000, 67000, 22000, 43000, 30000, 35000, 40000, 48000, 50000]
        },
        {
          name: "Expense",
          group: "actual",
          data: [38000, 50000, 36000, 60000, 20000, 38000, 28000, 30000, 33000, 37000, 46000]
        },
      ],
      chart: {
        toolbar: {
          show: false // Set this to false to hide the toolbar
        },
        type: "bar",
        height: 350,
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      dataLabels: {
        formatter: (val: any) => {
          return Number(val) / 1000 + "K";
        }, enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 4
        }
      },
      xaxis: {
        categories: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC"
        ]
      },
      fill: {
        opacity: 1
      },
      colors: ["#40afed", "#e6e6e6",],
      yaxis: {
        labels: {
          formatter: (val: number) => {
            return val / 1000 + "K";
          }
        }
      },
      legend: {
        position: "bottom",
        horizontalAlign: "right"
      }
    };

  }
  ngOnDestroy(): void {
    this.imageDataList.forEach(url => URL.revokeObjectURL(url));
  }
  idsToFetch = [203, 204, 205, 206]; // Replace with your IDs to fetch
  currentRequestIndex = 0;
  imageData: string | undefined;
  binaryImageData: any;
  imageDataList: string[] = [];
  imageUrls: { id: number, url: string }[] = [];
  filteredItems: any[] = [];
  propertydetailsdata: any[] = [];
  statusInputSearch: string = ''
  ngOnInit(): void {
    this.getLandLordProperties();
    this.investment = this.fb.group({
      investmentName: ['', Validators.required],
      propertyId: [[], Validators.required],
    });
    this.authservice.getUserData().subscribe((res: any) => {
      console.log(res)
      this.farmhouseInvestmentData.userId = res.id;
      this.personName = `${res.firstName} ${res.lastName}`
      this.personName = this.personName.charAt(0).toUpperCase() + this.personName.slice(1)
      this.personEmail = res.email
    });
    this.location.api.then((maps) => {
      this.initAutocomplete(maps);
      this.maps = maps;
    });
    this.fetchInvestments();
    this.getProperties();
    this.getNetWorthValues()
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

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
  handleChildData(data: any) {
    this.closeButton.nativeElement.click();
    this.activestatusButton = 'Occupied'
    setTimeout(() => {
      this.getLandLordProperties();
    }, 3000);
  }
  handleCloseMat() {
    this.matclosebutton.nativeElement.click();
  }
  closeMenu(trigger: MatMenuTrigger): void {
    trigger.closeMenu();
  }
  handleModelClosed() {
    this.ResetButton.nativeElement.click();
  }
  onMenuButtonClick(event: Event) {
    event.stopPropagation();
  }
  LogOut() {
    this.authservice.logOut()
  }
  getNetWorthValues() {
    this.landlordservice.getNetWorth().subscribe((res: any) => {
      console.log(res.data)
      this.netWorthValue = res.data
    })
  }

  onSubmit() {
    console.log(this.investment.value);
    if (this.isEditMode) {
      const formdata = new FormData();
      formdata.append('investmentName', this.investment.value.investmentName);
      formdata.append('propertyId', this.investment.value.propertyId);
      this.http
        .put<any>(
          `http://20.127.32.150:443/landlord/property/investment/updatePropertyInvestment/${this.propertiesIds}`, formdata).subscribe(
            (res) => {
              this.investment.reset();
              this.closeinvest.nativeElement.click();
              Swal.fire({
                icon: 'success',
                title: 'Investment Updated successfully',
                showConfirmButton: false,
                timer: 1000,
              });
              this.fetchInvestments();
              this.getNetWorthValues()
            },
            (err) => {
              console.log(err);
            }
          );
    } else {
      const formdata = new FormData();
      formdata.append('investmentName', this.investment.value.investmentName);
      formdata.append('propertyId', this.investment.value.propertyId);

      this.landlordservice.postInvestmentData(formdata).subscribe(
        (response) => {
              this.investment.reset();
              this.closeinvest.nativeElement.click();
              Swal.fire({
                title: 'Investment Added successfully',
                showConfirmButton: false,
                timer: 1000,
                icon: 'success',
              });
              this.fetchInvestments();
              this.getNetWorthValues()
            },
            (error) => {
              console.error('Error posting data:', error);
            }
          );
      

      // this.http.post<any>(apiUrl, formdata).subscribe(
      //   (response) => {
      //     this.investment.reset();
      //     this.closeinvest.nativeElement.click();
      //     Swal.fire({
      //       title: 'Investment Added successfully',
      //       showConfirmButton: false,
      //       timer: 1000,
      //       icon: 'success',
      //     });
      //     this.fetchInvestments();
      //     this.getNetWorthValues()
      //   },
      //   (error) => {
      //     console.error('Error posting data:', error);
      //   }
      // );
    }
  }
  isAddmode() {
    this.isEditMode = false
    this.investment.reset();
  }
  editInvestment(investmentsvalue: any) {
    this.isEditMode = true
    this.propertiesIds = investmentsvalue.investmentId
    this.investment.patchValue({
      investmentName: investmentsvalue.investmentName,
      propertyId: investmentsvalue.propertyInversementList.map(
        (property: any) => property.propertyId
      ),
    });
  }
  getLandLordProperties() {
    this.landlordservice.getLandLordProperties().subscribe({
      next: (res: any) => {
        this.propertydetailsdata = res.data
        console.log("propertyData from backend", this.propertydetailsdata)
        this.propertydetailsdata.forEach((res: any) => {
          res.imageId.forEach((imageId: any) => {
            this.getImagesData(imageId, res.propertyId)
          })
        })
      }
    })
  }
  getImagesData(imageId: any, propertyId: any) {
    this.propertyservice.getImages(imageId).subscribe(
      (data: Blob) => {
        const blob = new Blob([data]);
        const imageUrl = URL.createObjectURL(blob);
        const foundProperty = this.propertydetailsdata.find((property: any) => property.propertyId === propertyId);
        if (foundProperty) {
          if (!foundProperty.imageUrls) {
            foundProperty.imageUrls = [];
          }
          foundProperty.imageUrls.push({ id: imageId, url: imageUrl });
        }
      },
      (error) => {
        console.error(`Error fetching image with ID ${imageId}:`, error);
      }
    );
  }


  getProperties() {
    this.landlordservice.getAllProperties().subscribe((res) => {
      console.log(res.data);
      this.propertiesid = res.data;
    });
  }
  fetchInvestments() {
    this.landlordservice.getInvestments().subscribe((res) => {
      this.investmentData = res.data;
    });
  }

  hideInvestmentsTable() {
    this.showInvestmentsTable = false;
  }

  showTable() {
    this.showInvestmentsTable = true;
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

  toggleStatusButton(component: string) {
    this.activestatusButton = component
  }


}
