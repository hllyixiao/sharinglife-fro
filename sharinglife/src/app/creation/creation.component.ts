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
  public showContentPlaceholder = true;

  constructor() { }

  ngOnInit() {
    this.initWangEditor();
  }

  initWangEditor() {
    const editor = new Editor('#creation-write');
    const thisComp = this;
    editor.customConfig.menus = EditorConfig.wangEditorConfig.menus;
    editor.customConfig.onchange = function (html) {
      thisComp.showContentPlaceholder = html === '<p><br></p>' ? true : false;
      thisComp.createArticle(html);
    };
    editor.create();
  }

  createArticle(html) {}

  stopDefaultBehavior($event: any) {
    if ($event.keyCode === 13) {
      $event.preventDefault();
    }
  }
}
