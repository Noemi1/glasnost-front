import { Component, OnDestroy } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { Subscription, lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { EmpresaList, empresaColumns } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Table } from 'src/app/utils/table';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {
    faBars = faBars;
    columns = empresaColumns;
    list: EmpresaList[] = [];
    tableLinks: MenuTableLink[] = [];
    subscription: Subscription[] = [];

    constructor(
        private table: Table,
        public crypto: Crypto,
        public empresaService: EmpresaService,
        private mask: MaskApplierService,
    ) {
        var list = this.empresaService.list.subscribe(res => {
            this.list = Object.assign([], res);
        });
        this.subscription.push(list);

        this.table.currentPage.next(1);

        lastValueFrom(this.empresaService.getList())
        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                    { label: 'Exluir', routePath: ['excluir'], paramsFieldName: ['id'] },
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }
}
