import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcionistasRoutingModule } from './acionistas.routing';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { AcionistasComponent } from './acionistas.component';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    AcionistasRoutingModule
  ],
  bootstrap: [AcionistasComponent]
})
export class AcionistasModule { }
