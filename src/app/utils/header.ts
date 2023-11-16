import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as $ from 'jquery';
import { Crypto } from "./crypto";
import { Table } from "./table";

@Injectable({
    providedIn: 'root'
})
export class Header {
    menuAsideOpen = new BehaviorSubject<boolean>(false);
    menuHeaderOpen = new BehaviorSubject<boolean>(false);

    constructor(
        private crypto: Crypto, 
        private table: Table,
    ) {

    }

    public get aside(): boolean {
        var a = localStorage.getItem('navigation') ? this.crypto.decrypt(localStorage.getItem('navigation')) as boolean : false;
        this.setMenuAside(a);
        return this.menuAsideOpen.value;
    }

    toggleMenuAside(): void {
        this.setMenuAside(!this.menuAsideOpen.value);
    }

    setMenuAside(value: boolean) {
        var encryted = this.crypto.encrypt(value) ?? '';
        localStorage.setItem('navigation', encryted);
        this.menuAsideOpen.next(value);
    }


    toggleMenuHeader(): void {
        this.menuHeaderOpen.next(!this.menuHeaderOpen.value);
    }

    openMenuHeader() {
        this.menuHeaderOpen.next(true);
    }

    closeMenuHeader() {
        this.menuHeaderOpen.next(false);
    }

    clickOut() {
        var classe = this;
        $('body').on('click', (e: any) => {
            // classe.setMenuAside(false);
            classe.closeMenuHeader();
        });
        
        $('.header__userLogado').on('click', (e: any) => {
            e.stopPropagation();
        });

        // $('.navigation__toggle').on('click', (e: any) => {
        //     e.stopPropagation();
        // });

        // $('.aside').on('click', (e: any) => {
        //     e.stopPropagation();
        // });
    }
}