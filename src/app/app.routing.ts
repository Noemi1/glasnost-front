import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// const account = () => import('./pages/account/account.module').then(res => res.AccountModule);
const initial = () => import('./pages/initial/initial.module').then(res => res.InitialModule);

const routes: Routes = [
    // { path: 'account', loadChildren: account },
    { path: '', loadChildren: initial /*, canActivate: [AuthGuard]*/ },
    // { path: '**', redirectTo: '', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
