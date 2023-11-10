import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal-open';

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
    routeBackOptions: any;

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: Modal,
        private crypto: Crypto,
        private loadingUtils: LoadingService,
        private pessoaService: PessoaService,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);
    }

    ngAfterViewInit(): void {
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '400px' })
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);

        var params = this.activatedRoute.params.subscribe(res => {
            if (res['id']) {
                this.modal.title.next('Excluir pessoa/empresa');
                this.modal.routerBack.next(['../../']);
                this.object.id = this.crypto.decrypt(res['id']);

                lastValueFrom(this.pessoaService.get(this.object.id))
                    .then(obj => {
                        this.object = obj;
                        setTimeout(() => {
                            this.modal.setOpen(true)
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
        this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
        this.toastr.error('This page could not be accessed');

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }



    send() {
        this.erro = '';
        lastValueFrom(this.pessoaService.delete(this.object.id))
            .then(res => {
                this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
            })
            .catch(err => {
                this.erro = getError(err);
            })
    }

}
