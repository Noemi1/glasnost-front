import { Component, OnDestroy } from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { Empresa, EmpresaList } from 'src/app/models/empresa.model';
import { EmpresaSelected, EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-empresa-select',
    templateUrl: './empresa-select.component.html',
    styleUrls: ['./empresa-select.component.css'],

})
export class EmpresaSelectComponent implements OnDestroy {
    // empresaSelected = new Empresa;
    empresaSelected: EmpresaSelected = new EmpresaSelected;
   
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
            this.setFilter();
        });
        this.subscription.push(empresa);

        var list = this.empresaService.list.subscribe(res => {
            this.empresas = res;
        });
        this.subscription.push(list);


        // lastValueFrom(this.empresaService.getList())
        //     .then(res => {
        //         this.empresas = res;
        //     })
        //     .finally(() => this.loading = false);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    async empresaChange() { 
        if (this.empresaSelected.id) {
            if (this.empresas.length == 0) 
                await lastValueFrom(this.empresaService.getList());
            var empresa = this.empresas.find(x => x.id == this.empresaSelected.id) as EmpresaList;
            this.empresaService.empresaSelected.next({empresa, id: this.empresaSelected.id});
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
