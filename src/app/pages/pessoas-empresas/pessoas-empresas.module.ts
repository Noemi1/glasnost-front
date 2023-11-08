import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasEmpresasRoutingModule } from './pessoas-empresas.routing';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    DeleteComponent,
    DeactivatedComponent
  ],
  imports: [
    CommonModule,
    PessoasEmpresasRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  bootstrap: [ListComponent]
})
export class PessoasEmpresasModule { }
