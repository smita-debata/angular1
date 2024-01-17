
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyDetails, amenties, backenddetailsd } from 'src/app/Alljsondata';
import { AuthService } from 'src/app/authentication/auth.service';
import { PropertylistingsService } from 'src/app/services/propertylistings.service';

declare var bootstrap: any;
@Component({
  selector: 'app-property-overview',
  templateUrl: './property-overview.component.html',
  styleUrls: ['./property-overview.component.css']
})
export class PropertyOverviewComponent implements AfterViewInit {
  propertyId: string | null = null;
  propertydetailsdata: any[] = []
  filteredItems: any[] = []
  alldata: any;
  searchCity: string = ''
  fullUrl: any
  amentiesIcons: any[] = []
  propertyPresent: number = 0;
  PropertyDetailsApiData: any[] = [];
  personName: any;
  personEmail: any;
  constructor(private route: ActivatedRoute, private router: Router, private elementRef: ElementRef, private renderer: Renderer2, private cdn: ChangeDetectorRef, private Propertyservice: PropertylistingsService, private authservice: AuthService,) {
  }

  images: any = [
    { url: '../../../assets/ag1.jpg' },
    { url: '../../../assets/ag2.jpg' },
    { url: '../../../assets/ag3.jpg' },
    { url: '../../../assets/ag1.jpg' },
    { url: '../../../assets/ag2.jpg' },
    { url: '../../../assets/ag3.jpg' },
    { url: '../../../assets/ag3.jpg' },
    { url: '../../../assets/ag1.jpg' },

  ];
  tableHeaderIcons: any = [
    { url: '../../../assets/propertyOverview/propertyDetails.png', name: 'Property Details', active: false },
    { url: '../../../assets/propertyOverview/amenties.png', name: 'Amenties', active: false },
    { url: '../../../assets/propertyOverview/Key Features.png', name: 'Key Features', active: false },
    { url: '../../../assets/propertyOverview/Pricing Details.png', name: 'Pricing Details', active: false },
    { url: '../../../assets/propertyOverview/Contact Information.png', name: 'Contact Information', active: false },
    { url: '../../../assets/propertyOverview/Nearby Places.png', name: 'Nearby Places', active: false },
    { url: '../../../assets/propertyOverview/Neighborhood.png', name: 'Neighborhood', active: false },
    { url: '../../../assets/propertyOverview/Local legal protection.png', name: 'Local legal protection', active: false },
    { url: '../../../assets/propertyOverview/FAQ.png', name: 'FAQ', active: false },

  ];
  ngOnInit(): void {
    const getJWTToken = sessionStorage.getItem('AccessToken')
    if (getJWTToken) {
      this.getAccessToken();
    }
    this.route.queryParams.subscribe(params => {
      this.propertyId = params['id'];
      console.log(this.propertyId)
      const fullCurrentUrl = this.router.url;
      const fullUrl = fullCurrentUrl
      this.fullUrl = fullUrl
    });
    this.getPropertyData()

    this.amentiesIcons = amenties



  }
  getAccessToken() {
    this.authservice.getUserData().subscribe((res: any) => {
      this.personName = `${res.firstName} ${res.lastName}`
      this.personName = this.personName.charAt(0).toUpperCase() + this.personName.slice(1)
      this.personEmail = res.email
    });
  }

  getPropertyData() {
    // Api-data--------------
    this.Propertyservice.getPropertyData().subscribe({
      next: (res: any) => {
        this.propertydetailsdata = res.data;
        console.log(this.propertydetailsdata);
        this.filteredItems = this.propertydetailsdata;
        this.alldata = this.propertydetailsdata.find((res: any) => {
          return res.propertyId == this.propertyId
        })
        this.searchCity = `${this.alldata.city} , ${this.alldata.state}`
        this.filteredItems.forEach((property: any) => {
          property.imageId.forEach((imageId: any) => {
            this.getImagesData(imageId, property.propertyId);
          });
        });
      },
      error: (err) => {
        console.error('Error fetching property data:', err);
      }
    });
  }

