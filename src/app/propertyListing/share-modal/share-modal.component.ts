import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent {
  receivedId: any;
  fullUrl: any
  constructor(public modalRef: BsModalRef, private router: Router, private dialogRef: MatDialogRef<ShareModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any, @Inject(DOCUMENT) private document: Document,) {
    this.receivedId = data
    const baseUrl = this.document.baseURI;
    this.fullUrl = baseUrl + "#" + '/PropertyOverview?id=' + data.id

  }

  ngOnInit(): void {

  }
  shareOnInstagram(): void {
    const username = 'jilany_18';
    const signupUrl = 'https://www.instagram.com/accounts/emailsignup/';
    window.open(signupUrl, '_blank');
  }
}

