import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Crypto } from './crypto';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MaskApplierService } from 'ngx-mask';
import { Column, FilterType, MaskType } from '../helpers/column.interface';
import { MenuTableLink } from '../helpers/menu-links.interface';

@Injectable({
    providedIn: 'root'
})
export class Table {

    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    selected: BehaviorSubject<any | undefined> = new BehaviorSubject<any | undefined>(undefined);

    currentPage = new BehaviorSubject<number>(0);


    constructor(
        private toastr: ToastrService,
        private crypto: Crypto,
        private currency: CurrencyPipe,
        private mask: MaskApplierService,
        private datePipe: DatePipe,
    ) {
    }

    initialize() {
        this.resetSelection();
    }

    resetSelection() {
        this.selected.next(undefined)
        this.fecharMenuTable();
    }

    onRowSelect(event: any) {
        let row: any = event.data;
        if (row != undefined) {
            this.selected.next(row);
            this.exibirMenuTable();
        }
    }

    onRowUnselect(event?: any) {
        this.selected.next(undefined)
        this.fecharMenuTable();
    }

    fecharMenuTable() {
        $('.actions__nav').css({
            'display': 'none',
            'opacity': 0,
            'visibility': 'hidden',
        });
    }


    exibirMenuTable() {
      setTimeout(() => {
        let tr = $('tr.selected'); 
        if (tr) {
            let td = $(tr).find('.td-actions');
            if (td) {
                let top = ($(td).offset()?.top ?? 0);
                let left = ($(td).offset()?.left ?? 0);
                $('.actions__nav').css({
                    'display': 'flex',
                    'top': top + 'px',
                    'left': left + 'px',
                    'opacity': 1,
                    'visibility': 'visible',
                });
            }
        }
      }, 10);
    }

    
    getCellData(row: any, col: Column): any {
        const nestedProperties: string[] = col.field.split('.');
        let value: any = row;
        
        for (const prop of nestedProperties) {
            value = value ? value[prop] ?? undefined : undefined;
        }
        if (col.maskType && value != undefined && value.toString().trim() != '') {
            if (col.maskType == MaskType.percentage) {
                value = this.currency.transform(value.toString(), 'BRL', '', col.decimal) + '%';
            } else if (col.maskType == MaskType.money) {
                value = this.currency.transform(value, 'BRL', col.moeda, col.decimal)
            } 
            else if (col.maskType == MaskType.cpfcnpj) {
                var pj = row['pj'];
                value = value.toString().padStart(pj ? 14 : 11);
                value = this.mask.applyMask(value, pj ? '00.000.000/0000-00' : '000.000.000-00');
            } 
            else if (col.maskType == MaskType.cnpj) {
                value = this.mask.applyMask(value.toString().padStart(14, '0'), '00.000.000/0000-00');
            } else if (col.maskType == MaskType.cpf) {
                value = this.mask.applyMask(value.toString().padStart(11, '0'), '000.000.000-00');
            } else if (col.maskType == MaskType.rg) {
                value = this.mask.applyMask(value.toString().padStart(9, '0'), '00.000.000-0');
            } else if (col.maskType == MaskType.any && col.mask) {
                value = this.mask.applyMask(value, col.mask);
            } else if (col.maskType == MaskType.date) {
                value = this.datePipe.transform(value, 'dd/MM/yyyy', 'UTC');
            } else if (col.maskType == MaskType.dateTime) {
                value = this.datePipe.transform(value, 'dd/MM/yyyy \'às\' hh\'h\'mm', 'UTC');
            } else if (col.maskType == MaskType.options) {
                value = col.values?.find(x => x.value == value).output;
            }
            else if (col.maskType == MaskType.telefoneCelular) {
                value = this.mask.applyMask(value.toString(), (value.toString().length == 10 ? '(00)  0000-0000' : '(00) 0.0000-0000' ))
            } else if (col.maskType == MaskType.substring) {
                if (col.substringLength && value.length > col.substringLength) {
                    value = value.substring(0, col.substringLength) + '...'
                }
            } else {
                return value ?? '-';
            }

            this.mask
        }
        return value ?? '-';
    }

    encryptParams(tableLinks: MenuTableLink[]) {
        return tableLinks.map(link => {
            if (link.paramsFieldName != undefined && link.paramsFieldName.length) {
                var paramnsMap = link.paramsFieldName.map(p => {
                    const nestedProperties: string[] = p.split('.');
                    let value: any = this.selected.value;
                    for (const prop of nestedProperties) {
                        value = value ? value[prop] ?? undefined : undefined;
                    }
                    return this.crypto.encrypt(value) ?? '';
                })
                link.fullRoute = [].concat(link.routePath as never[], paramnsMap as never[])
            } else {
                link.fullRoute = link.routePath;
            }
            return link;
        });
    }

    currentPageChange() {
        var classe = this;
        $('p-table').find('p-paginator').find('.p-paginator-pages').find('.p-paginator-page').unbind('click')
        $('p-table').find('p-paginator').find('.p-paginator-pages').find('.p-paginator-page').on('click', (e: any) => {
            let currentPage = parseInt($(e.target).text()) ?? 1;
            if(currentPage != this.currentPage.value) {
                this.onRowUnselect();
            }
            classe.currentPage.next(currentPage)
        })
    }
    
    goToCurrentPage() {
        setTimeout(() => {
            $('p-table').find('p-paginator').find('.p-paginator-pages').find(`.p-paginator-page:contains(${this.currentPage.value})`).trigger('click')
        }, 100);
    }

}
