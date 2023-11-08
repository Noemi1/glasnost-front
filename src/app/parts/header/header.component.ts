import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { faIdCard, faKey, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { AlertService } from '../alert/alert.service';
import { Header } from 'src/app/utils/header';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, AfterViewInit {
    Role = Role;
    faSignOut = faSignOut;
    faIdCard = faIdCard;
    faKey = faKey;
    faUser = faUser;
    menuHeaderOpen = false;
    userLogado?: Account;
    nomeAbreviado = '';
    perfil = '';
    subscription: Subscription[] = [];

    constructor(
        private header: Header,
        private alertService: AlertService,
        
    ) {
        this.nomeAbreviado = 'Noemi C. Almeida'
        var menuHeaderOpen = this.header.menuHeaderOpen.subscribe(res => this.menuHeaderOpen = res);
        this.subscription.push(menuHeaderOpen);


    }

ngAfterViewInit(): void {
    this.header.clickOut();
}
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }


    toggleMenuHeader(): void {
        this.header.toggleMenuHeader();
    }

    sair() {
    }


}
