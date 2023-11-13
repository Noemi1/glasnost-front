import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal-open';
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
		this.modal.style.next({ 'max-width': '600px' })
		this.modal.activatedRoute.next(this.activatedRoute);
		this.modal.icon.next(this.icon);

		var params = this.activatedRoute.params.subscribe(res => {
			if (res['id']) {
				this.modal.title.next('Editar pessoa/empresa');
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
						this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
						this.toastr.error('This page could not be accessed');
					});
			} else {
				this.modal.routerBack.next(['../']);
				this.modal.title.next('Cadastrar pessoa/empresa');
				setTimeout(() => {
					this.modal.setOpen(true)
				}, 100);
			}
		});
		this.subscription.push(params);

	}

	ngOnDestroy(): void {
		this.subscription.forEach(item => item.unsubscribe());
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
				this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
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
