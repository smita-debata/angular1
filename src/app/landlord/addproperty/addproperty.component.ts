import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, NgZone, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Listings, propertyTypes } from 'src/app/Alljsondata';
import { LocationService, Maps } from 'src/app/location.service';
import { LandlordService } from 'src/app/services/landlord.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css']
})
export class AddpropertyComponent {
  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();
  AddProperty!: FormGroup;
  //---------image-variable----
  selectedFiles: File[] = [];
  imageUrls: string[] = [];
  selectedImageName: string[] = [];
  previewPhotos: boolean = false
  //----------vide0-variable----------
  selectedVideoFiles: File[] = [];
  videoUrls: string[] = [];
  selectedVideoName: string[] = [];
  previewVideos: boolean = false
  isLinear = false;
  date: Date | undefined;
  completed: boolean = true;
  leaseTerms: any = [
    { name: 'Month-to-Month Tenancy', checked: false },
    { name: 'Fixed-Term Lease (e.g., 6 months, 1 year)', checked: false },
    { name: 'Bi-Annual Lease', checked: false },
    { name: 'No Fixed Duration; Open-Ended Agreement', checked: false },

  ];
  amenties: any = [
    { name: 'Balcony or desk', checked: false },
    { name: 'Furnished', checked: false },
    { name: 'Hardwood floors', checked: false },
    { name: 'Disable access', checked: false },
    { name: 'Dishwasher', checked: false },
    { name: 'Pool', checked: false },
    { name: 'Bicycle storage', checked: false }
  ];
  cooling: any = [
    { name: 'Central', checked: false },
    { name: 'Wall', checked: false },
    { name: 'Window', checked: false },
  ];
  heating: any = [
    { name: 'Forced air', checked: false },
    { name: 'Basedboard', checked: false },
    { name: 'Heat pump', checked: false },
    { name: 'Wall', checked: false },
  ];
  parking: any = [
    { name: 'Attached parking', checked: false },
    { name: 'Detached parking', checked: false },
    { name: 'Off-street parking', checked: false },
  ];
  kitchen: any = [
    { name: 'Dishwasher', checked: false },
    { name: 'Refrigerator', checked: false },
    { name: 'Microwave', checked: false },
    { name: 'Stove', checked: false },
    { name: 'Disposal', checked: false },
    { name: 'Pantry', checked: false },
    { name: 'Island', checked: false },
    { name: 'Breakfast Nook', checked: false },
  ];
  interior: any = [
    { name: 'Heating', checked: false },
    { name: 'Air conditioning', checked: false },
    { name: 'Washer and dryer units', checked: false },
    { name: 'Washer and dryer hookups', checked: false },
    { name: 'Cable available', checked: false },
    { name: 'High speed internet availble', checked: false },
    { name: 'Ceiling fan', checked: false },
    { name: 'Walk-in closets', checked: false },
    { name: 'Fire place', checked: false },
    { name: 'Vaulted ceilings', checked: false },
    { name: 'Blinds', checked: false },
    { name: 'Jetted tubes', checked: false },
    { name: 'Attic', checked: false },
    { name: 'Bookshelt', checked: false },
    { name: 'Skylights', checked: false },
    { name: 'Intrusion alarm', checked: false },
    { name: 'Handicap access', checked: false },
    { name: 'Scenic view', checked: false },
    { name: 'Central vacuum', checked: false },
    { name: 'Waterfront', checked: false },
    { name: 'Furnished', checked: false }
  ];
  outdoor: any = [
    { name: 'Patio', checked: false },
    { name: 'Pool', checked: false },
    { name: 'Porch', checked: false },
    { name: 'Storage', checked: false },
    { name: 'Deck', checked: false },
    { name: 'Fenced yard', checked: false },
    { name: 'Hot tube/spa', checked: false },
    { name: 'Lawn', checked: false },
    { name: 'Balcony', checked: false },
    { name: 'Barbecue area', checked: false },
    { name: 'Garden', checked: false },
    { name: 'Fire pit', checked: false },
    { name: 'Water front', checked: false },
  ];
  room: any = [
    { name: 'Living room', checked: false },
    { name: 'Dining room', checked: false },
    { name: 'Living/Dining Room Combo', checked: false },
    { name: 'Den', checked: false },
    { name: 'Utility room', checked: false },
    { name: 'Bonus room', checked: false },
    { name: 'Finished basement', checked: false },
    { name: 'Unfinished basement', checked: false },
    { name: 'Crawlspace', checked: false },
    { name: 'study', checked: false },
    { name: 'Rec room', checked: false },
    { name: 'Wet bar', checked: false }
  ];
  flooring: any = [
    { name: 'Hard wood', checked: false },
    { name: 'Ceramic tile', checked: false },
    { name: 'Carpet', checked: false },
    { name: 'Vinyl', checked: false }
  ];
  community: any = [
    { name: 'Laundry', checked: false },
    { name: 'Pool', checked: false },
    { name: 'Gym', checked: false },
    { name: 'Storage', checked: false },
    { name: 'Business center', checked: false },
    { name: 'Tennis', checked: false },
    { name: 'Playground', checked: false },
    { name: 'Volleyball', checked: false },
    { name: 'Golf', checked: false },
    { name: 'Racquetball', checked: false },
    { name: 'Clubhouse', checked: false },
    { name: 'Elevator', checked: false },
    { name: 'Access gate', checked: false },
    { name: 'Handicap accessible', checked: false }
  ];
  utilities: any = [
    { name: 'Tenant pay all', checked: false },
    { name: 'Electric', checked: false },
    { name: 'Water', checked: false },
    { name: 'Sewer', checked: false },
    { name: 'Garbage', checked: false },
    { name: 'Gas', checked: false },
    { name: 'Lawn', checked: false },
    { name: 'Cable', checked: false },
    { name: 'Internet', checked: false }
  ];
  documents = [
    // { title: 'Driver License, GC, H1 visa, H1B (1-797)' },
    { title: 'Investment Properties' },
    { title: 'Latest 2 months Bank Statements' },
    // { title: 'Latest 2 Pay Stubs' },
    { title: 'latest 2 year IRS Tax Return, transcript, Proof of IRS refund' },
    // { title: 'latest 2 year W2' },
    { title: 'Purchase Contract, copies of DD & EM Checks' },
    { title: 'Other Documents' }
  ];
  laundry1: string = '';
  laundry: string[] = ['No laundry facilities are available', 'Washer-dryer included', 'Washer-dryer hookups', 'Shared'];
  propertyTpes: any[] = [];
  listingtype: string[] = [];
  selectedfiltesBe: File | undefined;
  AllPropertyAmenties: any;
  uploadImage: any;
  uploadedFiles: number = 0;
  maxFiles: number = 8;
  progress: number = 0;
  allImageData: any;
  maps: any
  @ViewChild('search')
  searchElementRef!: ElementRef;
  places: any = {
    lat: 0,
    lon: 0
  }
  loctiondetails: any;
  propertyId: any;
  selectedAmenities: any;
  totalUploadsData: File[] = [];
  invalidImageSize: string = '';
  invalidVideoSize: string = '';

