import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooleanPipe } from './boolean.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BooleanPipe],
  exports: [
    CommonModule,
    BooleanPipe
  ]
})
export class SharedModule { }
