import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { LoginService } from '../core/login/login.service';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  public loginInfo: FormGroup;
  private Timer = {
    phoneOrName: null,
    password: null,
    verifyCode: null,
  };
  public check = {
    phoneOrName: true,
    password: true,
    verifyCode: true
  };
  public loginState = true;
  public loginErrorMsg = '';
  public showverifyCode = false;
  public verifyCodeImgSrc: SafeResourceUrl;


  @ViewChild('loginform') loginform;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private userService: UserService, private sanitizer: DomSanitizer) {
      this.verifyCodeImgSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAIAAACHGsgUAAACv0lEQVR42u3ZMU7dQBAGYPdwghwg
        B8gBoE9FF3EADoBQhJQT0KSlogsSr6CLhESDKHKLKNVrU9KTkUaarHZm/p1dr/2ewdYIPZt9T/an
        2fF4PTyvW3gbVoIVa8XaN6yX33+z8L6pR+rB3w++FSN4or++vlQF+Kk/93cSVcN2jxX0mggLeE2L
        1SYV8eLr/3Fz1V3KwzIHDLXJ0j2tIl5tWEfbDzNhpbvjscwTasOSg182l154UiaW6dUNy5RqwJIx
        4LKzIK9UBGx7h6W/Er/sNDBoOr8IK3I3qJIyvfpg0S7O/3haBYfVYnlScSzv+OBNLoAlB28/Hppj
        zj7/jM/BWixc2oGUVuiDpV3MMRqLmCiKKdNwKwx6NWOlLp2xeDfFEqaJ+oYIFpZKFXB32gFLDxCs
        lAlIHZ9sR0oBLJJqeMrBB91nwziW7BJWllAAy5O6OfoUxOIjZo0v5lQECxeysVjEFOzdtRSPxFIz
        YMWr/n8ss7cE/RQnlExD3BCQVDbg6fSCg7DkcxoAS3tFpIJYuPmqxpJ5x9NQY+mc8s7eS6vXxwcK
        E5GDsOQzSXnQwWWZzlipVPYv8gJpVSXFRhQ4rdLMMnMKKFMUH27AM1AUKyvkEayglDYaidWw4NcT
        SxdygHV9vpGKjrE8o+KCH3cP3CsEV7Kq1mQQlrdyIAkFHnrMzJJ7nydVZCqujnrd1m6wUiYwPTMs
        luLkMktSsVeISFFOmVhjFt0jK4I2ltzv8LO0h0V/yUuXpLjU/FiRYWNfhWVYUtTNsl2FhVdgggtb
        +/XeMMUiqdRIkqu7FGjlF/CSlXRYSt8ZO0pl2/KwOI+8loqxppBaElY63UDzyV4TYe17zdJlG0tx
        WmXF6+1jmW1kREpX+veSWQ1SWaV/j1hFqRWrUerNeA1T/Kh3+1u61zCb1IpVh7V0r2FOqaVv/wBP
        sf7dU0FbTwAAAABJRU5ErkJggg==`
      );
     }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginInfo = this.fb.group({
            phoneOrName: ['', Validators.required ],
            password: ['', Validators.required ],
            verifyCode: ''
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

  // 用户登录
  clientLogin() {
    if (!this.loginInfoHasError()) {
      if (this.loginInfo.get('verifyCode').value === '') { this.loginInfo.get('verifyCode').setValue('sharinglife'); }
       this.loginService.clientLogin(this.loginInfo.value).subscribe(resp => {
          if (resp.code === 1) {
            this.loginState = true;
            this.showverifyCode = false;
            this.userService.user = resp.user;
            this.router.navigate(['/home']);
          } else {
            this.loginState = false;
            this.showverifyCode = true;
            this.loginErrorMsg = resp.msg;
            this.loginInfo.get('verifyCode').setValidators([Validators.required]);
            this.changeverifyCode();
          }
       });
    }
  }

  // 获取验证码
  changeverifyCode(): void {
    console.log('1111');
    this.loginService.getVerifyCode().subscribe(resp => {
      console.log('2222');
        this.verifyCodeImgSrc = resp;
      },
    error => {
      console.log(this.verifyCodeImgSrc);
    });
  }

  // 验证注册信息填写是否正确
  loginInfoHasError(): Boolean {
    const phoneOrNameErrors = !!this.loginInfo.get('phoneOrName').errors;
    const passwordErrors = !!this.loginInfo.get('password').errors;
    const verifyCode = !!this.loginInfo.get('verifyCode').errors;
    return phoneOrNameErrors || passwordErrors || verifyCode;
  }

  ngAfterViewInit() {
    // this.setFocus('phoneNo');
  }

  ngOnDestroy() {
    if (this.Timer['phoneOrName']) { clearTimeout(this.Timer['phoneOrName']); }
    if (this.Timer['password']) { clearTimeout(this.Timer['password']); }
    if (this.Timer['verifyCode']) { clearTimeout(this.Timer['verifyCode']); }
  }

}
