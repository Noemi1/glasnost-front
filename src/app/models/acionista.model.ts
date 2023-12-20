import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { Basic } from "./basic.model";
import { Pessoa } from './pessoa.model';

export class Acionista extends Basic {
    cliente_Id: number = 0;
    pessoa_Id: number = undefined as unknown as number;
    acionista_Id?: number;
    pessoa: Pessoa = new Pessoa
}

export var acionistaColumns: Column[] = [
    {
        field: 'pessoa.id',
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
        field: 'pessoa.nome',
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
        field: 'pessoa.cpf',
        header: 'CPF',
        maskType: MaskType.cpf,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterShowOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'pessoa.pj',
        header: 'PJ',
        maskType: MaskType.options,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterShowOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        values: [
            { value: true, output: 'Empresa', class: 'flag-yellow' },
            { value: false, output: 'Pessoa', class: 'flag-grey' },
        ]
    }, 
    
]
