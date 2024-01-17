import { CDK_COPY_TO_CLIPBOARD_CONFIG } from '@angular/cdk/clipboard';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { error } from 'jquery';
import { LandlordService } from 'src/app/services/landlord.service';
import { AuthService } from 'src/app/authentication/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @Output() closeModelEvent = new EventEmitter<void>();
  changepassword!: FormGroup
  userDetails:any;

  constructor(private fb: FormBuilder, private http:HttpClient, private landlordservice: LandlordService, private authservice: AuthService) {
    this.changepassword = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });

  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')!.value === form.get('confirmPassword')!.value
      ? null
      : { 'mismatch': true };
  }
  ngOnInit(): void {
    this.authservice.getUserData().subscribe(
      (res)=>{
        console.log(res)
        this.userDetails = res
        console.log(this.userDetails.password)
      }

    )
  }
  handlePasswordChange() {
    if (this.changepassword.valid) {
      this.closeModelEvent.emit();
      const oldPassword = this.changepassword.get('oldPassword')!.value;
      const newPassword = this.changepassword.get('newPassword')!.value;
      const formdata = new FormData();
      formdata.append('oldPassword', oldPassword)
      formdata.append('newPassword', newPassword);

        this.landlordservice.postlandlordPassword(formdata).subscribe(
            (res)=>{
              console.log(res)
              Swal.fire({
                icon: 'success',
                title: 'Password Updated Successfully',
                showConfirmButton: false,
                timer: 1500,
              })
              this.changepassword.reset()
            },
            (err)=>{
              console.log(err)
            }
          )
      
     

      // const headers = new HttpHeaders({
        
      // })

      // this.http.post<any>("20.127.32.150:443/auth/resetPassword", formdata).subscribe(
      //   (response)=>{
      //     console.log(response)
      //   },
      //   (error)=>{
      //     console.log(error)
      //   }
      // )

    }

  }

}
