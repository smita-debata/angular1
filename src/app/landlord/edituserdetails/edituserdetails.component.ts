import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-edituserdetails',
  templateUrl: './edituserdetails.component.html',
  styleUrls: ['./edituserdetails.component.css'],
})
export class EdituserdetailsComponent implements OnInit {
  @Output() closeModelEvent = new EventEmitter<void>();
  editUserForm!: FormGroup;
  userFirstName: any;
  userLastName: any;
  imagePreview: any  ;


  constructor(private fb: FormBuilder, private authservice: AuthService) {
    this.editUserForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      profileimage: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //  getting the logged in user details
        this.authservice.getUserData().subscribe(
          (res: any) => {
            console.log(res);
            this.userFirstName = res.firstName;
            this.userLastName = res.lastName;
            this.editUserForm.patchValue({
            firstname: this.userFirstName,
            lastname: this.userLastName,
          });
            console.log(this.userFirstName, this.userLastName);
          },
            (err) => {
            console.log(err);
          }
      );
   }

  handleUserDetails() {
    console.log(this.editUserForm.value);
    this.closeModelEvent.emit();
  }

  previewImage() {
    const fileInput = document.getElementById('profileimage') as HTMLInputElement;
    const file = (fileInput.files as FileList)[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  deselectImage() {
    this.imagePreview = null;
    const fileInput = document.getElementById('profileimage') as HTMLInputElement;
    fileInput.value = '';
  }

}
