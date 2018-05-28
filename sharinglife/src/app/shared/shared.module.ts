import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentComponent } from '../comment/comment.component';
import { CommentAddComponent } from '../comment-add/comment-add.component';

import { BooleanPipe } from './boolean.pipe';
import { SafePipePipe } from './safe-pipe.pipe';
import { OmitPipe } from './omit.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BooleanPipe,
    CommentComponent,
    CommentAddComponent,
    SafePipePipe,
    OmitPipe
  ],
  exports: [
    CommonModule,
    CommentComponent,
    CommentAddComponent,
    BooleanPipe,
    OmitPipe,
    SafePipePipe
  ]
})
export class SharedModule { }
