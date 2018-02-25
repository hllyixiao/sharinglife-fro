import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
  public check = {
    name: true,
    phone: true,
    password: true
  };

  @ViewChild('registerform') registerform;

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

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
  }

  // 字段获取焦点
  focusEvent(strId) {
    const formCtl = this.registerInfo.get(strId);
    this.check[strId] = true;
    this.Timer[strId] = setTimeout(() => {
      this.setFocus(strId);
    }, 50);
  }

  setFocus(strId): void {
    this.registerform.nativeElement.querySelector('#' + strId).focus();
  }

  clientRegister() {
    if (!this.registerInfoHasError()) {
       this.registerService.clientRegister(this.registerInfo.value).subscribe(res => {
          console.log('register success');
       });
    }
  }

  // 验证注册信息填写是否正确
  registerInfoHasError(): Boolean {
    const nameErrors = !!this.registerInfo.get('name').errors;
    const phoneErrors = !!this.registerInfo.get('phone').errors;
    const passwordErrors = !!this.registerInfo.get('password').errors;
  //  const digitsErrors = this.registerInfo.get('digits').errors;
    return nameErrors || phoneErrors || passwordErrors; // || !!digitsErrors;
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
