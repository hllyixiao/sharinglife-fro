import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class CommonFunctionService {
  options = {
    aspectRatio: 1, // 宽/高 剪切比列
    canvasWidth: 300, // 默认画板宽度
    canvasHeight: 150
  };
  constructor() { }

  cropperImage (imageObj, sourceOptions, imageSrc: string) {
    _.merge(this.options , sourceOptions);
    const that = this;
    const drawIma = { sx: 0, sy: 0, sw: 0, sh: 0, dx: 0, dy: 0, dw: 0, dh: 0};
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous'); // 允许图片跨域
    image.src = imageSrc;

    const canvas = document.createElement('canvas');
    canvas.width = this.options.canvasWidth;
    canvas.height = this.options.canvasHeight;
    const ctx = canvas.getContext('2d');

    image.onload = function(){
      if ( image.width / image.height > that.options.aspectRatio) { // width/height > aspectRatio
        drawIma.sx = (image.width - image.height * that.options.aspectRatio) / 2;
        drawIma.sy = 0;
        drawIma.sw = image.width - 2 * drawIma.sx;
        drawIma.sh = image.height;
        drawIma.dx = 0;
        drawIma.dy = 0;
        drawIma.dw = that.options.canvasWidth;
        drawIma.dh = that.options.canvasHeight;
      }else {  // width/height <= aspectRatio
        drawIma.sx = 0;
        drawIma.sy = (image.height - image.width / that.options.aspectRatio) / 2;
        drawIma.sw = image.width;
        drawIma.sh = image.height - 2 * drawIma.sy ;
        drawIma.dx = 0;
        drawIma.dy = 0;
        drawIma.dw = that.options.canvasWidth;
        drawIma.dh = that.options.canvasHeight;
      }
      ctx.drawImage(image, drawIma.sx, drawIma.sy, drawIma.sw, drawIma.sh, drawIma.dx, drawIma.dy, drawIma.dw, drawIma.dh);
      imageObj['cropperImg'] = canvas.toDataURL(_.last(imageSrc.split('.')));
    };
    return imageObj;
  }
}
