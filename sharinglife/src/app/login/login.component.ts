import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { AuthService } from '../core/auth.service';
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
  public verifyCodeImgSrc;


  @ViewChild('loginform') loginform;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private auth: AuthService,
    private userService: UserService) { }

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
       this.loginInfo.value.password = Md5.hashStr(this.loginInfo.value.password).toString();
       this.loginService.clientLogin(this.loginInfo.value).subscribe(resp => {
          if (resp.statusCode === 1) {
            this.loginState = true;
            this.showverifyCode = false;
            this.userService.user = resp.user;
            this.auth.updateJwtUserCookie(resp.user.name);
            this.router.navigate(['/home']);
          } else {
            this.loginState = false;
            this.loginErrorMsg = resp.msg;
            this.loginInfo.get('verifyCode').setValidators([Validators.required]);
            this.showverifyCode = true;
            this.changeverifyCode();
          }
       });
    }
  }

  // 获取验证码
  changeverifyCode(): void {
    this.loginService.getVerifyCode().subscribe(
      resp => {
        this.verifyCodeImgSrc = resp.verifyCodeImg;
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
