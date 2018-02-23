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
  public validPhoneNo = true;
  public validDigits = true;
  private phoneTimer;
  private digitsTimer;

  @ViewChild('registerform') registerform;

  
  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  ngOnInit() {
  	this.createForm();
  }

  createForm() {
  	this.registerInfo = this.fb.group({
  			phoneNo: ['', Validators.required ],
  			digits: ['', Validators.required ]
  		})
  }

  blurEvent(str) {
  	const cphoneNo = this.registerInfo.get("phoneNo");
  	const cdigits = this.registerInfo.get("digits");
  	if(str === 'phoneNo') {
  		if(cphoneNo.errors && !!cphoneNo.errors.required) {
  			this.validPhoneNo = false;
  		}
  	}else {
  		if(cdigits.errors && !!cdigits.errors.required) {
  			this.validDigits = false;
  		}
  	}
  }

  focusEvent(str) {
  	const cphoneNo = this.registerInfo.get("phoneNo");
  	const cdigits = this.registerInfo.get("digits");
	if(str === 'phoneNo') {
  		this.validPhoneNo = true;
  		this.phoneTimer = setTimeout(() => {
  			this.setFocus(str);
  		}, 50);
  	}else {
  		this.validDigits = true;
  		this.phoneTimer = setTimeout(() => {
  			this.setFocus(str);
  		}, 50);
  	}
  }

  setFocus(focusFlag): void {
  	if(focusFlag === 'phoneNo') {
		this.registerform.nativeElement.querySelector("#phoneNo").focus();
  	}else {
  		this.registerform.nativeElement.querySelector("#digits").focus();
  	}
  }

  clientRegister() {
  	if(!this.registerInfoHasError()) return;
  	this.registerService.clientRegister(this.registerInfo.value);
  }
 
 // 注册信息填写是否通过
  registerInfoHasError(): Boolean {
  	const phoneNoErrors = this.registerInfo.get("phoneNo").errors;
  	const digitsErrors = this.registerInfo.get("digits").errors;
  	return !phoneNoErrors && !digitsErrors;
  }

  ngAfterViewInit() {
  	// this.setFocus('phoneNo');
  }

  ngOnDestroy() {
  	if(this.phoneTimer) clearTimeout(this.phoneTimer);
  	if(this.digitsTimer) clearTimeout(this.digitsTimer);
  }
}
