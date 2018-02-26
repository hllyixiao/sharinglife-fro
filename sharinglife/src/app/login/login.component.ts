import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../core/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  public loginInfo: FormGroup;
  private Timer = {
    phone: null,
    password: null
  };
  public check = {
    phone: true,
    password: true
  };

  @ViewChild('loginform') loginform;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginInfo = this.fb.group({
            phone: ['', Validators.required ],
            password: ['', Validators.required ]
        });
  }

  // 字段失去焦点
  blurEvent(strId) {
    const formCtl = this.loginInfo.get(strId);
    if (formCtl.errors && formCtl.errors.required) {
        this.check[strId] = false;
    }
  }

  // 字段获取焦点
  focusEvent(strId) {
    this.check[strId] = true;
    this.Timer[strId] = setTimeout(() => {
      this.setFocus(strId);
    }, 50);
  }

  setFocus(strId): void {
    this.loginform.nativeElement.querySelector('#' + strId).focus();
  }

  clientLogin() {
    if (!this.loginInfoHasError()) {
       this.loginService.clientLogin(this.loginInfo.value).subscribe(resp => {
          this.router.navigate(['/home']);
       });
    }
  }

  // 验证注册信息填写是否正确
  loginInfoHasError(): Boolean {
    const phoneNoErrors = !!this.loginInfo.get('phone').errors;
    const digitsErrors = !!this.loginInfo.get('password').errors;
    return phoneNoErrors || digitsErrors;
  }

  ngAfterViewInit() {
    // this.setFocus('phoneNo');
  }

  ngOnDestroy() {
    if (this.Timer['phone']) { clearTimeout(this.Timer['phone']); }
    if (this.Timer['password']) { clearTimeout(this.Timer['password']); }
  }

}
