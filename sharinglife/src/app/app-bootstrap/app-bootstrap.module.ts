import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  exports: [
    ModalModule, TooltipModule
  ],
  declarations: []
})
export class AppBootstrapModule { }
