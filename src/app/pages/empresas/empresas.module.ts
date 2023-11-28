import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas.routing';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { DisabledComponent } from './disabled/disabled.component';

@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    DeleteComponent,
    DisabledComponent
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    SharedModule,
    FormsModule,
    FontAwesomeModule,
    NgxMaskModule.forChild(),
    RadioButtonModule,
    MultiSelectModule,
  ]
})
export class EmpresasModule { }
