import { Component, OnDestroy } from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
// import { Empresa } from 'src/app/models/empresa.model';
// import { AccountService } from 'src/app/services/account.service';
// import { DropdownService } from 'src/app/services/dropdown.service';
// import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-empresa-select',
    templateUrl: './empresa-select.component.html',
    styleUrls: ['./empresa-select.component.css'],

})
export class EmpresaSelectComponent implements OnDestroy {
    // empresaSelected = new Empresa;
    empresaSelected: any = {};
    empresaSelectedId = 0;
    empresas: any[] = [];
    // empresas: Empresa[] = [];
    loading = false;
    account?: Account;
    Role = Role;
    subscription: Subscription[] = [];

    constructor(
        // private empresaService: EmpresaService,
        // private accountService: AccountService,
        // private dropdownService: DropdownService,
    ) {
        // var empresa = this.empresaService.empresa.subscribe(res => {
        //     this.empresaSelected = res;
        //     this.empresaSelectedId = res.id;
        // });
        // this.subscription.push(empresa);

        // lastValueFrom(this.dropdownService.getEmpresas())
        //     .then(res => this.empresas = res);

        // var account = this.accountService.account.subscribe(async res => {
        //     this.account = res;
        //     if (res && res.role && (this.empresaSelected == undefined || this.empresaSelectedId == 0)) 
        //         this.empresaService.setObject(res.empresa ?? new Empresa, 'app-empresa-selected');
        // })
        // this.subscription.push(account);
    }

    ngOnDestroy(): void {
        // this.subscription.forEach(item => item.unsubscribe());
    }

    empresaChange() {
        // var empresa = this.empresas.find(x => x.id == this.empresaSelectedId);
        // this.empresaService.setObject(empresa ?? new Empresa, 'empresaChange');
    }

}
