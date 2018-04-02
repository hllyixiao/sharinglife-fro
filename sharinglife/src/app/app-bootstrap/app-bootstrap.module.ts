import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  exports: [
    ModalModule,
    TooltipModule,
    BsDropdownModule
  ],
  declarations: []
})
export class AppBootstrapModule { }
