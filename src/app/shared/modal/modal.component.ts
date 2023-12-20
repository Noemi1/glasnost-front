import { Component, OnDestroy } from '@angular/core';

import { Modal, ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnDestroy {
    modalList: Modal[] = [];
    subscription: Subscription[] = [];

    constructor(
        private modalService: ModalService,
    ) {
        var list = this.modalService.modalList.subscribe(res => {
            this.modalList = res;
        });
        this.subscription.push(list);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar(id: number){
        console.log('voltar')
        this.modalService.removeModal(id);
    }

}
