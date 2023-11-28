import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faCheckSquare, faTimesRectangle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-disabled',
    templateUrl: './disabled.component.html',
    styleUrls: ['./disabled.component.css']
})
export class DisabledComponent implements AfterViewInit, OnDestroy {

    faTimesRectangle = faTimesRectangle;
    faCheckSquare = faCheckSquare;
    id: number = 0;
    habilitar = true;
    erro: string = '';
    loading = false;

    @ViewChild('template') template: TemplateRef<any>;
    @ViewChild('icon') icon: TemplateRef<any>;
    subscription: Subscription[] = [];
    routeBackOptions: any;


    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: Modal,
        private crypto: Crypto,
        private empresaService: EmpresaService,
        private router: Router,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
    }


    ngAfterViewInit(): void {
        this.modal.icon.next(this.icon);
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '300px' })
        this.modal.activatedRoute.next(this.activatedRoute);

        this.activatedRoute.title.subscribe(res => {
            if (res?.includes('Habilitar')) {
                this.modal.title.next('Habilitar empresa');
                this.habilitar = true;
            } else {
                this.modal.title.next('Desabilitar empresa');
                this.habilitar = false;
            }
        })
        var params = this.activatedRoute.params.subscribe(res => {
            if (res['id']) {
                this.modal.routerBack.next(['../../']);
                this.id = this.crypto.decrypt(res['id']);
                setTimeout(() => {
                    this.modal.setOpen(true)
                }, 100);
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
    }
    send() {
        this.erro = '';
        this.loading = true;
        lastValueFrom(this.empresaService.habilitar(this.id, this.habilitar))
            .then(res => {
                this.voltar();
            })
            .catch(err => {
                this.loading = false;
                this.erro = getError(err);
            })
    }

}