  constructor(private http: HttpClient, private fb: FormBuilder, private location: LocationService, private zone: NgZone, private landservice: LandlordService) {

    this.AddProperty = this.fb.group({
      propertyTypeId: ['', Validators.required],
      formattedAddress: ['', Validators.required],
      street: ['', Validators.required],
      route: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      unitNumber: ['', Validators.required],
      country: ['', Validators.required],
      listingPrice: ['', Validators.required],
      bedrooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      squareFootage: ['', Validators.required],
      lotSize: ['', Validators.required],
      yearBuilt: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      description: ['', Validators.required],
      contractType: ['', Validators.required],
      // lease: this.fb.group({
      //   leaseTerm: [''],
      //   leaseDisCloser: [''],
      // }),
      amenities: ["", {}, Validators.required]
    })
  }

  getSelectedLeaseTerms() {
    const selectedLeaseTerm = this.leaseTerms
      .filter((leaseTerms: any) => leaseTerms.checked)
      .map((leaseTerms: any) => leaseTerms.name);
    this.AddProperty.get('lease.leaseTerm')?.setValue(selectedLeaseTerm);
  }



  onSubmitAddProperty() {
    this.landservice.addPropertydetails(this.AddProperty.value).subscribe((res: any) => {
      console.log(res)
      if (res) {
        Swal.fire('Success', 'Property Saved Successfully!', 'success')
        this.propertyId = res.data
        this.onUpload();
        this.onUploadVideos();
        this.uploadDocumentFiles();
        this.AddProperty.reset()
        this.clearSelectedImages();
        Object.keys(this.AddProperty.controls).forEach((key: string) => {
          const control = this.AddProperty.get(key);
          if (control) {
            control.markAsUntouched();
            control.markAsPristine();
          }
        });
        this.AllPropertyAmenties.forEach((category: any) => {
          category.list.forEach((amenity: any) => {
            amenity.checked = false;
          });
        });
        this.submitEvent.emit();
      }
      else {
        Swal.fire('Sorry', 'Failure to Submit Form!', 'error')
      }
    })

  }
  clearSelectedImages(): void {
    this.selectedFiles = [];
    this.selectedImageName = [];
    this.imageUrls = [];
    this.selectedVideoName = [];
    this.selectedVideoFiles = [];
    this.videoUrls = [];
    this.totalUploadsData = [];
    this.filesdocuments = [];
    this.successfulUploads = [];
    this.uploadedFiles = 0;
    this.progress = 0;
  }

