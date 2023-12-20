import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faFileImage, faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MultiSelect } from 'primeng/multiselect';
import { Subscription, lastValueFrom } from 'rxjs';
import { Empresa, EmpresaCnae, EmpresaRiscoCompliance, EmpresaTipo } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ViaCEPService } from 'src/app/services/viacep.service';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { validateCnpj } from 'src/app/utils/validate-cnpj';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy, AfterViewInit {
    faTimes = faTimes;
    faImage = faImage;
	object: Empresa = new Empresa;
	erro: string = '';

	loading = false;
	loadingCNPJ = false;
    loadingCEP = false;
    
	subscription: Subscription[] = [];
    modal: Modal = new Modal;
	emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    activeIndex = 0;

    tipos: EmpresaTipo[] = [];
    loadingTipos = true;
    riscoCompliance: EmpresaRiscoCompliance[] = [];
    loadingRiscos = true;
    cnaes: EmpresaCnae[] = [];
    loadingCnaes = true;
    cnaesSelected: EmpresaCnae[] = [];
	
    @ViewChild('template') template: TemplateRef<any>
	@ViewChild('icon') icon: TemplateRef<any>
	@ViewChild('cnpj') cnpj: NgModel;

    loadingIframe = false;
    iframeError = '';

    loadingImage = false;


	constructor(
		private activatedRoute: ActivatedRoute,
		private toastr: ToastrService,
        private modalService: ModalService,
		private crypto: Crypto,
		private empresaService: EmpresaService,
        private viaCEPService: ViaCEPService,
	) {
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
        this.modal.id =  0;
        this.modal.template =  this.template;
        this.modal.icon =  this.icon;
        this.modal.style =  { 'max-width': '800px' };
        this.modal.activatedRoute =  this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        
		var params = this.activatedRoute.params.subscribe(res => {
            if (res['empresa_id']) {
                this.modal.title = 'Editar Empresa';
                this.modal.routerBack = ['../../'];
				this.object.id = this.crypto.decrypt(res['empresa_id']);

				lastValueFrom(this.empresaService.get(this.object.id))
					.then(obj => {
						this.object = obj;
                        this.setCnaeSelected();
						setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'empresa');
						}, 100);
					})
					.catch(err => {
                        this.voltar();
						this.toastr.error('This page could not be accessed');
					});
			} else {
                this.modal.routerBack = ['../'];
                this.modal.title = 'Cadastrar Empresa';
				setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'empresa');
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

    tabChange(e: any) {
        this.modal.classList = 'active';
        if (this.activeIndex == 1) {
            this.modal.style.minHeight = '70vh'
        } else {
            delete this.modal.style.minHeight;
        }
        this.modalService.updateModal(this.modal)
    }

    loadCronogramaIframe(what: string) {
        $('#iframe').html('')   
        if (this.object.cronogramaImplantacaoURL) {
            console.log('if', what)
            var iframe: HTMLIFrameElement = document.createElement('iframe');
            iframe.height = '1000px';
            this.loadingIframe = true
            var classe = this;
            if (what == 'url') {
                iframe.src = this.object.cronogramaImplantacaoURL;
            } 
            else if (what == 'embed') {
                iframe = $(this.object.cronogramaImplantacaoURL).get(0) as HTMLIFrameElement
            }


            
            iframe.onload = function(e) { 
                classe.loadingIframe = false
                classe.iframeError = '';
            };
            iframe.onerror = function(e) { 
                classe.loadingIframe = false;
                classe.iframeError = 'Não foi possível carregar documento.';
            };
            
            $('#iframe').append(iframe)
        } else {
        }
    }

    loadLogoImage(e: any) {
        var file =  e.target.files[0] as File;
        
        if (file) {
            const reader = new FileReader();
            var classe = this;
            this.loadingImage = true;
            reader.addEventListener(
                "load",
                () => {
                    // convert image file to base64 string
                    classe.object.logoDataUri = reader.result as string;
                    classe.loadingImage = false;
                },
                false,
            );
            
            reader.readAsDataURL(file);
        }
    }

	send(form: NgForm) {
		if (form.invalid) {
			this.toastr.error('Um ou mais campos são inválidos.');
			this.erro = 'Um ou mais campos são inválidos.';
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
			return lastValueFrom(this.empresaService.create(this.object));
		return lastValueFrom(this.empresaService.edit(this.object));
	}
}
