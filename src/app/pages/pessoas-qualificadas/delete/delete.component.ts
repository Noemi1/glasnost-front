import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnDestroy, AfterViewInit {
    faTrash = faTrash;
    modalOpen = false;
    object: Pessoa = new Pessoa;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    modal: Modal = new Modal;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private crypto: Crypto,
        private modalService: ModalService,
        private pessoaService: PessoaService,
    ) {
    }

    ngAfterViewInit(): void {
        this.modal.id =  0;
        this.modal.template =  this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '400px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };


        var params = this.activatedRoute.params.subscribe(res => {
            if (res['id']) {
                this.modal.title = 'Excluir pessoa qualificada';
                this.modal.routerBack = ['../../'];
                this.object.id = this.crypto.decrypt(res['id']);

                lastValueFrom(this.pessoaService.get(this.object.id))
                    .then(obj => {
                        this.object = obj;
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'moeda');
                        }, 100);
                    })
                    .catch(err => {
                        this.voltar();
                    });
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);

    }
    voltar() {
        this.modalService.removeModal(this.modal.id);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }



    send() {
        this.erro = '';
        lastValueFrom(this.pessoaService.delete(this.object.id))
            .then(res => {
                this.voltar();
            })
            .catch(err => {
                this.erro = getError(err);
            })
    }

}
