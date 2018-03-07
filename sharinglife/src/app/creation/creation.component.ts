import { Component, OnInit } from '@angular/core';
import * as Editor from 'wangEditor';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  public editorContent;
  constructor() { }

  ngOnInit() {

  }
}
