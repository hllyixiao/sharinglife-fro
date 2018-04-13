import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

import * as _ from 'lodash';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

  public personalInfoForm: FormGroup;
  public data: any;
  public cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined)cropper:ImageCropperComponent;

  constructor(
    private fb: FormBuilder) { }

  ngOnInit() {
    this.cropperSettingsInit();
    this.createForm();
  }

  cropperSettingsInit(){
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.croppedWidth = 800;
    this.cropperSettings.croppedHeight = 800;
    this.cropperSettings.rounded = true;
    this.cropperSettings.keepAspect = true;
    this.cropperSettings.noFileInput = true;
    this.data = {};
  }

  createForm() {
    this.personalInfoForm = this.fb.group({
            alias: '',
            sex: '1',
            phone: ['', Validators.required ],
            email: '',
            motto: ''
        });
  }

  fileChangeListener($event) {
    const that = this;
    const image:any = new Image();
    const myReader:FileReader = new FileReader();
    const file:File = $event.target.files[0];
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
        console.log(_.last(file.name.split('.')));
    };
    myReader.readAsDataURL(file);
  }

  submit() {
    let formData = new FormData(this.personalInfoForm.value);
    formData.append("files", this.getBlobBydataURI(this.data.image,'image/png'));
  }

  getBlobBydataURI(dataURI,type) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type:type });
  }
}
