import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasEmpresasRoutingModule } from './pessoas-empresas.routing';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [
        ListComponent,
        FormComponent,
        DeleteComponent,
    ],
    imports: [
        CommonModule,
        PessoasEmpresasRoutingModule,
        SharedModule,
        FormsModule,
        FontAwesomeModule,
        NgxMaskModule.forChild()
    ],
    bootstrap: [ListComponent]
})
export class PessoasEmpresasModule { }