  ngOnInit(): void {
    this.listingtype = Listings
    this.location.api.then((maps) => {
      this.initAutocomplete(maps);
      this.maps = maps;
    });
    this.getPropertyAmenties();
    this.getPropertyTypes();

  }

  getPropertyAmenties() {
    this.landservice.getPropertyAmenity().subscribe((res: any) => {
      this.AllPropertyAmenties = res.data
      console.log(this.AllPropertyAmenties)
    })
  }
  getPropertyTypes() {
    this.landservice.getPropertyType().subscribe((res: any) => {
      console.log(res.data)
      this.propertyTpes = res.data
    })
  }

  handleCheckboxChange(amenity: any, categoryId: number, isRadio: boolean = false): void {
    const categoryIndex = this.AllPropertyAmenties.findIndex((cat: any) => cat.amenityCategoryId === categoryId);
    if (categoryIndex !== -1) {
      if (isRadio) {
        this.AllPropertyAmenties[categoryIndex].list.forEach((item: any) => {
          item.checked = item.amenityId === amenity.amenityId;
        });
      } else {
        const amenityIndex = this.AllPropertyAmenties[categoryIndex].list.findIndex(
          (item: any) => item.amenityId === amenity.amenityId
        );
        if (amenityIndex !== -1) {
          this.AllPropertyAmenties[categoryIndex].list[amenityIndex].checked = amenity.checked;
        }
      }
    }
    this.updateSelectedAmenities();
  }
  updateSelectedAmenities(): void {
    this.selectedAmenities = this.AllPropertyAmenties.map((category: any) => {
      return {
        amenityCategoryId: category.amenityCategoryId,
        list: category.list.filter((amenity: any) => amenity.checked)
      };
    });
    this.AddProperty.get('amenities')?.setValue(this.selectedAmenities);
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      // this.allImageData = input.files[0]
      // for (let i = 0; i < input.files.length; i++) {
      //   this.selectedImageName.push(input.files[i].name)
      //   this.selectedFiles.push(input.files[i]);
      //   this.previewImage(input.files[i]);
      // }
      this.checkFileSize(input.files);
    }
  }
  checkFileSize(file: any) {
    console.log(file[0].size)
    const fileSizeInMB = file[0].size / (1024 * 1024);
    console.log(fileSizeInMB)
    if (fileSizeInMB > 2) {
      this.invalidImageSize = 'Please upload a file smaller than 2MB.'
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput.value = '';
    } else {
      this.allImageData = file[0]
      for (let i = 0; i < file.length; i++) {
        this.selectedImageName.push(file[i].name)
        this.selectedFiles.push(file[i]);
        this.previewImage(file[i]);
      }
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.imageUrls.push(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
  onUpload(): void {
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file, index) => {
        const formdata = new FormData();
        formdata.append('images', file)
        this.landservice.uploadImages(this.propertyId, formdata).subscribe((res: any) => {
          console.log(res)
        })
      })
    }
  }
  deleteImage(index: number) {
    if (index >= 0 && index < this.imageUrls.length) {
      this.imageUrls.splice(index, 1);
      this.selectedImageName.splice(index, 1);
      if (this.imageUrls.length == 0) {
        this.previewPhotos = false;
      }
    }
  }
  PreviewImageCondition() {
    this.previewPhotos = true;
  }
  //----------------------video functionality-------------
  onVideoFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.checkVideoFileSize(input.files);
      // for (let i = 0; i < input.files.length; i++) {
      //   this.selectedVideoName.push(input.files[i].name)
      //   this.selectedVideoFiles.push(input.files[i]);
      //   this.previewVideo(input.files[i]);
      // }
    }
  }

  checkVideoFileSize(file: any) {
    console.log(file[0].size)
    const fileSizeInMB = file[0].size / (1024 * 1024);
    console.log(fileSizeInMB)
    if (fileSizeInMB > 10) {
      this.invalidVideoSize = 'Please upload a Video smaller than 10MB.'
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput.value = '';
    } else {
      for (let i = 0; i < file.length; i++) {
        this.selectedVideoName.push(file[i].name)
        this.selectedVideoFiles.push(file[i]);
        this.previewVideo(file[i]);
      }
    }
  }

  previewVideo(file: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.videoUrls.push(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
  onUploadVideos(): void {
    if (this.selectedVideoFiles.length > 0) {
      this.selectedVideoFiles.forEach((file, index) => {
        const formdata = new FormData();
        formdata.append('videos', file)
        this.landservice.uploadVideos(this.propertyId, formdata).subscribe((res: any) => {
          console.log(res)
        })
      });
    }
  }
  deleteVideo(index: number) {
    if (index >= 0 && index < this.videoUrls.length) {
      this.videoUrls.splice(index, 1);
      this.selectedVideoName.splice(index, 1);
      if (this.videoUrls.length == 0) {
        this.previewVideos = false;
      }
    }
  }
  PreviewVideoCondition() {
    this.previewVideos = true;
  }

  successfulUploads: boolean[] = Array.from({ length: 8 }, () => false);
  filesdocuments: any[] = [];

  handleFileChange(event: any, index: number) {
    const files = event.target.files;
    this.totalUploadsData.push(files[0]);
    const fileCount = files.length;
    this.uploadedFiles += fileCount;
    this.updateProgressBar(fileCount);
    this.filesdocuments[index] = { title: files[0].name, file: files[0] };
    this.successfulUploads[index] = true;
  }

  updateProgressBar(fileCount: number) {
    const progressIncrement =
      ((this.uploadedFiles + fileCount) / this.maxFiles) * 100;
    this.progress = Math.min(progressIncrement, 100);
  }
  cancelUpload(index: number) {
    this.successfulUploads[index] = false;
    this.uploadedFiles--;
  }
  sendFilesToBackend() {
    const formData = new FormData();
    for (let i = 0; i < this.filesdocuments.length; i++) {
      if (this.successfulUploads[i]) {
        formData.append('files', this.filesdocuments[i].file, this.filesdocuments[i].file.name);
      }
    }
    console.log(formData.get('files'))
  }

  uploadDocumentFiles() {
    if (this.totalUploadsData.length > 0) {
      this.totalUploadsData.forEach((file) => {
        const formdata = new FormData();
        formdata.append('files', file)
        this.landservice.uploadDocuments(this.propertyId, formdata).subscribe((res: any) => {
          console.log(res, 'upload documents...')
        })
      });
    }
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
        console.log(place)
        this.AddProperty.patchValue({
          formattedAddress: this.formatAddress(place),
          street: this.extractAddressComponent(place, 'street_number'),
          route: this.extractAddressComponent(place, 'route'),
          city: this.extractAddressComponent(place, 'locality'),
          state: this.extractAddressComponent(place, 'administrative_area_level_1'),
          country: this.extractAddressComponent(place, 'country'),
          zipCode: this.extractAddressComponent(place, 'postal_code')
        });
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
  extractAddressComponent(place: any, type: string): string {
    const components = place.address_components;
    if (components) {
      for (const component of components) {
        for (const componentType of component.types) {
          if (componentType === type) {
            return component.long_name;
          }
        }
      }
    }
    return '';
  }

}
