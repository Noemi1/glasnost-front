import { Component, OnDestroy } from '@angular/core';
import { faBars, faList } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { Subscription, lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { EmpresaList } from 'src/app/models/empresa.model';
import { Pessoa, pessoaColumns } from 'src/app/models/pessoa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Table } from 'src/app/utils/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {
    faBars = faBars;
    columns = pessoaColumns;
    list: Pessoa[] = [];
    tableLinks: MenuTableLink[] = [];
    subscription: Subscription[] = [];
    empresaSelected?: EmpresaList;

    constructor(
        private table: Table,
        public crypto: Crypto,
        public pessoaService: PessoaService,
        private empresaService: EmpresaService,
    ) {
        var list = this.pessoaService.list.subscribe(res => this.list = res);
        this.subscription.push(list);

        var empresa = this.empresaService.empresaSelected.subscribe(async res => {
            this.empresaSelected = res.empresa;
            if (res.id) {
                await lastValueFrom(this.pessoaService.getList(res.id));
            }
        });
        this.subscription.push(empresa);
        

        this.table.currentPage.next(1);

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] }, 
                    { label: 'Exluir', routePath: ['excluir'], paramsFieldName: ['id'] }, 
                ];
                
                if (res.ativo.value) {
                    this.tableLinks.push({ label: 'Desabilitar', routePath: ['desabilitar'], paramsFieldName: ['id'] })
                } else {
                    this.tableLinks.push({ label: 'Habilitar', routePath: ['habilitar'], paramsFieldName: ['id'] })
                }
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);  

    }
    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }
}
