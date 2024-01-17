import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
  maintenance!:FormGroup;
  imagePreviews: string[] = [];
  previewImageSection:any;
  fileInput: any;
  constructor(private fb:FormBuilder){
  
    
      this.maintenance = this.fb.group({
        maintenanceCategory: ['', Validators.required],
        property: ['', Validators.required],
        urgencylevel: ['', Validators.required],
        description: ['', Validators.required],
      });
    
  }

  ngOnInit(): void {
  }

  previewImages(event: any): void {
    this.imagePreviews = [];
    console.log('Preview images');
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
          console.log('Image added to previews');
        };
        reader.readAsDataURL(file);
      }
    }
    console.log('Image previews:', this.imagePreviews);
  }
  
  deselectImage(preview: string): void {
    const index = this.imagePreviews.indexOf(preview);
    if (index !== -1) {
      this.imagePreviews.splice(index, 1);
    }
  }

  submitRequest(){
    console.log(this.maintenance.value)
  }
}
