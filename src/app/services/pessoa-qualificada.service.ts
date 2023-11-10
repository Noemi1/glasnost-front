import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { MaskApplierService } from 'ngx-mask';
import { PessoaQualificada } from '../models/pessoas-qualificadas.model';

@Injectable({
    providedIn: 'root'
})
export class PessoaQualificadaService {
    url = environment.url;
    list = new BehaviorSubject<PessoaQualificada[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
    ) { }


    getList() {
        this.table.loading.next(true);
        return this.http.get<PessoaQualificada[]>(`${this.url}/pessoa-qualificada/all/`, { headers: new HttpHeaders({ 'loading': 'false' }) })
            .pipe(tap({
                next: list => {
                    this.list.next(list);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar Pessoas.')
            }));
    }

    get(id: number) {
        return this.http.get<PessoaQualificada>(`${this.url}/pessoa-qualificada/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });

    }
    create(request: PessoaQualificada) {
        return this.http.post<PessoaQualificada>(`${this.url}/pessoa-qualificada`, request);
    }

    edit(request: PessoaQualificada) {
        return this.http.put<PessoaQualificada>(`${this.url}/pessoa-qualificada`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/pessoa-qualificada/${id}`);
    }

}
