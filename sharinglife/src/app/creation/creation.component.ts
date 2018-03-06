import { Component, OnInit } from '@angular/core';
import * as Editor from 'wangEditor';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  const editor = new Editor('#editor');
        editor.create();
    console.log(editor);
  }

}
