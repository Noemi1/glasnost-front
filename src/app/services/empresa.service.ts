import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, lastValueFrom, map, of, tap } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Empresa, EmpresaCnae, EmpresaList, EmpresaRiscoCompliance, EmpresaTipo } from '../models/empresa.model';
import { insertOrReplace, remove } from '../utils/service-list';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    url = environment.url;
    list = new BehaviorSubject<EmpresaList[]>([{
        id: 28,
        cnpj: 10907911000150,
        razaoSocial: 'BulleST Soluções em Tecnologia Ltda',
        dataDesativado: '2023-11-29T23:12:04.077' as unknown as Date,
        ativo: false ,
        filter: '28' + '10907911000150' + 'BulleST Soluções em Tecnologia Ltda' + '2023-11-29T23:12:04.077'
    }]);
    empresaSelected:  BehaviorSubject<EmpresaSelected>;
    riscoCompliance = new BehaviorSubject<EmpresaRiscoCompliance[]>([]);
    tipos = new BehaviorSubject<EmpresaTipo[]>([]);
    cnaes = new BehaviorSubject<EmpresaCnae[]>([]);


    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
    ) {
        this.empresaSelected = new BehaviorSubject<EmpresaSelected>({
            empresa: this.list.value[0],
            id: this.list.value[0].id,
        });
    }


    getList() {
        this.table.loading.next(true);
        return this.http.get<EmpresaList[]>(`${this.url}/empresa`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                list = list.map(x => {
                    x.ativo = !x.dataDesativado; 
                    return x;
                })
                this.list.next(list);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar empresas.')
        }));
    }
    
    getRiscoCompliance() {
        this.table.loading.next(true);
        return this.http.get<EmpresaRiscoCompliance[]>(`${this.url}/empresa/risco-compliance`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                this.riscoCompliance.next(list);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar risco compliance.')
        }));
    }

    getTipos() {
        this.table.loading.next(true);
        return this.http.get<EmpresaTipo[]>(`${this.url}/empresa/tipo`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                this.tipos.next(list);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar tipo.')
        }));
    }

    getCnae() {
        this.table.loading.next(true);
        return this.http.get<EmpresaCnae[]>(`${this.url}/cnae`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                this.cnaes.next(list);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar CNAEs.')
        }));
    }

    get(id: number) {
        return this.http.get<Empresa>(`${this.url}/empresa/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }

    create(request: Empresa) {
        return this.http.post<Empresa>(`${this.url}/empresa`, request)
        .pipe(map(res => {
            insertOrReplace(this, res);
        }));
    }

    edit(request: Empresa) {
        return this.http.put<Empresa>(`${this.url}/empresa`, request)
        .pipe(map(res => {
            insertOrReplace(this, res);
        }));
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/empresa/${id}`)
        .pipe(map(res => {
            remove(this, id);
        }));
    }

    habilitar(id: number, habilitar: boolean) {
        return this.http.patch<void>(`${this.url}/empresa/${id}/${habilitar}`, {})
        .pipe(tap({
            next: res => {
                lastValueFrom(this.getList());
            },
            error: res => this.toastr.error(`Não foi possível ${ habilitar ? 'habilitar' : 'desabilitar' } registro.`)
        }));
    }

    validaCNPJ(id: number, cnpj: number) {
        return this.http.get<boolean>(`${this.url}/empresa/valida-cnpj/${id}/${cnpj}`, {});
    }

}

export class EmpresaSelected {
    empresa?: EmpresaList;
    id: number = 0;
}