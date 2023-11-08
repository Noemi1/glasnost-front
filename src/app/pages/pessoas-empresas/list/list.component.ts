import { Component } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { Subscription, lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Pessoa, pessoaColumns } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Table } from 'src/app/utils/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
    faList = faList;
    columns = pessoaColumns;
    list: Pessoa[] = [];
    tableLinks: MenuTableLink[] = [];
    subscription: Subscription[] = [];

    constructor(
        private table: Table,
        public crypto: Crypto,
        public pessoaService: PessoaService,
        private mask: MaskApplierService,
    ) {
        var list = this.pessoaService.list.subscribe(res => {
            this.list = res.map(x => {
                x.documento = this.mask.applyMask(x.documento.toString().padStart(x.pj ? 14 : 11, '0'), '000.000.000-00||00.000.000/0000-00' ) as unknown as number;
                return x;
            })
        });
        this.subscription.push(list);

        this.table.currentPage.next(1);

        lastValueFrom(this.pessoaService.getList())
        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] }, 
                    { label: 'Exluir', routePath: ['excluir'], paramsFieldName: ['id'] }, 
                    { label: 'Desabilitar', routePath: ['desabilitar'], paramsFieldName: ['id'] }, 
                    { label: 'Habilitar', routePath: ['desabilitar'], paramsFieldName: ['id'] }, 
                ];

            }
        });
        this.subscription.push(selected);  

    }
}
