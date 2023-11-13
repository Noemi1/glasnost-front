import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Empresa, EmpresaList } from '../models/empresa.model';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    url = environment.url;
    list = new BehaviorSubject<EmpresaList[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
    ) { }


    getList() {
        this.table.loading.next(true);
        return this.http.get<EmpresaList[]>(`${this.url}/empresa/all/`, { headers: new HttpHeaders({ 'loading': 'false' })})
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

    get(id: number) {
        return this.http.get<Empresa>(`${this.url}/empresa/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }

    create(request: Empresa) {
        return this.http.post<Empresa>(`${this.url}/empresa`, request);
    }

    edit(request: Empresa) {
        return this.http.put<Empresa>(`${this.url}/empresa`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/empresa/${id}`);
    }

}
