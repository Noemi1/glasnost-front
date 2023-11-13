import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { Basic } from "./basic.model";

export class EmpresaList extends Basic {
    cnpj: number = 0;
    razaoSocial: string = '';
    dataDesativado?: Date;
    ativo: boolean = true;
}

export class Empresa extends Basic {
    cnpj: number = 0;
    razaoSocial: string = '';
    nomeFantasia: string = '';
    telefoneComercial: string = '';
    celular: string = '';
    contato: string = '';
    email: string = '';
    tipo_Id: number = '' as unknown as number;
    diligenciaPrevia: boolean = false;
    riscoCompliance_Id: number = '' as unknown as number;
    escopoResumido: string = '';
    cep: number = 0;
    logradouro: string = '';
    numero: string = '';
    complemento: string = '';
    bairro: string = '';
    cidade: string = '';
    uf: string = '';
    dataDesativado?: Date;
    cnaes: number[] = [];
}


export var acionistaColumns: Column[] = [
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
        field: 'razaoSocial',
        header: 'Razão Social',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'cnpj',
        header: 'CNPJ',
        maskType: MaskType.cnpj,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
]
