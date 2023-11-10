import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Pessoa } from '../models/pessoa.model';
import { MaskApplierService } from 'ngx-mask';

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
    ) { }


    getList() {
        this.table.loading.next(true);
        // return this.http.get<Pessoa[]>(`${this.url}/pessoa/all/`, { headers: new HttpHeaders({ 'loading': 'false' })})
        // .pipe(tap({
        //     next: list => {
        //         this.list.next(list);
        //         return of(list);
        //     },
        //     error: res => this.toastr.error('Não foi possível carregar Pessoas.')
        // }));
        return new Observable<Pessoa[]>(observer => {
            var index = 1
            var lista: Pessoa[] = [
                { id: index++, nome: 'Banco Alpha', pj: true, documento: 60770336000165, cliente_Id: 0, estrangeiro: false, email: 'ouvidoria@alfanet.com.br' },
                { id: index++, nome: 'Banco Santander', pj: true, documento: 90400888000142, cliente_Id: 0, estrangeiro: false, email: 'canalaberto@santander.com.br' },
                { id: index++, nome: 'BRS Consulting & Services', pj: true, documento: 28847985000104, cliente_Id: 0, estrangeiro: false, email: 'brunasrodrigues2@gmail.com' },
                { id: index++, nome: 'Bullest Soluções em Tecnologia LTDA.', pj: true, documento: 10907911000150, cliente_Id: 0, estrangeiro: false, email: 'contato@bullest.com.br' },
                { id: index++, nome: 'Felipe José Cardoso Bulle', pj: false, documento: 31201103886, cliente_Id: 0, estrangeiro: false, email: 'felipe@tocomply.com.br' },
                { id: index++, nome: 'Luana Cordeiro Cardoso Bulle', pj: false, documento: 36315766846, cliente_Id: 0, estrangeiro: false, email: 'luana@bullest.com.br' },
                { id: index++, nome: 'Marina Cantelli Calegon', pj: false, documento: 39223891809, cliente_Id: 0, estrangeiro: false, email: 'marina@bullest.com.br' },
                { id: index++, nome: 'Noemi Cavalcanti Almeida', pj: false, documento: 22810679800, cliente_Id: 0, estrangeiro: false, email: 'noemi@bullest.com.br' },
                { id: index++, nome: 'TagBrasil Tecnologia de Identificacao LTDA.', pj: true, documento: 7837418000105, cliente_Id: 0, estrangeiro: false, email: 'real@realcontabilidade.net' },
                { id: index++, nome: 'Thiago Abucarub', pj: false, documento: 30725428805, cliente_Id: 0, estrangeiro: false, email: 'thiago@bullest.com.br' },
            ]
            this.list.next(lista);
            observer.next(lista);
            observer.complete();
            this.table.loading.next(false);
        })
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
            console.log(id, documento)
            var item = this.list.value.find(x => {
                console.log(x.id, x.documento)
                return x.id != id && x.documento == documento
            });
            item = item ? Object.assign({}, item) : undefined;
            observer.next(item);
            observer.complete();
        });
    }

    create(request: Pessoa) {
        return this.http.post<Pessoa>(`${this.url}/pessoa`, request);
    }

    edit(request: Pessoa) {
        return this.http.put<Pessoa>(`${this.url}/pessoa`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/pessoa/${id}`);
    }

}
