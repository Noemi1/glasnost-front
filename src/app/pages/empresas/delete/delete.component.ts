import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements AfterViewInit, OnDestroy{

    faTrash = faTrash;
    id: number = 0;
    erro: string = '';
    loading = false;

    @ViewChild('template') template: TemplateRef<any>;
    @ViewChild('icon') icon: TemplateRef<any>;
    subscription: Subscription[] = [];
    routeBackOptions: any;


    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: Modal,
        private crypto: Crypto,
        private empresaService: EmpresaService,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
    }


    ngAfterViewInit(): void {
        this.modal.icon.next(this.icon);
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '400px' })
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.title.next('Excluir empresa');

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
        lastValueFrom(this.empresaService.delete(this.id))
			.then(res => {
				this.voltar();
			})
			.catch(err => {
				this.erro = getError(err);
                this.loading = false;
			})
	}

}
