import { FilterMatchMode } from "primeng/api";

export interface Column {
    field: string; 
    header: string, 
    maskType: MaskType,
    mask?: string;
    maskLength?: number;
    decimal?: string,
    moeda?: string
    filterType: FilterType, 
    filterDisplay: FilterDisplay,
    filterShowMatchMode?: boolean;
    filterShowOperator?: boolean;
    filterShowClearButton?: boolean;
    filterShowApplyButton?: boolean;
    filterShowAddButton?: boolean;
    filterMatchMode?: FilterMatchMode;
    substringLength?: number; // Masktype.substring
    title?: string;
    filterValue?: any;
    values?: OptionValues[];
}

export enum FilterType {
    text = 'text',
    numeric = 'numeric',
    date = 'date',
    datetime = 'datetime',
    boolean = 'boolean',
}

export enum FilterDisplay {
    menu = 'menu'
}

export enum MaskType {
    undefined,
    number = 'number',
    money = 'money',
    percentage = 'percentage',
    date = 'date',
    dateTime = 'dateTime',
    cnpj = 'cnpj',
    cpf = 'cpf',
    cpfcnpj = 'cpfcnpj',
    rg = 'rg',
    any = 'any',
    boolean = 'boolean',
    telefoneCelular = 'telefoneCelular',
    substring = 'substring',
    options = 'options',
    mask = 'mask',
}


export class OptionValues {
    output: string = '';
    value: any;
    class?: string;
}