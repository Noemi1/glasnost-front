import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { validateCnpj } from 'src/app/utils/validate-cnpj';
import { validateCPF } from 'src/app/utils/validate-cpf';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy, AfterViewInit {
	faUser = faUser;
	modalOpen = false;
	object: Pessoa = new Pessoa;
	erro: string = '';
	loading = false;
	subscription: Subscription[] = [];
	routeBackOptions: any;
	emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	@ViewChild('template') template: TemplateRef<any>
	@ViewChild('icon') icon: TemplateRef<any>
	@ViewChild('documento') documento: NgModel
    modal: Modal = new Modal;

	constructor(
		private activatedRoute: ActivatedRoute,
		private toastr: ToastrService,
		private crypto: Crypto,
		private pessoaService: PessoaService,
        private modalService: ModalService,
	) {
		this.routeBackOptions = { relativeTo: this.activatedRoute };

	}

	ngAfterViewInit(): void {
        this.modal.id =  0;
        this.modal.template =  this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '600px' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

		var params = this.activatedRoute.params.subscribe(res => {
			if (res['id']) {
				this.modal.title = 'Editar Pessoa Qualificada';
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
						this.toastr.error('This page could not be accessed');
					});
			} else {
				this.modal.routerBack = ['../'];
				this.modal.title = 'Cadastrar Pessoa Qualificada';
				setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'moeda');
				}, 100);
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


	pjChange(doc: number) {
		this.object.documento = '' as unknown as number;
		this.validaDocumento(doc)
	}

	async validaDocumento(doc: number) {
		this.loading = true;
		if (!doc || doc == 0) {
			this.documento.control.setErrors({ required: true });
			this.loading = false;
			return;
		}

		var valid = true;
		if (this.object.pj) valid = validateCnpj(doc);
		else valid = validateCPF(doc);

		if (!valid) {
			this.documento.control.setErrors({ invalid: true });
			this.loading = false;
			return;
		} else {
			var existe = await lastValueFrom(this.pessoaService.validateDocNotIncluded(this.object.id, this.object.documento))
			if (existe) {
				this.documento.control.setErrors({ jaCadastrado: true });
				this.loading = false;
				return;
			}

		}
		this.documento.control.setErrors(null);
		this.loading = false;
		return;
	}


	send(form: NgForm) {
		if (form.invalid) {
			this.toastr.error('There are one or more invalid fields.');
			this.erro = 'There are one or more invalid fields.';
			return;
		}
		this.erro = '';
		this.request()
			.then(res => {
				this.voltar();
			})
			.catch(err => {
				this.erro = getError(err);
			})
	}

	request() {
		if (this.object.id == 0) 
			return lastValueFrom(this.pessoaService.create(this.object));
		return lastValueFrom(this.pessoaService.edit(this.object));
	}

}
