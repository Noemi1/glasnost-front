import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheckSquare, faTimesRectangle } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';

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
    modal: Modal = new Modal;


    constructor(
        private activatedRoute: ActivatedRoute,
        private crypto: Crypto,
        private empresaService: EmpresaService,
        private modalService: ModalService,
    ) {
    }


    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '300px' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.modal.routerBack = ['../../'];


        this.activatedRoute.title.subscribe(res => {
            if (res?.includes('Habilitar')) {
                this.modal.title = 'Habilitar empresa';
                this.habilitar = true;
            } else {
                this.modal.title = 'Desabilitar empresa';
                this.habilitar = false;
            }
        })

        var params = this.activatedRoute.params.subscribe(res => {
            if (res['empresa_id']) {
                this.id = this.crypto.decrypt(res['empresa_id']);
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'moeda');
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
        this.modalService.removeModal(this.modal.id);
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
