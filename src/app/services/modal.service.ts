import { EventEmitter, Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class ModalService {
    modalList: BehaviorSubject<Modal[]> = new BehaviorSubject<Modal[]>([]);
    browserRefresh: boolean;
    constructor(
        private router: Router,
        private location: Location,

    ) {
        this.browserRefresh = !router.navigated;
        this.router.events.subscribe(res => {
            if (res instanceof NavigationStart) {
                this.browserRefresh = !router.navigated;

            }
        })
    }


    voltar(where?: string[], options?: any) {
        if (where && where.length > 0) {
            this.router.navigate(where, options)
        } else {
            this.location.back();
        }
    }

    addModal(modal: Modal, where: string) {
        var list = this.modalList.value;
        
        var listOrderedById = list.sort((x,y) => x.id - y.id);
        var lastId = listOrderedById.length > 0 ? listOrderedById[listOrderedById.length - 1].id : 0;
        var newId = lastId + 1;
        modal.id = newId; 
        list.push(modal);
        
        if (this.browserRefresh) 
            list = this.modalList.value.sort((x,y) => y.id - x.id);
        this.modalList.next(list);
        
        setTimeout(() => {
            this.openModalAnimation(newId);
        }, 300);
        
        return modal;
    }

    updateModal(modal: Modal) {
        var list = this.modalList.value;
        var index = list.findIndex(x => x.id == modal.id)

        if (modal.id == 0 || index == -1) {
            modal.id = 0;
            this.addModal(modal, 'update modal');
        }
        else 
        {
            list.splice(index, 1, modal);
            this.modalList.next(list);
        }
    }
    
    removeModal(id: number) {
        var list = this.modalList.value;
        var index = list.findIndex(x => x.id == id);
        if (index != -1) {
            this.removeModalAnimation(id);
            setTimeout(() => {
                var modal = list[index];
                list.splice(index, 1);
                this.modalList.next(list);
                this.voltar(modal.routerBack, modal.routerBackOptions);
            }, 300);

        }
    }


    openModalAnimation(id: number) {
        $(`.modal[modal=${id}]`).addClass('active')
    }

    removeModalAnimation(id: number) {
        $(`.modal[modal=${id}]`).removeClass('active')
    }

}

export class Modal {
    id: number = 0;//////////////
    open: boolean = true;
    title: string = '';
    template?: TemplateRef<any>;
    icon?: TemplateRef<any>;
    style: any = { 'max-width': '1000px' };
    routerBack?: string[] = [];
    routerBackOptions?: any;
    activatedRoute?: ActivatedRoute;
    onClose?: EventEmitter<boolean> = new EventEmitter<boolean>();
    classList: string = '';
}

