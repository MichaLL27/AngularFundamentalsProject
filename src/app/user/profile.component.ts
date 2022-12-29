import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
      .error ::-moz-placeholder {
        color: #999;
      }
      .error :-moz-placeholder {
        color: #999;
      }
      .error :-ms-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  myGroup!: FormGroup;
  private firstName!: FormControl;
  private lastName!: FormControl;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.firstName = new FormControl(
      this.authService.currentUser?.firstName,
      Validators.required
    );
    this.lastName = new FormControl(
      this.authService.currentUser?.lastName,
      Validators.required
    );
    this.myGroup = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  saveProfile(formValues: any): void {
    if (this.myGroup.valid) {
      this.authService.updateCurrentUser(
        formValues.firstName,
        formValues.lastName
      );
      this.router.navigate(['events']);
    }
  }

  cancel() {
    this.router.navigate(['events']);
  }
  validateFirstName() {
    return this.firstName.invalid || this.firstName.untouched;
  }
  validateLastName() {
    return this.lastName.invalid || this.lastName.untouched;
  }
}
