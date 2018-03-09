import { Component, OnInit } from '@angular/core';
import * as Editor from 'wangEditor';

import { EditorConfig } from '../_models/editor-config';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  public editorContent;

  constructor() { }

  ngOnInit() {
    var editor = new Editor('#creation-write');
    editor.customConfig.menus = EditorConfig.wangEditorConfig.menus;
    editor.create()
    console.log('chup');
  }
}
