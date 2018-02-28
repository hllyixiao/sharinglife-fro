import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooleanPipe } from './boolean.pipe';
import { SafePipePipe } from './safe-pipe.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BooleanPipe, SafePipePipe],
  exports: [
    CommonModule,
    BooleanPipe,
    SafePipePipe
  ]
})
export class SharedModule { }
