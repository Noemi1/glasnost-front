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
    cnpj: number = '' as unknown as number;
    razaoSocial: string = '';
    nomeFantasia: string = '';
    telefoneComercial: string = '';
    celular: string = '';
    contato: string = '';
    email: string = '';
    tipo_Id: number = undefined as unknown as number;
    diligenciaPrevia: boolean = false;
    riscoCompliance_Id: number = undefined as unknown as number;
    escopoResumido: string = '';
    cep: number = '' as unknown as number;
    logradouro: string = '';
    numero: string = '';
    complemento: string = '';
    bairro: string = '';
    cidade: string = '';
    uf: string = '';
    dataDesativado?: Date;
    cnaes: number[] = [];
}

export class EmpresaRiscoCompliance extends Basic {
    nome: string = '';
}

export class EmpresaTipo extends Basic {
    nome: string = '';
}
export class EmpresaCnae extends Basic {
    codigo: string = '';
    descricao: string = '';
    filterBy: string = '';
}

export var empresaColumns: Column[] = [
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
    {
        field: 'ativo',
        header: 'Status',
        maskType: MaskType.options,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        values: [
            { value: true, output: 'Habilitado', class: 'flag-green' },
            { value: false, output: 'Desabilitado', class: 'flag-danger' },
        ]
    },
]
