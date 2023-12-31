import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Pessoa } from '../models/pessoa.model';
import { EmpresaService } from './empresa.service';
import { insertOrReplace, remove } from '../utils/service-list';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {
    url = environment.url;
    list = new BehaviorSubject<Pessoa[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private empresaService: EmpresaService,
    ) { }


    getList(empresaId?: number, ativo?: boolean) {
        empresaId = empresaId ?? this.empresaService.empresaSelected.value.id;
        // empresaId = empresaId ?? (this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id);
        this.table.loading.next(true);
        return this.http.get<Pessoa[]>(`${this.url}/pessoa/all/${empresaId}/${ativo ?? ''}`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                list = list.map(x => {
                    x.ativo = !x.dataDesativado; 
                    return x;
                })
                this.list.next(list);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar Pessoas.')
        }));
    }

    get(id: number) {
        // return this.http.get<Pessoa>(`${this.url}/pessoa/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
        return new Observable<Pessoa>(observer => {
            var item = Object.assign({}, this.list.value.find(x => x.id == id));
            if (item)
                observer.next(item);
            else
                observer.error('Pessoa não encontrada.');
            observer.complete();

        });
    }

    getByIdAndDoc(id: number, doc: number) {
        return new Observable<Pessoa>(observer => {
            var item = Object.assign({}, this.list.value.find(x => x.id == id && x.documento == doc));
            if (item)
                observer.next(item);
            else
                observer.error('Pessoa não encontrada.');
            observer.complete();
        });
    }

    validateDocNotIncluded(id: number, documento: number) {
        return new Observable<Pessoa>(observer => {
            var item = this.list.value.find(x => {
                return x.id != id && x.documento == documento
            });
            item = item ? Object.assign({}, item) : undefined;
            observer.next(item);
            observer.complete();
        });
    }

    create(request: Pessoa) {
        request.empresa_Id = this.empresaService.empresaSelected.value.id;
        return this.http.post<Pessoa>(`${this.url}/pessoa`, request)
        .pipe(map(res => {
            insertOrReplace(this, res);
        }));
    }

    edit(request: Pessoa) {
        return this.http.put<Pessoa>(`${this.url}/pessoa`, request)
        .pipe(map(res => {
            insertOrReplace(this, res);
        }));
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/pessoa/${id}`)
        .pipe(map(res => {
            remove(this, id);
        }));
    }

}
