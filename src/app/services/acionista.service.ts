import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { PerfilAcesso, Role } from '../models/account-perfil.model';
import { Acionista } from '../models/acionista.model';
import { Pessoa } from '../models/pessoa.model';

@Injectable({
    providedIn: 'root'
})
export class AcionistaService {
    url = environment.url;
    list = new BehaviorSubject<Acionista[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
    ) { }


    getList() {
        this.table.loading.next(true);
        // return this.http.get<Acionista[]>(`${this.url}/acionista/all/`, { headers: new HttpHeaders({ 'loading': 'false' })})
        // .pipe(tap({
        //     next: list => {
        //         this.list.next(list);
        //         return of(list);
        //     },
        //     error: res => this.toastr.error('Não foi possível carregar acionistas.')
        // }));
        return new Observable<Acionista[]>(observer => {
            var index = 1
            var lista = [
                { id: index++, acionista_Id: undefined, pessoa_Id: 0, pessoa: new Pessoa }
            ]
            observer.next()
        })
    }

    get(id: number) {
        return this.http.get<Acionista>(`${this.url}/acionista/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }

    create(request: Acionista) {
        return this.http.post<Acionista>(`${this.url}/acionista`, request);
    }

    edit(request: Acionista) {
        return this.http.put<Acionista>(`${this.url}/acionista`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/acionista/${id}`);
    }

}
