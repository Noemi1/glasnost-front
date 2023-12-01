import { Component, OnDestroy } from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { Empresa, EmpresaList } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-empresa-select',
    templateUrl: './empresa-select.component.html',
    styleUrls: ['./empresa-select.component.css'],

})
export class EmpresaSelectComponent implements OnDestroy {
    // empresaSelected = new Empresa;
    empresaSelected: any = {};
    empresaSelectedId = 0;
    empresas: EmpresaList[] = [];
    loading = false;
    account?: Account;
    Role = Role;
    subscription: Subscription[] = [];

    constructor(
        private empresaService: EmpresaService,
    ) {
        var empresa = this.empresaService.empresaSelected.subscribe(res => {
            this.empresaSelected = res;
            this.empresaSelectedId = res.id;
            this.setFilter();
        });
        this.subscription.push(empresa);

        lastValueFrom(this.empresaService.getList())
            .then(res => {
                this.empresas = res;
                this.setFilter();
            })
            .finally(() => this.loading = false);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    empresaChange() { 
        console
        if (this.empresaSelectedId) {
            var empresa = this.empresas.find(x => x.id == this.empresaSelectedId) as EmpresaList;
            this.empresaService.empresaSelected.next(empresa);
        }
    }



    setFilter(){
        const distantFuture = new Date(8640000000000000)
        const firstSort = 'due_date'
        this.empresas = this.empresas.sort((x, y) => {
            let dateA = x.dataDesativado ? new Date(x.dataDesativado) : distantFuture;
            let dateB = y.dataDesativado ? new Date(y.dataDesativado) : distantFuture;

            if (x.dataDesativado && y.dataDesativado) 
                return 1
            else
                return -1;


                
            // if (x.nome < y.nome) return -1
            // else if (x.nome > y.nome) return 1
            // else return 0
            // return dateB.getTime() - dateA.getTime()

        })
    }

}