  getImagesData(imageId: any, propertyId: any) {
    this.Propertyservice.getImages(imageId).subscribe(
      (data: Blob) => {
        const blob = new Blob([data]);
        const imageUrl = URL.createObjectURL(blob);
        const foundProperty = this.filteredItems.find((property: any) => property.propertyId === propertyId);
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

  isInterior(categoryId: number): boolean {
    return [6, 8, 9, 4].includes(categoryId);
  }
  isExterior(categoryId: number): boolean {
    return [1, 7].includes(categoryId);
  }
  isUtilities(categoryId: number): boolean {
    return [10, 11, 12, 13, 52, 53].includes(categoryId);
  }
  goBack() {
    window.history.back();
  }
  iconsPerPage = 5;
  currentPageIndex = 0;
  activeIconIndex = 0;
  get displayedIcons(): any[] {
    const startIndex = this.currentPageIndex * this.iconsPerPage;
    const endIndex = startIndex + this.iconsPerPage;
    return this.tableHeaderIcons.slice(startIndex, endIndex);
  }

  showNextPage(): void {
    this.activeIconIndex = -1;
    const totalPages = Math.ceil(this.tableHeaderIcons.length / this.iconsPerPage);
    this.currentPageIndex = (this.currentPageIndex + 1) % totalPages;
  }

  showPreviousPage(): void {
    this.activeIconIndex = 0;
    const totalPages = Math.ceil(this.tableHeaderIcons.length / this.iconsPerPage);
    this.currentPageIndex = (this.currentPageIndex - 1 + totalPages) % totalPages;
  }
  ngAfterViewInit() {
    const scrollContent = document.querySelector('.scroll-content');

    if (scrollContent) {
      scrollContent.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  handleScroll(event: Event) {
    const scrollContent = event.target as HTMLElement;
    const contentSections = document.querySelectorAll<HTMLElement>('.content-section');
    let activeSection: HTMLElement | null = null;
    const scrollPosition = scrollContent.scrollTop + (scrollContent.offsetHeight / 2);
    Array.from(contentSections).some((section: HTMLElement) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition <= (sectionTop + sectionHeight)) {
        activeSection = section;

        return true;
      }
      return false;
    });

    if (activeSection) {
      const activeIndex = this.tableHeaderIcons.findIndex(
        (icon: any) => icon.name === activeSection!.id
      );
      this.propertyPresent = activeIndex
      if (activeIndex !== -1) {
        const currentPageStartIndex = this.currentPageIndex * this.iconsPerPage;
        const currentPageEndIndex = currentPageStartIndex + this.iconsPerPage - 1;

        if (activeIndex < currentPageStartIndex || activeIndex > currentPageEndIndex) {
          this.currentPageIndex = Math.floor(activeIndex / this.iconsPerPage);
          this.activeIconIndex = activeIndex % this.iconsPerPage;
        } else {
          this.activeIconIndex = activeIndex - currentPageStartIndex;
        }
      }
    }
  }
  scrollToActiveIcon(): void {
    const activeIconElement = document.querySelector('.icon-class.active') as HTMLElement;

    if (activeIconElement) {
      activeIconElement.scrollIntoView({ behavior: 'smooth', });
    }
  }
  toggleActive(index: number, event: Event): void {
    event.stopPropagation();
    event.defaultPrevented;
    const startIndex = this.currentPageIndex * this.iconsPerPage;
    const absoluteIndex = startIndex + index;
    if (this.activeIconIndex === absoluteIndex) {
      this.activeIconIndex = -1;
    } else {
      this.activeIconIndex = absoluteIndex;
      this.scrollToContent(this.tableHeaderIcons[this.activeIconIndex].name);
    }
  }

  scrollToContent(contentName: string): void {
    const element = document.getElementById(contentName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  amenityIcons: { [key: string]: string } = {
    'Swimming Pool': '../../assets/amenties/swim.png',
    'Tennis Court': '../../assets/amenties/Tennis Court.png',
    'Smart Home Technology': '../../assets/amenties/Smart Home Technology.png',
    'Playground': '../../assets/amenties/Playground.png',
    'Gym': '../../assets/amenties/Gym.png',
    'Garage': '../../assets/amenties/Garage.png',
    'Walk-In Closet': '../../assets/amenties/Walk-In Closet.png',
    'High-Speed Internet': '../../assets/amenties/High-Speed Internet.png',
    'Pet-Friendly': '../../assets/amenties/Pet-Friendly.png',

  };
  getAmenityIcon(amenityName: string) {
    return this.amenityIcons[amenityName] || 'default-icon-url.png';
  }
  getAge(yearBuilt: number): string {
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearBuilt;
    if (age === 1) {
      return "1 year old";
    } else {
      return `${age} years old`;
    }
  }


  propertyFeatures: string[] = [
    'Power backup',
    'Flooring - hard wood',
    'AC',
    'Suitable for family',
    'Balcony',
    'Living room',
    'Dining room',
    '2 bathrooms',
    'Guest rooms',
    'Shared Laundry',
    'Transportation Access',
    'Modern Appliances',
    'Granite Countertops',
    'Solar Panels'
  ];


  getIconClass(feature: string): string {
    switch (feature.toLowerCase()) {
      case 'power backup':
        return 'fa-bolt';
      case 'flooring - hard wood':
        return 'fa-hard-hat';
      case 'ac':
        return 'fa-snowflake';
      case 'suitable for family':
        return 'fa-home';
      case 'balcony':
        return 'fa-door-open';
      case 'living room':
        return 'fa-couch';
      case 'dining room':
        return 'fa-utensils';
      case '2 bathrooms':
        return 'fa-bath';
      case 'guest rooms':
        return 'fa-bed';
      case 'shared laundry':
        return 'fa-tshirt';
      case 'transportation access':
        return 'fa-bus';
      case 'modern appliances':
        return 'fa-laptop';
      case 'granite countertops':
        return 'fa-border-style';
      case 'solar panels':
        return 'fa-sun';
      default:
        return 'fa-question';
    }
  }
  propertyNearBy: string[] = [
    'Schools',
    'Stores',
    'Sports Club',
    'Restaurants',
    'Public Transportation',
    'Parks and Recreation',
    'Healthcare Facilities',
    'Sports Club',
    'Restaurants',
    'Public Transportation'

  ];
  getIconClassNearBy(feature: string): string {
    switch (feature.toLowerCase()) {
      case 'schools':
        return 'fa-school';
      case 'stores':
        return 'fa-store';
      case 'sports club':
        return 'fa-futbol';
      case 'restaurants':
        return 'fa-utensils';
      case 'public transportation':
        return 'fa-bus';
      case 'parks and recreation':
        return 'fa-tree';
      case 'healthcare facilities':
        return 'fa-clinic-medical';
      default:
        return 'fa-question';
    }
  }
  neighborhoodAmenities: any = [
    {
      title: 'Gyms or Sports Clubs',
      description: 'Fitness centers, gyms, or sports clubs in the vicinity.'
    },
    {
      title: 'Entertainment',
      description: 'Movie theaters, cultural centers, entertainment venues nearby.'
    },
    {
      title: 'Community Centers',
      description: 'Spaces for community gatherings, events, or activities.'
    },
    {
      title: 'Library',
      description: 'Access to public libraries or bookstores.'
    },
    {
      title: 'Cultural Diversity',
      description: 'A diverse community with various cultural activities or events.'
    },
    {
      title: 'Community Events',
      description: 'Regular events, festivals, or community gatherings.'
    }
    // Add more amenities if needed
  ];
  getIconNeighborhoodAmenities(amenity: any): string {
    switch (amenity.title.toLowerCase()) {
      case 'gyms or sports clubs':
        return 'fa-dumbbell';
      case 'entertainment':
        return 'fa-film';
      case 'community centers':
        return 'fa-users';
      case 'library':
        return 'fa-book';
      case 'cultural diversity':
        return 'fa-globe';
      case 'community events':
        return 'fa-calendar-alt';
      default:
        return 'fa-question'; // Default icon if no matching icon found
    }
  }
  legalAspects: any = [
    {
      title: 'Lease Agreement Information',
      description: 'Details about lease terms, rent amount, payment schedule, security deposit, etc.'
    },
    {
      title: 'Tenant Rights and Responsibilities',
      description: 'Information about privacy rights, maintenance responsibilities, and utility obligations.'
    },
    {
      title: 'Legal Compliance and Disclosures',
      description: 'Compliance with fair housing laws, lead paint disclosure, local ordinances, etc.'
    },
    {
      title: 'Termination and Eviction Procedures',
      description: 'Details on termination clauses, eviction procedures, and dispute resolution.'
    },
    {
      title: 'Additional Legal Information',
      description: 'Lawsuits and disputes resolution, tenant handbook or guide.'
    },
    {
      title: 'Contact Information',
      description: 'Landlord or property manager contact details for communication.'
    }
    // Add more legal aspects if needed
  ];
  getIconClasslegalAspect(legalAspect: any): string {
    switch (legalAspect.title.toLowerCase()) {
      case 'lease agreement information':
        return 'fa-file-contract';
      case 'tenant rights and responsibilities':
        return 'fa-user-shield';
      case 'legal compliance and disclosures':
        return 'fa-gavel';
      case 'termination and eviction procedures':
        return 'fa-sign-out-alt';
      case 'additional legal information':
        return 'fa-info-circle';
      case 'contact information':
        return 'fa-address-card';
      default:
        return 'fa-question'; // Default icon if no matching icon found
    }
  }
}
