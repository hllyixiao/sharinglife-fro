import { Component, OnInit, ViewChild } from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  imageUrl = '/assets/img/show.jpg';
  config: any;
  constructor() { }

  ngOnInit() {
    const img = new Image();
    img.src =  this.imageUrl;
    const cropper = new Cropper(img, {center: true});
  }

}

// 1.去除文章中的空格计数
