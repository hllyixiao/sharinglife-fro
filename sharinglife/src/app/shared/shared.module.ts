import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooleanPipe } from './boolean.pipe';
import { SafePipePipe } from './safe-pipe.pipe';
import { OmitPipe } from './omit.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BooleanPipe, SafePipePipe, OmitPipe],
  exports: [
    CommonModule,
    BooleanPipe,
    OmitPipe,
    SafePipePipe
  ]
})
export class SharedModule { }
