import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

import { ArticleService } from '../core/article.service';
import { UserService } from '../core/user.service';

import { environment as env} from '../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

  public personalInfoForm: FormGroup;
  public imgData: any;
  public user;
  public envImgUrl = env.imgUrl;
  public cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined)cropper: ImageCropperComponent;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.cropperSettingsInit();
    this.createForm();
  }

  cropperSettingsInit() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.croppedWidth = 800;
    this.cropperSettings.croppedHeight = 800;
    this.cropperSettings.rounded = true;
    this.cropperSettings.keepAspect = true;
    this.cropperSettings.noFileInput = true;
    this.imgData = {};
  }

  createForm() {
    this.personalInfoForm = this.fb.group({
        alias: this.user ? this.user.name : '',
        sex: this.user ? this.user.sex : '1',
        phone: [this.user ? this.user.phone : '', Validators.required ],
        email: this.user ? this.user.email : '',
        motto: this.user ? this.user.motto : ''
    });
}

  fileChangeListener($event) {
    const that = this;
    const image: any = new Image();
    const myReader: FileReader = new FileReader();
    const file: File = $event.target.files[0];
    const avatarImgName = file.name;
    let avatarImgType = 'image/jpg';
    myReader.onloadend = function (loadEvent: any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
        avatarImgType = 'image/' + _.last(file.name.split('.'));
        const formData = new FormData(that.personalInfoForm.value);
        formData.append('avatar', that.getBlobBydataURI(that.imgData.image, avatarImgType), avatarImgName);
        that.articleService.setavatar(formData).subscribe(
          resp => console.log('updatePersonalInfo')
        );
    };
    myReader.readAsDataURL(file);
  }

  submit() {
    this.articleService.updateUser(this.personalInfoForm.value).subscribe(
      resp => console.log('updatePersonalInfosub')
    );
  }

  // base64字符串转换为Blob对象（二进制大对象）
  getBlobBydataURI(dataURI, type) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: type });
  }
}
