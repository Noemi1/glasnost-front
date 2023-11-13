import { AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Column, MaskType } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Role } from 'src/app/models/account-perfil.model';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-list-shared',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListSharedComponent implements OnDestroy, OnChanges, AfterViewInit, AfterViewChecked {
    maskType = MaskType;
    faFilter = faFilter;
    faTimes = faTimes;
    faEllipsisV = faEllipsisV;

    @Input() list: any[] = [];
    @Input() filterLink = true;
    @Input() filterTable = true;
    @Input() paginator: boolean = true;
    @Input() sortTable = true;
    @Input() menuTable = true;
    @Input() createLink: string[] = [];
    @Input() canCreate = true;
    @Input() selectable = true;
    @Input() columns = [{ field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },];
    @Input() tableLinks: MenuTableLink[] = [];
    @Input() onCreate: any;
    selected?: any;
    // selectedItems: any[] = [];
    filters: string[] = [];
    routeRow: string[] = [];
    loading = false;
    Role = Role;

    subscription: Subscription[] = [];

    first = 2;
    
    currentBooleanFilter: any;
    currentCPFFilter: any;
    currentDateFilter: Date;

    constructor(
        private table: Table,
        private router: Router
    ) {
        this.filters = this.columns.map(x => x.field);

        var loading = this.table.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);

        if (this.selectable) {
            var selected = this.table.selected.subscribe(res => this.selected = res);
            this.subscription.push(selected);
        }

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['list']) 
            this.list = changes['list'].currentValue;
        if (changes['selectable'])
            this.selectable = changes['selectable'].currentValue;
        if (changes['createLink'])
            this.createLink = changes['createLink'].currentValue;
        if (changes['filterLink'])
            this.filterLink = changes['filterLink'].currentValue;
        if (changes['filterTable'])
            this.filterTable = changes['filterTable'].currentValue;
        if (changes['paginator'])
            this.paginator = changes['paginator'].currentValue;
        if (changes['sortTable'])
            this.sortTable = changes['sortTable'].currentValue;
        if (changes['menuTable'])
            this.menuTable = changes['menuTable'].currentValue;
        if (changes['columns']) {
            this.columns = changes['columns'].currentValue;
            this.filters = this.columns.map(x => x.field)
        }
        if (changes['canCreate'])
            this.canCreate = changes['canCreate'].currentValue;
        if (changes['onCreate']) 
            this.onCreate = changes['onCreate'].currentValue;
        if (changes['tableLinks'])
            this.tableLinks = changes['tableLinks'].currentValue;
    }
    ngAfterViewInit(): void {
    }
    
    ngAfterViewChecked(): void {
        setTimeout(() => {
            this.table.currentPageChange();
        }, 200);
    }

    onRowSelect(event: any) {
        this.table.onRowSelect(event);
    }

    onRowUnselect(event: any) {
        this.table.onRowUnselect(event)
    }

    getCellData(row: any, col: Column): any {
        return this.table.getCellData(row, col);
    }
    
    getCellTitle(row: any, col: Column) {
        const nestedProperties: string[] = col.field.split('.');
        let title: any = row;
        for (const prop of nestedProperties) {
            title = title ? title[prop] ?? undefined : undefined;
        }
        return title;
    }

    create() {
        if (this.canCreate) {
            if (this.onCreate) {
                this.onCreate();
            }
        }
    }

    eval(str:any, item: any) {
        return eval(str) as boolean
    }

    onPageChange(e: any) {

    }

    getOption(row: any, col: Column) {
        const nestedProperties: string[] = col.field.split('.');
        let value: any = row;
        for (const prop of nestedProperties) {
            value = value ? value[prop] ?? undefined : undefined;
        }
        value = col.values?.find(x => x.value == value);
        return value
    }

    getValue(value: string, field: string) {
        var a = JSON.parse(value);
        var b = '';
        if (a)
            b = a[field];
        return b;
    }
}

