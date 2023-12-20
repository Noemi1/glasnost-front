import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { DisabledComponent } from './disabled/disabled.component';

const routes: Routes = [
    { path: '', component: ListComponent, title: 'ToComply - Empresas' , children: [
        { path: 'cadastrar', component: FormComponent,                   title: 'ToComply - Cadastrar empresa' },
        { path: 'editar/:empresa_id', component: FormComponent,                  title: 'ToComply - Editar empresa' },
        { path: 'excluir/:empresa_id', component: DeleteComponent,               title: 'ToComply - Excluir empresa' },
        { path: 'habilitar/:empresa_id', component: DisabledComponent,   title: 'ToComply - Habilitar empresa'},
        { path: 'desabilitar/:empresa_id', component: DisabledComponent, title: 'ToComply - Desabilitar empresa' },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
