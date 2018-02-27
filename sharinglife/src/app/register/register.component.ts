import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    password: null
  };
  private prompt = {
    name: false,
    phone: false
  };
  public check = {
    name: true,
    phone: true,
    password: true
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
            name: ['', Validators.required ],
            phone: ['', Validators.required ],
            password: ['', Validators.required ]
           // digits: ['', Validators.required ]
        });
  }

  // 字段失去焦点
  blurEvent(strId) {
    const formCtl = this.registerInfo.get(strId);
    if (formCtl.errors && formCtl.errors.required) {
        this.check[strId] = false;
    }
    if (strId === 'name' && !this.registerInfo.get('name').errors) {
      this.registerService.isExistname(this.registerInfo.get(strId).value).subscribe(isExist => {
        this.prompt.name = isExist;
      },
      error => { }
      );
    }
    if (strId === 'phone' && !this.registerInfo.get('name').errors) {
      this.registerService.isExistpho(this.registerInfo.get(strId).value).subscribe(isExist => {
        this.prompt.phone = isExist;
      },
      error => { }
      );
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
    if (this.prompt[strId]) { this.prompt[strId] = false; }
    this.registerform.nativeElement.querySelector('#' + strId).focus();
  }

  clientRegister() {
    if (!this.registerInfoHasError()) {
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
  //  const digitsErrors = this.registerInfo.get('digits').errors;
    return nameErrors || phoneErrors || passwordErrors || isExist; // || !!digitsErrors;
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
