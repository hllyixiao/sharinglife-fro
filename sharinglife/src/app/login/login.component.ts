import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginService } from '../core/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  public loginInfo: FormGroup;
  public validPhoneNo = true;
  public validDigits = true;
  private phoneTimer;
  private digitsTimer;

  @ViewChild('loginform') loginform;

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginInfo = this.fb.group({
            phoneNo: ['', Validators.required ],
            digits: ['', Validators.required ]
        });
  }

  blurEvent(str) {
    const cphoneNo = this.loginInfo.get('phoneNo');
    const cdigits = this.loginInfo.get('digits');
    if (str === 'phoneNo') {
        if (cphoneNo.errors && !!cphoneNo.errors.required) {
            this.validPhoneNo = false;
        }
    } else {
        if (cdigits.errors && !!cdigits.errors.required) {
            this.validDigits = false;
        }
    }
  }

  focusEvent(str) {
    const cphoneNo = this.loginInfo.get('phoneNo');
    const cdigits = this.loginInfo.get('digits');
    if (str === 'phoneNo') {
        this.validPhoneNo = true;
        this.phoneTimer = setTimeout(() => {
            this.setFocus(str);
        }, 50);
    } else {
        this.validDigits = true;
        this.phoneTimer = setTimeout(() => {
            this.setFocus(str);
        }, 50);
    }
  }

  setFocus(focusFlag): void {
    if (focusFlag === 'phoneNo') {
       this.loginform.nativeElement.querySelector('#phoneNo').focus();
    }else {
       this.loginform.nativeElement.querySelector('#digits').focus();
    }
  }

  clientLogin() {
    if (!this.loginInfoHasError()) {
       this.loginService.clientLogin(this.loginInfo.value).subscribe();
    }
  }

  // 验证注册信息填写是否正确
  loginInfoHasError(): Boolean {
    const phoneNoErrors = this.loginInfo.get('phoneNo').errors;
    const digitsErrors = this.loginInfo.get('digits').errors;
    return !!phoneNoErrors || !!digitsErrors;
  }

  ngAfterViewInit() {
    // this.setFocus('phoneNo');
  }

  ngOnDestroy() {
    if (this.phoneTimer) { clearTimeout(this.phoneTimer); }
    if (this.digitsTimer) { clearTimeout(this.digitsTimer); }
  }

}
