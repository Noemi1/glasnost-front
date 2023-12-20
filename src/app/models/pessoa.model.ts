import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { Basic } from "./basic.model";

export class Pessoa extends Basic {
    empresa_Id: number = 0;
    pj: boolean = false;
    estrangeiro: boolean = false;
    documento: number = '' as unknown as number;
    nome: string = '';
    email: string = '';
    dataDesativado?: Date;
    ativo: boolean = true;
}

export var pessoaColumns: Column[] = [
    {
        field: 'id',
        header: 'Id',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterShowOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    }, 
    {
        field: 'nome',
        header: 'Nome',
        maskType: MaskType.substring,
        substringLength: 22,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterShowOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'documento',
        header: 'CPF/CNPJ',
        maskType: MaskType.cpfcnpj,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterShowOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'email',
        header: 'E-mail',
        maskType: MaskType.substring,
        substringLength: 22,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterShowOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'pj',
        header: 'PJ',
        maskType: MaskType.options,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterShowOperator: false,
        filterShowClearButton: false,
        filterShowApplyButton: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        values: [
            { value: true, output: 'Empresa', class: 'flag-yellow' },
            { value: false, output: 'Pessoa', class: 'flag-grey' },
        ]
    },
    {
        field: 'ativo',
        header: 'Status',
        maskType: MaskType.options,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterShowOperator: false,
        filterShowClearButton: false,
        filterShowApplyButton: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        values: [
            { value: true, output: 'Ativo', class: 'flag-green' },
            { value: false, output: 'Inativo', class: 'flag-danger' },
        ]
    },
]
