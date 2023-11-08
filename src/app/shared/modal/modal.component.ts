import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faEdit, faTrash, faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnChanges {
    @Input() title?: string = '';
    @Input() template?: TemplateRef<any>;
    @Input() style?: object = {'max-width': '1000px'};
    @Input() routerBack?: string[] = [];
    @Input() activatedRoute?: ActivatedRoute;
    @Output() onClose?: EventEmitter<boolean> = new EventEmitter<boolean>();
    modalOpen = false;

    iconTitle: IconDefinition = faCheck;
    @Input() icon?: TemplateRef<any>;

    constructor(
        private modal: Modal,
        private router: Router,
    ) {
        this.modal.getOpen().subscribe(res => this.modalOpen = res);
    }


    setIcon() {
        if (this.title?.toLowerCase().includes('cadastrar')) {
            this.iconTitle = faPlus;        } else if (this.title?.toLowerCase().includes('editar')) {
            this.iconTitle = faEdit;        } else if (this.title?.toLowerCase().includes('excluir')) {
            this.iconTitle = faTrash;        }
    }

    voltar() {
        // this.modal.voltar('modal component');
        this.modal.voltar(this.routerBack, {relativeTo: this.activatedRoute});
        this.onClose?.emit(true);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['title']) {
            this.title = changes['title'].currentValue;            
            this.setIcon();        
        }
        if (changes['icon']) this.icon = changes['icon'].currentValue;
        if (changes['template'])  this.template = changes['template'].currentValue;        
        if (changes['style']) this.style = changes['style'].currentValue;        
        if (changes['style']) this.style = changes['style'].currentValue;        
        if (changes['activatedRoute']) this.activatedRoute = changes['activatedRoute'].currentValue;    }
}
