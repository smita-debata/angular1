import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import {
  PropertyDetails,
  propertyTypes,
  amenties,
  backenddetailsd,
} from '../../Alljsondata';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatMenuTrigger } from '@angular/material/menu';
import { ShareModalComponent } from '../share-modal/share-modal.component';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PropertylistingsService } from 'src/app/services/propertylistings.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/authentication/auth.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-propertylistings',
  templateUrl: './propertylistings.component.html',
  styleUrls: ['./propertylistings.component.css'],
})
export class PropertylistingsComponent implements OnInit, AfterViewInit {
  trigger: any;
  selectedListingType: string = '';
  @ViewChild('myButton') closeButton!: ElementRef;
  searchInput: string = '';
  rangelot: number[] = [0, 5000];
  rangeprice: number[] = [0, 500000];
  rangesqrft: number[] = [0, 5000];
  propertydata: any[] = [];
  propertydetailsdata: any[] = [];
  PropertyDetailsApiData: any[] = [];
  filteredItems: any[] = [];
  filteredPropertytypeItems: any[] = [];
  propertyTypes: any[] = [];
  amenities: any[] = [];
  overViewId: number = 0;
  typeOfListing: string = '';
  activeComponent: string;
  personName: any;
  personEmail: any;
  AccesstokenPresent: any;
  propertyIds: any;
  imageUrls: { id: number; url: string }[] = [];
  validUser: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private dialog: MatDialog,
    private cdn: ChangeDetectorRef,
    private Propertyservice: PropertylistingsService,
    private authservice: AuthService,
    private messageService: MessageService
  ) {
    this.activeComponent = 'login';
    this.route.queryParams.subscribe((params) => {
      if (params['data']) {
        let receivedObject = JSON.parse(params['data']);
        this.searchInput = receivedObject.city;
        this.typeOfListing = receivedObject.ListingType;
        console.log(this.typeOfListing);
      }
    });

    // const propertyData = history.state.data;
    // console.log(propertyData);
    // if (propertyData) {
    //   console.log(propertyData.city); // Accessing city
    //   console.log(propertyData.ListingType); // Accessing ListingType
    // }

    // console.log(this.searchInput, this.typeOfListing)
    // const currentUrl = this.location.path();
    // console.log('Current URL:', currentUrl);
  }
  toggleComponent(component: string) {
    this.activeComponent = component;
  }
  handleCloseMenu() {
    console.log('hello');
    this.closeButton.nativeElement.click();
  }
  ngAfterViewInit(): void {
    this.filteredItems = this.propertydetailsdata;
    // this.filteredItems = this.propertydetailsdata
    // this.cdn.detectChanges()
  }

  imagesData: any;
  //image not found--------------
  dummyImageUrl: string = '../../../assets/noimage.webp';
  ngOnInit(): void {
    const getJWTToken = sessionStorage.getItem('AccessToken');
    if (getJWTToken) {
      this.getAccessToken();
    }
    this.amenities = amenties;
    this.propertyTypes = propertyTypes;
    this.getPropertyData();
  }

  showLikeToast() {
    this.messageService.add({
      severity: 'success',
      summary: '',
      detail: 'You Liked the Property!',
    });
  }

  showUnlikeToast() {
    this.messageService.add({
      severity: 'error',
      summary: '',
      detail: 'You Unliked the Property!',
    });
  }

  showSavedToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'You Saved this property!',
      detail: 'Added to the saved property list',
    });
  }
  showUnsavedToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'You Unsaved this property!',
      detail: 'Removed from the saved property list',
    });
  }

  toggleLike(card: any) {
    if (this.validUser) {
      card.isLiked = !card.isLiked;

      const requestData = {
        propertyId: card.propertyId,
        propertyLikeStatus: card.isLiked,
      };
      // console.log(requestData)

      this.Propertyservice.postLike(requestData).subscribe(
        (res) => {
        console.log(res.data)
        if (res.data.propertyLikeStatus) {
          this.showLikeToast();
        } else {
          this.showUnlikeToast();
        }
      },(err)=>{
        console.log(err)
      }
      );

      // if (card.isLiked) {
      //   console.log('card is Liked?', card.isLiked)
      //   this.Propertyservice.postLike(requestData).subscribe(
      //     (res)=>{
      //       console.log(res)
      //     },
      //     (err)=>{
      //       console.log(err)
      //     }
      //   )
      //   this.showLikeToast()
      // } else {
      //   this.showUnlikeToast()
      // }
    } else {
      Swal.fire({
        title: 'Login Required',
        text: 'Please log in to continue.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Okay',
        cancelButtonText: 'Cancel',
      });
    }
  }

  toggleBookMark(card: any) {
    if (this.validUser) {
      card.bookMarked = !card.bookMarked;
      if (card.bookMarked) {
        this.showSavedToast();
      } else {
        this.showUnsavedToast();
      }
    } else {
      Swal.fire({
        title: 'Login Required',
        text: 'Please log in to continue.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Okay',
        cancelButtonText: 'Cancel',
      });
    }
  }

  getAccessToken() {
    this.authservice.getUserData().subscribe((res: any) => {
      this.validUser = res.id;
      this.personName = `${res.firstName} ${res.lastName}`;
      this.personName =
        this.personName.charAt(0).toUpperCase() + this.personName.slice(1);
      this.personEmail = res.email;
    });
  }
  getPropertyData() {
    // Api-data--------------
    this.Propertyservice.getPropertyData().subscribe({
      next: (res: any) => {
        this.propertydetailsdata = res.data;
        console.log(this.propertydetailsdata);

        // filter through------------
        if (this.typeOfListing !== '') {
          this.filteredPropertytypeItems = this.propertydetailsdata.filter(
            (res) => {
              return res.contractType === this.typeOfListing;
            }
          );
          this.filteredItems = this.filteredPropertytypeItems;
          console.log(this.filteredItems);
        } else {
          this.filteredItems = this.propertydetailsdata;
        }
        this.filteredItems.forEach((property: any) => {
          property.imageId.forEach((imageId: any) => {
            this.getImagesData(imageId, property.propertyId);
          });
        });
      },
      error: (err) => {
        console.error('Error fetching property data:', err);
      },
    });
  }

  getImagesData(imageId: any, propertyId: any) {
    this.Propertyservice.getImages(imageId).subscribe(
      (data: Blob) => {
        const blob = new Blob([data]);
        const imageUrl = URL.createObjectURL(blob);
        const foundProperty = this.filteredItems.find(
          (property: any) => property.propertyId === propertyId
        );
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

  isCardView: boolean = true;
  buttonLabel: string = 'List View';
  buttonIcon: string = 'pi pi-list';
  responsiveOptions: any[] | undefined;
  selectedTypes: string[] = [];
  selectedBedrooms: string[] = [];
  selectedBathrooms: string[] = [];
  selectedyearBuild: number[] = [];
  selectedamenties: string[] = [];
  selectedsiteview: string[] = [];
  isBasementChecked: boolean = false;
  isPetValueChecked: boolean = false;

  items: any[] = [
    { label: 'Price - High To Low' },
    { label: 'Price - Low To High' },
    { label: 'Popularity' },
  ];

  yearbuild: number[] = [2018, 2020, 2021, 2022];

  siteview = ['City', 'Mountain', 'Park', 'Water'];
  bedrooms = ['any', '1', '2', '3', '4'];
  bathrooms = ['any', '1', '2', '3', '4'];

  toggleView() {
    this.isCardView = !this.isCardView;
    if (this.isCardView) {
      this.buttonLabel = 'List View';
      this.buttonIcon = 'pi pi-list';
    } else {
      this.buttonLabel = 'Grid View';
      this.buttonIcon = 'pi pi-th-large';
    }
  }
  toggleSelection(type: string) {
    const index = this.selectedTypes.indexOf(type);
    if (index === -1) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes.splice(index, 1);
    }
    this.applyFilters();
  }
  BedroomSelection(type: string) {
    const index = this.selectedBedrooms.indexOf(type);
    if (index === -1) {
      this.selectedBedrooms.push(type);
    } else {
      this.selectedBedrooms.splice(index, 1);
    }
    this.applyFilters();
  }
  BathroomSelection(type: string) {
    const index = this.selectedBathrooms.indexOf(type);
    if (index === -1) {
      this.selectedBathrooms.push(type);
    } else {
      this.selectedBathrooms.splice(index, 1);
    }
    this.applyFilters();
  }
  sendBasement(event: any) {
    this.isBasementChecked = event.target.checked;
    this.applyFilters();
  }
  sendPetvalue(event: any) {
    this.isPetValueChecked = event.target.checked;
    this.applyFilters();
  }
  onListingChange(event: any) {
    this.selectedListingType = event.value;
    this.applyFilters();
  }

  YearBuildSelection(type: number): void {
    if (this.selectedyearBuild.includes(type)) {
      this.selectedyearBuild = this.selectedyearBuild.filter(
        (year) => year !== type
      );
    } else {
      this.selectedyearBuild.push(type);
    }
    this.applyFilters();
  }
  AmentiesSelection(type: string) {
    const index = this.selectedamenties.indexOf(type);
    if (index === -1) {
      this.selectedamenties.push(type);
    } else {
      this.selectedamenties.splice(index, 1);
    }
    this.applyFilters();
  }
  SiteviewSelection(type: string) {
    const index = this.selectedsiteview.indexOf(type);
    if (index === -1) {
      this.selectedsiteview.push(type);
    } else {
      this.selectedsiteview.splice(index, 1);
    }
    this.applyFilters();
  }

  onDynamicRangeChange(event: any) {
    this.rangeprice = event;
    this.applyFilters();
  }
  onDynamicRangelotChange(event: any) {
    this.rangelot = event;
    this.applyFilters();
  }
  onDynamicRangesqrftChange(event: any) {
    this.rangesqrft = event;
    this.applyFilters();
  }

  onButtonClick(event: any) {
    console.log('Button Clicked');
  }

  onOptionSelect(option: string) {
    console.log(`Option Selected: ${option}`);
  }

  closeMenu(trigger: MatMenuTrigger | undefined): void {
    if (trigger) {
      trigger.closeMenu();
    } else {
      console.error('Trigger is not available');
    }
  }

  applyFilters() {
    this.filteredItems = this.propertydetailsdata.filter((item: any) => {
      const lotRangeCondition =
        (this.rangelot[0] === 0 && this.rangelot[1] === 0) ||
        (item.lotSize >= this.rangelot[0] && item.lotSize <= this.rangelot[1]);
      const priceRangeCondition =
        (this.rangeprice[0] === 0 && this.rangeprice[1] === 0) ||
        (item.listingPrice >= this.rangeprice[0] &&
          item.listingPrice <= this.rangeprice[1]);
      const totalSqurefeet =
        (this.rangesqrft[0] === 0 && this.rangesqrft[1] === 0) ||
        (item.squareFootage >= this.rangesqrft[0] &&
          item.squareFootage <= this.rangesqrft[1]);
      const bedrooms =
        this.selectedBedrooms.length === 0 ||
        this.selectedBedrooms.includes('any') ||
        this.selectedBedrooms.includes(item.bedrooms.toString());
      const bathrooms =
        this.selectedBathrooms.length === 0 ||
        this.selectedBathrooms.includes('any') ||
        this.selectedBathrooms.includes(item.bathrooms.toString());
      const yearbuild =
        this.selectedyearBuild.length === 0 ||
        this.selectedyearBuild.includes(item.yearBuilt);
      const propertyTypeCondition =
        this.selectedTypes.length === 0 ||
        this.selectedTypes.some((type) => item.propertyTypeName.includes(type));
      const ListingType =
        this.selectedListingType === '' ||
        this.selectedListingType === item.contractType;
      const amenties =
        this.selectedamenties.length === 0 ||
        this.selectedamenties.every((type: any) =>
          item.amenities.map((propertyAmenity: any) =>
            propertyAmenity.list.every((amenity: any) => {
              amenity.amenityName.includes(type);
            })
          )
        );
      // const basement = this.isBasementChecked === false || this.isBasementChecked === item.hasBasement;
      // const petallowed = this.isPetValueChecked === false || this.isPetValueChecked === item.petsAllowed;
      return (
        lotRangeCondition &&
        totalSqurefeet &&
        bedrooms &&
        bathrooms &&
        yearbuild &&
        propertyTypeCondition &&
        priceRangeCondition &&
        ListingType &&
        amenties
      );
    });
  }

  resetAll() {
    this.rangelot = [0, 5000];
    this.rangeprice = [0, 500000];
    this.rangesqrft = [0, 5000];
    this.selectedTypes = [];
    this.selectedBedrooms = [];
    this.selectedBathrooms = [];
    this.selectedyearBuild = [];
    this.selectedamenties = [];
    this.selectedsiteview = [];
    this.isBasementChecked = false;
    this.isPetValueChecked = false;
    this.selectedListingType = '';
    this.applyFilters();
  }
  cancelInput() {
    this.searchInput = '';
  }
  getAge(yearBuilt: number): string {
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearBuilt;
    if (age === 1) {
      return '1 year old';
    } else {
      return `${age} years old`;
    }
  }

  amenityIcons: { [key: string]: string } = {
    'General amenities': 'fas fa-cogs',
    Cooling: 'fas fa-snowflake',
    Heating: 'fas fa-thermometer',
    Parking: 'fas fa-car',
    Kitchen: 'fas fa-utensils',
    Interior: 'fas fa-couch',
    'Outdoor Amenities': 'fas fa-tree',
    Rooms: 'fas fa-door-open',
    Flooring: 'fas fa-shoe-prints',
    'Community Features': 'fas fa-users',
    'Included Utilities': 'fas fa-wrench',
    Laundry: 'fas fa-tshirt',
    Smoking: 'fas fa-smoking',
    Cats: 'fas fa-cat',
    Dogs: 'fas fa-dog',
  };

  getAmenityIcon(amenityName: string) {
    return this.amenityIcons[amenityName] || 'default-icon-url.png';
  }
  //---------------------share-like-save-functionality----------

  openShareModal(id: number) {
    this.dialog.open(ShareModalComponent, {
      width: '600px',
      data: { id },
    });
  }

  copyMessage(card: any) {
    console.log(card);
    const contentToCopy = card.propertyId;
    const textarea = document.createElement('textarea');
    textarea.value = contentToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    card.tooltipClicked = true;
    setTimeout(() => {
      card.tooltipClicked = false;
      console.log('false');
    }, 2000);
  }
  getMatchingAmenitiesCount(amenities: any[]): number {
    return amenities.filter((amenity) => amenity.list.length > 0).length;
  }
  getBadgeClasses(matchingCount: number): string {
    if (matchingCount >= 1 && matchingCount <= 3) {
      return 'badge bg-warning p-2';
    } else if (matchingCount > 5 && matchingCount <= 10) {
      return 'badge bg-success p-2';
    } else {
      return 'badge bg-primary p-2';
    }
  }
  //sorting functionality---------------
  sortProperty(item: any): void {
    switch (item.label) {
      case 'Price - Low To High':
        this.filteredItems = [...this.filteredItems].sort((a, b) => {
          return a.listingPrice - b.listingPrice;
        });
        break;
      case 'Price - High To Low':
        this.filteredItems = [...this.filteredItems].sort((a, b) => {
          return b.listingPrice - a.listingPrice;
        });
        break;
      case 'Popularity':
        this.filteredItems = [...this.filteredItems].sort((a, b) => {
          return b.amenity.length - a.amenity.length;
        });
        break;
      default:
        console.log('default option');
        break;
    }
  }
}
