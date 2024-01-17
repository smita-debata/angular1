import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signup } from '../Alljsondata';
import Swal from 'sweetalert2';
import { RegisterLoginService } from '../services/register-login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesHelper } from '../services/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() closeMenuEvent = new EventEmitter<void>();
  login!: FormGroup
  serverErrorMessage: string = '';
  isError: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private service: RegisterLoginService) { }
  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  loginForm() {
    this.service.login(this.login.value).subscribe((res: any) => {
      this.closeMenuEvent.emit();
      sessionStorage.setItem('AccessToken', res.token)
      this.getRoleFromUser();
    }, (err: HttpErrorResponse) => {
      this.closeMenuEvent.emit();
      Swal.fire('Sorry', err.error.message, 'error')
      this.handleHttpErrorResponse(err);
    })
  }
  getRoleFromUser() {
    this.service.getRolefromUser().subscribe((res: any) => {
      const role = res.role
      role.forEach((res: any) => {
        sessionStorage.setItem('Role', res.role)
        if (res) {
          if (res.role == 'ROLE_TENANT') {
            Swal.fire('Success', 'You logged  In As a Tenant!', 'success')
              .then(() => {
                this.login.reset();
                this.router.navigateByUrl('/tenant')
              })
          }
          else {
            this.closeMenuEvent.emit();
            Swal.fire('Success', 'You logged In As a Landlord!', 'success')
              .then(() => {
                this.login.reset();
                this.router.navigateByUrl('/landlord')
              })
          }

        }
        else {
          Swal.fire('Sorry', 'Invalid Email/Password!', 'error')
        }
      })
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
