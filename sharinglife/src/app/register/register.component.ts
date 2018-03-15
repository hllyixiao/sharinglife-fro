import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { RegisterService } from '../core/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  public registerInfo: FormGroup;
  private Timer = {
    name: null,
    phone: null,
    password: null,
  };
  // 判断信息是否已被注册
  private prompt = {
    name: false,
    phone: false,
    verityPassword: false
  };

  // 控制提示信息显示
  public formErrors = {
    name: '',
    phone: '',
    password: '',
  };

  // 验证失败错误信息提示
  public validationMessages = {
    name: {
      required: '请输入昵称',
      maxlength: '昵称不能超过10位'
    },
    phone: {
      required: '请输入手机号',
      pattern: '请输入正确格式的手机号'
    },
    password: {
      required: '请输入密码',
      minlength: '密码长度6 ~ 12位',
      maxlength: '密码长度6 ~ 12位'
    }
  };

  @ViewChild('registerform') registerform;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
    ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerInfo = this.fb.group({
            name: ['', [ Validators.required, Validators.maxLength(10) ]],
            phone: ['', [ Validators.required, Validators.pattern(/^1[0-9]{10}$/)]], //  /^1[3-578]\d{9}$/
            password: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(12) ]],
            verityPassword: ['', Validators.required ]
        });
  }

  // 字段失去焦点
  blurEvent(strId) {
    const formCtl = this.registerInfo.get(strId);
    this.formErrors[strId] = '';
    for (const key in formCtl.errors) {
        if (formCtl.errors) {
          this.formErrors[strId] = this.validationMessages[strId][key];
          break;
      }
    }

    if (strId === 'name' && !this.registerInfo.get('name').errors) {
      this.registerService.isExistname(this.registerInfo.get(strId).value).subscribe(isExist => {
        this.prompt.name = isExist;
      },
      error => { }
      );
    }
    if (strId === 'phone' && !this.registerInfo.get('phone').errors) {
      this.registerService.isExistpho(this.registerInfo.get(strId).value).subscribe(isExist => {
        this.prompt.phone = isExist;
      },
      error => { }
      );
    }
  }

  // 隐藏提示语
  hidePrompt(strId) {
    if (this.prompt[strId]) { this.prompt[strId] = false; }
  }

  // 字段获取焦点
  focusEvent(strId) {
    this.prompt[strId] = false;
    this.formErrors[strId] = '';
    this.Timer[strId] = setTimeout(() => {
      this.setFocus(strId);
    }, 50);
  }

  setFocus(strId): void {
    if (this.prompt[strId]) { this.prompt[strId] = false; }
    this.registerform.nativeElement.querySelector('#' + strId).focus();
  }

  clientRegister() {
    if (!this.registerInfoHasError()) {
       this.registerInfo.value.password = Md5.hashStr(this.registerInfo.value.password).toString();
       delete this.registerInfo.value['verityPassword'];
       this.registerService.clientRegister(this.registerInfo.value).subscribe(data => {
          if (!this.prompt.name && !this.prompt.phone) {
            this.router.navigate(['/login']);
          }
       },
       error => { }
       );
    }
  }

  // 验证注册信息填写是否正确
  registerInfoHasError(): Boolean {
    const nameErrors = !!this.registerInfo.get('name').errors;
    const phoneErrors = !!this.registerInfo.get('phone').errors;
    const passwordErrors = !!this.registerInfo.get('password').errors;
    const isExist = this.prompt.name || this.prompt.phone;
    const passwordSame = this.registerInfo.get('password').value === this.registerInfo.get('verityPassword').value;
    if (passwordSame) {
      this.prompt.verityPassword = false;
      // this.registerInfo.removeControl('verityPassword');
    } else {
      this.prompt.verityPassword = true;
    }
    return nameErrors || phoneErrors || passwordErrors || isExist || !passwordSame;
  }

  ngAfterViewInit() {
    // this.setFocus('phone');
  }

  ngOnDestroy() {
    if (this.Timer['name']) { clearTimeout(this.Timer['name']); }
    if (this.Timer['phone']) { clearTimeout(this.Timer['phone']); }
    if (this.Timer['password']) { clearTimeout(this.Timer['password']); }
  }
}
