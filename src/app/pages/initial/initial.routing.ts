import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './initial.component';

const acionistas = () => import('../acionistas/acionistas.module').then(res => res.AcionistasModule);
const pessoas = () => import('../pessoas-empresas/pessoas-empresas.module').then(res => res.PessoasEmpresasModule);

const routes: Routes = [
    { path: '', component: InitialComponent, children: [
        { path: 'acionistas', loadChildren: acionistas },
        { path: 'pessoas-empresas', loadChildren: pessoas },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialRoutingModule { }
