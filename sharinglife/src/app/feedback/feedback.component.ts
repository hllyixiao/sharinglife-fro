import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as html2canvas from 'html2canvas';
import * as $ from 'jquery';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, AfterViewInit {
  public canvasImg: '';

  @ViewChild('feedBackcanvas') feedBackcanvas;

  constructor() { }

  ngOnInit() {
    $('#canvas').on('mousedown', function(e){
      const mouseX = e.pageX - this.offsetLeft;
      const mouseY = e.pageY - this.offsetTop;

      const paint = true;
    });
  }

  shotCanvas() {
    console.log($('#feedbackcanvas'));
    html2canvas(document.body).then(canvas => {
        canvas.setAttribute('id', 'canvas');
        // console.log(document.getElementById("feedbackcanvas"));
        this.feedBackcanvas.nativeElement.appendChild(canvas);
    });
  }


  ngAfterViewInit() {
    console.log(document.getElementById('#canvas'));
  }
}
