import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: FormComponent },
        { path: 'editar/:id', component: FormComponent },
        { path: 'excluir/:id', component: DeleteComponent },
        { path: 'habilitar/:id', component: DeleteComponent },
        { path: 'desabilitar/:id', component: DeleteComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasEmpresasRoutingModule { }
