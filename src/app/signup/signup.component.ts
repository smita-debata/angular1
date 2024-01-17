import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signup } from '../Alljsondata';
import { RegisterLoginService } from '../services/register-login.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesHelper } from '../services/message';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @Output() closeMenuEvent = new EventEmitter<void>();
  Signup!: FormGroup;
  roles = ['Landlord', 'Tenant',];
  allsignupdata: any;
  serverErrorMessage: string = '';
  isError: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private service: RegisterLoginService) {


  }

  ngOnInit(): void {

    this.Signup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: [''],
    });


  }

  signup() {
    this.allsignupdata = this.Signup.value
    console.log(this.Signup.value)
    this.service.register(this.Signup.value).subscribe((res: any) => {
      Swal.fire('Success', 'Congratulations! Your Account has been Successfully created.', 'success')
      this.Signup.reset();
      this.closeMenuEvent.emit();
      console.log(res)
    }, (err: HttpErrorResponse) => {
      this.closeMenuEvent.emit();
      Swal.fire('Sorry', err.error.message, 'error')
      this.handleHttpErrorResponse(err)
    })
  }


  handleHttpErrorResponse(err: any) {
    this.isError = true;
    this.serverErrorMessage = MessagesHelper.ServerErrorMessage;
    if (err.error instanceof Error) {
      console.log("Client-side error occured.", err);
    } else {
      console.log("Server-side error occured.", err);
    }
  }
}
