import { FilterMatchMode } from "primeng/api";

export interface Column {
    field: string; 
    header: string, 
    maskType: MaskType,
    mask?: string;
    decimal?: string,
    moeda?: string
    filterType: FilterType, 
    filterDisplay: FilterDisplay,
    filterShowMatchMode?: boolean;
    filterShowAddButton?: boolean;
    showOperator?: boolean;
    filterMatchMode?: FilterMatchMode;
    values?: any[];
    substringLength?: number; // Masktype.substring
    title?: string;
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
}