import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
    phone: null,
    password: null,
    verifycode: null,
  };
  public check = {
    phone: true,
    password: true,
    verifycode: true
  };
  public loginState = true;
  public loginErrorMsg = '';
  public showVerifyCode = false;
  public verifyCodeImgSrc = '/assets/img/code.png';

  @ViewChild('loginform') loginform;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginInfo = this.fb.group({
            phone: ['', Validators.required ],
            password: ['', Validators.required ],
            verifycode: ''
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
       this.loginService.clientLogin(this.loginInfo.value).subscribe(resp => {
          if (resp.code === 1) {
            this.loginState = true;
            this.showVerifyCode = false;
            this.userService.user = resp.user;
            this.router.navigate(['/home']);
          } else {
            this.loginState = false;
            this.showVerifyCode = true;
            this.loginErrorMsg = resp.msg;
            this.loginInfo.get("verifycode").setValidators([Validators.required]);
            this.changeVerifyCode();
          }
       });
    }
  }

  // 获取验证码
  changeVerifyCode(): void {
    this.loginService.getVerifyCode().subscribe(resp => {
        this.verifyCodeImgSrc = resp;
      })
  }

  // 验证注册信息填写是否正确
  loginInfoHasError(): Boolean {
    const phoneErrors = !!this.loginInfo.get('phone').errors;
    const passwordErrors = !!this.loginInfo.get('password').errors;
    const verifycode = !!this.loginInfo.get("verifycode").errors;
    return phoneErrors || passwordErrors || verifycode;
  }

  ngAfterViewInit() {
    // this.setFocus('phoneNo');
  }

  ngOnDestroy() {
    if (this.Timer['phone']) { clearTimeout(this.Timer['phone']); }
    if (this.Timer['password']) { clearTimeout(this.Timer['password']); }
    if (this.Timer['verifycode']) { clearTimeout(this.Timer['verifycode']); }
  }

}
