import { AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ColumnFilter } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Column, MaskType, OptionValues } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Role } from 'src/app/models/account-perfil.model';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-list-shared',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListSharedComponent implements OnDestroy, OnChanges, AfterViewInit, AfterViewChecked /*, AfterViewChecked*/ {
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
    @Input() selectable = true;
    @Input() columns: Column[] = [];
    @Input() tableLinks: MenuTableLink[] = [];
    @Input() showResultLength = true;

    @Input() topActions: TemplateRef<any>;
    @Input() tableFooter: TemplateRef<any>;
    @Input() rowActions: TemplateRef<any>;

    selected?: any;
    filters: string[] = [];
    routeRow: string[] = [];
    loading = false;
    Role = Role;

    subscription: Subscription[] = [];
    first = 2;
    formatedList: any = [];

    @ViewChild('rowActions') rowActionsTemplate: TemplateRef<any>;

    constructor(
        private table: Table,
        private router: Router,
    ) {
        this.table.currentPage.next(1);

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
        if (changes['list']) {
            this.list = changes['list'].currentValue;
            this.formatedList = changes['list'].currentValue
            if (this.list.length > 0 && this.columns.length > 0) {
                this.formata();
            }
        }
        if (changes['columns']) {
            this.columns = changes['columns'].currentValue;
            this.filters = this.columns.map(x => x.field)
        }
        if (changes['selectable']) this.selectable = changes['selectable'].currentValue;
        if (changes['filterLink']) this.filterLink = changes['filterLink'].currentValue;
        if (changes['filterTable']) this.filterTable = changes['filterTable'].currentValue;
        if (changes['paginator']) this.paginator = changes['paginator'].currentValue;
        if (changes['sortTable']) this.sortTable = changes['sortTable'].currentValue;
        if (changes['menuTable']) this.menuTable = changes['menuTable'].currentValue;
        if (changes['tableLinks']) this.tableLinks = changes['tableLinks'].currentValue;
        if (changes['topActions']) this.topActions = changes['topActions'].currentValue;
        if (changes['tableFooter']) this.tableFooter = changes['tableFooter'].currentValue;
        if (changes['rowActions']) this.rowActions = changes['rowActions'].currentValue;
        if (changes['showResultLength']) this.showResultLength = changes['showResultLength'].currentValue;
    }

    ngAfterViewInit(): void { }

    ngAfterViewChecked(): void {
        this.table.currentPageChange();
    }


    formata() {
        this.list.forEach((row: any) => {
            this.columns.forEach(col => {
                try {
                    row[col.field] = this.formatCellData(row, col);
                } catch (e) {
                    console.error(e)
                }
                return row;
            })
        })

        this.formatedList = Object.assign([], this.list);
    }


    onRowSelect(event: any) {
        this.table.onRowSelect(event);
    }

    onRowUnselect(event: any) {
        this.table.onRowUnselect(event)
    }

    formatCellData(row: any, col: Column) {
        var value = this.table.formatCellData(row, col);
        return value
    }

    getCellValue(row: any, col: Column) {
        return this.table.getCellValue(row, col);
    }

    getOptionValue(row: any, col: Column, field: string) {
        if (col.values) {
            var value = this.table.getCellValue(row, col);
            var opt = col.values.find(x => x.value == value) as any;
            return opt[field];
        }
        return null;
    }

    primeNgDataFilter(value: Date, filterCallback: any, filter: ColumnFilter) {
        if (value) {
            filterCallback(new Date(value));
        } else {
            filter.clearFilter();
        }
    }

    evalRowActions(str: any, item: any) {
        return eval(str) as boolean
    }

    filterCol(value: any, filter: any, filterEl: ColumnFilter) {
        filter(value);

        var a = $(filterEl.el.nativeElement).find('.p-column-filter-menu-button');
        console.log(a)
        a.trigger('click');
        setTimeout(() => {
            a.trigger('click');
        }, 50);

    }

    filterColOption(value: any, filter: any) {
        value = value != undefined && value != null ? value.value : undefined;
        filter(value);
    }
}

