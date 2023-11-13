import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { Basic } from "./basic.model";

export class Pessoa extends Basic {
    cliente_Id: number = 0;
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
        showOperator: false,
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
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'documento',
        header: 'CPF/CNPJ',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'pj',
        header: '',
        maskType: MaskType.boolean,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        booleanValues: {
            'true': 'Empresa',
            'false': 'Pessoa',
        }
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
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
]
