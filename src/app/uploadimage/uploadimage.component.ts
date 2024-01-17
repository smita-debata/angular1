import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { LocationService } from '../location.service';
import { formatDate } from '@angular/common';
import { PropertylistingsService } from '../services/propertylistings.service';
declare var google: any;
@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css']
})
export class UploadimageComponent implements OnInit {
  constructor(private ngZone: NgZone, private apiService: LocationService, private http: HttpClient, private service: PropertylistingsService) { }
  @ViewChild('autocompleteInput') autocompleteInput!: ElementRef;
  @ViewChild("file", { static: false }) orgFile!: ElementRef;
  ngAfterViewInit() {
    this.initializeAutocomplete();
  }
  ngOnInit() {

  }
  initializeAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.nativeElement
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        // Get the selected place
        const place = autocomplete.getPlace();

        // Handle the place data as needed (e.g., log to console)
        console.log('Place:', place);
      });
    });
  }

  selectedFiles: File[] = [];
  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }
  uploadFiles(): void {
    if (this.selectedFiles.length === 0) {
      console.log('No files selected.');
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i]);
    }
    const ApiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJ2ZWVuYTIiLCJsYXN0TmFtZSI6ImJhbmVrb2xhIiwiaWQiOjU1NiwiZW1haWwiOiJ2ZWVuYTIyQGdtYWlsLmNvbSIsInN1YiI6InZlZW5hMjJAZ21haWwuY29tIiwiaWF0IjoxNzAzNjcyMDU0LCJleHAiOjE3MzUyMDgwNTR9.R1te3B7zIDrG04mku6wKmkHVSmmzNHIivW7ZFyJ_T8w'
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ApiKey}`
    });
    this.http.post('http://20.127.32.150:443/landlord/property-image/uploadBulk/1', formData, { headers: headers }).subscribe((res) => {
      console.log(res)
    })
  }


}
