import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularCropperjsComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  imageUrl = '/assets/img/show.jpg';
  config: any;
  @ViewChild('angularCropper') public Cropper: AngularCropperjsComponent;

  constructor() { }

  ngOnInit() {
    this.config = {
        minContainerHeight :  200,
        minContainerWidth : 200,
        autoCropArea: 1,
        aspectRatio: 150 / 120, // 裁剪框比例 1：1
        viewMode : 1, // 显示
        guides : false, // 裁剪框虚线 默认true有
        dragMode : 'move',
        build: function (e) { // 加载开始
            // 可以放你的过渡 效果
        },
        built: function (e) { // 加载完成
        },
        zoom: function (e) {
          console.log(e.type, e.detail.ratio);
        },
        background : false, // 容器是否显示网格背景
        movable : false, // 是否能移动图片
        cropBoxMovable : true, // 是否允许拖动裁剪框
        cropBoxResizable : true, // 是否允许拖动 改变裁剪框大小
    }
  }

}
