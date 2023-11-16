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
export class ViaCEPService {

    constructor(
        private http: HttpClient,
    ) { }
    
    getEndereco(cep: number) {
        return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`)
    }
}


export class ViaCepResponse {
    cep: string = '';
    logradouro: string = '';
    complemento: string = '';
    bairro: string = '';
    localidade: string = '';
    uf: string = '';
    ibge: string = '';
    gia: string = '';
    ddd: string = '';
    siafi: string = '';
}