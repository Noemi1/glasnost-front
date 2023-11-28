import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from '../utils/table';
import { LoadingService } from '../parts/loading/loading';
import { getError } from '../utils/error';

@Injectable({
    providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

    excludeUrlsToastr = [
        'tributacao/getAll',
        'tipoLiquidez/getAll',
        'tipoRisco/getAll',
        'tipoAtivo/getAll',
        'perfilAcesso/getAll',
        'perfilInvestidor/getAll',
        'estadoCivil/getAll',
        'accounts/revoke-token',
        'accounts/authenticate',
        'accounts/refresh-token',
        'accounts/verify-email',
        'accounts/register',
        'accounts/get-login',
    ];

    excludeUrlsLoading = [
        'tributacao/getAll',
        'tipoLiquidez/getAll',
        'tipoRisco/getAll',
        'tipoAtivo/getAll',
        'perfilAcesso/getAll',
        'perfilInvestidor/getAll',
        'estadoCivil/getAll',
        'accounts/verify-email',
        'accounts/refresh-token',
    ];

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private table: Table,
        private loadingUtils: LoadingService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var notLoading = this.excludeUrlsLoading.filter(x => request.url.includes(x));
        var notToastr = this.excludeUrlsToastr.filter(x => request.url.includes(x));

        var loadingHeader = request.headers.get('loading');
        if (request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE' || loadingHeader == 'true') {
            this.loadingUtils.loading.next(true);
            this.loadingUtils.addLoadingRequest();
        }

        if (request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE') {
            this.table.resetSelection();
        }

            

        return next.handle(request).pipe(
            tap({
                next: (data: any) => {
                    if (data.type == 0) {
                        // request in progress
                        if (request.method == 'POST' || request.method == 'PUT' || request.method == 'PATCH' || request.method == 'DELETE') {
                            this.table.onRowUnselect();
                        } else {
                        }
                    }
                    else if (data instanceof HttpResponse) {
                        if ([200, 204, 201].includes(data.status)) {
                            if (request.method == 'POST') {
                                this.toastr.success('Operação concluída com sucesso.');
                            }
                            else if (request.method == 'PUT') {
                                this.toastr.success('Registro atualizado com sucesso.');
                                this.table.onRowUnselect();
                            }
                            else if (request.method == 'PATCH') {
                                this.toastr.success('Registro atualizado com sucesso.');
                                this.table.onRowUnselect();
                            }
                            else if (request.method == 'DELETE') {
                                this.toastr.success('Registro excluído com sucesso.')
                                this.table.onRowUnselect();
                            }
                            else if (request.method == 'GET') {
                                setTimeout(() => {
                                    this.table.goToCurrentPage();
                                }, 100);
                                this.table.loading.next(false)
                                this.loadingUtils.loading.next(false);
                            }

                        }
                    }
                },
                error: res => {
                    console.error('error', res);
                    var msg  = getError(res);

                    if (res.status == 401) {
                        var returnUrl = window.location.pathname;
                        returnUrl = returnUrl.includes('account/login') ? '' : returnUrl;
                        this.router.navigate(['account', 'login'], { queryParams: { returnUrl } });
                        localStorage.clear();
                        this.toastr.error(`Acesso não autorizado. <br> Faça login.`);
                    }
                    else if (res.status == 403) {
                        this.toastr.error('Permissão negada.');
                    }
                    else if (notToastr.length == 0) {
                        if (request.method == 'POST') {
                            this.toastr.error('Não foi possível cadastrar novo registro.');
                        }
                        else if (request.method == 'PUT') {
                            this.toastr.error('Não foi possível atualizar registro.');
                            this.table.onRowUnselect();
                        }
                        else if (request.method == 'PATCH') {
                            this.toastr.error('Não foi possível atualizar registro.');
                            this.table.onRowUnselect();
                        }
                        else if (request.method == 'DELETE') {
                            this.toastr.error('Não foi possível excluir registro.');
                            this.table.onRowUnselect();
                        }
                        else if (request.method == 'GET') {
                            this.toastr.error('Não foi possível carregar dados.');
                            setTimeout(() => {
                                this.table.goToCurrentPage();
                            }, 100);
                            this.table.loading.next(false)
                            this.loadingUtils.loading.next(false);
                        }
                        this.toastr.error(msg);
                    }

                    return throwError(() => new Error(msg));

                }
            }),
            // Log when response observable either completes or errors
            finalize(() => {
                console.log('oi aaa')
                this.table.loading.next(false)
                this.loadingUtils.loading.next(false);
                if (request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE' || loadingHeader == 'true') {
                    this.loadingUtils.removeLoadingRequest();
                }
            }),
        );
    }
}
