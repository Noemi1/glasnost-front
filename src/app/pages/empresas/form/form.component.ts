import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MultiSelect } from 'primeng/multiselect';
import { Subscription, lastValueFrom } from 'rxjs';
import { Empresa, EmpresaCnae, EmpresaRiscoCompliance, EmpresaTipo } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ViaCEPService } from 'src/app/services/viacep.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal-open';
import { validateCnpj } from 'src/app/utils/validate-cnpj';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy, AfterViewInit {
    faTimes = faTimes;
	object: Empresa = new Empresa;
	erro: string = '';

	loading = false;
	loadingCNPJ = false;
    loadingCEP = false;
    loadingTipos = true;
    loadingRiscos = true;
    loadingCnaes = true;

	subscription: Subscription[] = [];
	routeBackOptions: any;
	emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    tipos: EmpresaTipo[] = [];
    riscoCompliance: EmpresaRiscoCompliance[] = [];
    cnaes: EmpresaCnae[] = [];
    cnaesSelected: EmpresaCnae[] = [];
	
    @ViewChild('template') template: TemplateRef<any>
	@ViewChild('icon') icon: TemplateRef<any>
	@ViewChild('cnpj') cnpj: NgModel;

	constructor(
		private activatedRoute: ActivatedRoute,
		private toastr: ToastrService,
		private modal: Modal,
		private crypto: Crypto,
		private empresaService: EmpresaService,
        private viaCEPService: ViaCEPService,
	) {
		this.routeBackOptions = { relativeTo: this.activatedRoute };



        // Risco compliance
        lastValueFrom(this.empresaService.getRiscoCompliance())
        .then(res => this.riscoCompliance = res)
        .finally(() => this.loadingRiscos = false);
        
        var riscoCompliance = this.empresaService.riscoCompliance.subscribe(res => this.riscoCompliance = res)
		this.subscription.push(riscoCompliance);
        
        // Tipo
        lastValueFrom(this.empresaService.getTipos())
        .then(res => this.tipos = res)
        .finally(() => this.loadingTipos = false);

        var tipos = this.empresaService.tipos.subscribe(res => this.tipos = res)
		this.subscription.push(tipos);
        
        // CNAES
        lastValueFrom(this.empresaService.getCnae())
        .then(res => {
            this.cnaes = res;
            this.setCnaeFilterBy();
        })
        .finally(() => this.loadingCnaes = false);

        var cnaes = this.empresaService.cnaes.subscribe(res => {
            this.cnaes = res;
            this.setCnaeFilterBy();
        })
		this.subscription.push(cnaes);
	}

	ngAfterViewInit(): void {
		this.modal.template.next(this.template)
		this.modal.style.next({ 'max-width': '800px' })
		this.modal.activatedRoute.next(this.activatedRoute);
		this.modal.icon.next(this.icon);

		var params = this.activatedRoute.params.subscribe(res => {
			if (res['id']) {
				this.modal.title.next('Editar empresa');
				this.modal.routerBack.next(['../../']);
				this.object.id = this.crypto.decrypt(res['id']);

				lastValueFrom(this.empresaService.get(this.object.id))
					.then(obj => {
						this.object = obj;
                        this.setCnaeSelected();
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
				this.modal.title.next('Cadastrar empresa');
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

    setCnaes(){
        this.object.cnaes = this.cnaesSelected.map(x => x.id)
    }

	validaCNPJ(input: NgModel) {
        this.erro = '';
		this.loadingCNPJ = true;

		if (!this.object.cnpj || this.object.cnpj == 0) {
			setTimeout(() => {
                this.cnpj.control.setErrors({ required: true });
            }, 300);
			this.loadingCNPJ = false;
			return;
		}

		var valid = validateCnpj(this.object.cnpj);
		if (!valid) {
			setTimeout(() => {
                this.cnpj.control.setErrors({ invalid: true });
            }, 300);
			this.loadingCNPJ = false;
			return;
		} else {

            lastValueFrom(this.empresaService.validaCNPJ(this.object.id, this.object.cnpj))
            .then(res => {
                this.loadingCNPJ = false;
                setTimeout(() => {
                    this.cnpj.control.setErrors(null);
                }, 300);
                this.erro = '';
            })
            .catch(res => {
                this.erro = getError(res);
				setTimeout(() => {
                    this.cnpj.control.setErrors({ jaCadastrado: this.erro });
                }, 300);
				this.loadingCNPJ = false;
            });
		}
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
			return lastValueFrom(this.empresaService.create(this.object));
		return lastValueFrom(this.empresaService.edit(this.object));
	}

    removeCnae(item: EmpresaCnae, input: MultiSelect) {
        var index = this.cnaesSelected.findIndex(x => x.id == item.id);
        if (index != -1) {
            this.cnaesSelected.splice(index, 1);
            this.setCnaes();
            input.updateModel(this.cnaesSelected);
        }
    }


    getEndereco(input: NgModel) {
        var erro = '';
        this.loadingCEP = true;
        input.control.setErrors(null);
        
        lastValueFrom(this.viaCEPService.getEndereco(this.object.cep))
        .then(res => {
            this.object.logradouro = res.logradouro;
            this.object.complemento = res.complemento;
            this.object.bairro = res.bairro;
            this.object.cidade = res.localidade;
            this.object.uf = res.uf;
            this.object.numero = '';
            this.loadingCEP = false;
        })
        .catch(res => {
            this.object.logradouro = '';
            this.object.complemento = '';
            this.object.bairro = '';
            this.object.cidade = '';
            this.object.uf = '';
            this.object.numero = '';
            this.loadingCEP = false;
            input.control.setErrors({ viacepError: res });
        })
    }

    setCnaeFilterBy() {
        this.cnaes = this.cnaes.map(x => {
            x.filterBy = x.codigo + x.descricao;
            return x;
        });
    }

    setCnaeSelected() {
        this.cnaesSelected = this.cnaes.filter(x => this.object.cnaes.includes(x.id));
    }

}
