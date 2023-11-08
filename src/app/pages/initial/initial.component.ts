import { Component, EventEmitter, OnDestroy, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/utils/header';
import { Modal } from 'src/app/utils/modal-open';
import { SwipeService } from 'src/app/utils/swipe';
import { Table } from 'src/app/utils/table';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnDestroy {

    modoEscuroAtivado = false;
    modalOpen = false;
    navigationOpen = false;
    loading = false;
    subscription: Subscription[] = [];

    private swipeCoord?: [number, number];
    private swipeTime?: number;

    
    title = '';
    template: TemplateRef<any> | undefined = undefined;
    style: object = { 'max-width': '1000px' };
    routerBack: string[] = [];
    activatedRoute: ActivatedRoute | undefined = undefined;
    onClose = new EventEmitter();
    icon: TemplateRef<any> | undefined = undefined;

    constructor(
        private modal: Modal,
        private table: Table,
        private header: Header,
        private swipeService: SwipeService
    ) {
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        var open = this.header.open.subscribe(res => this.navigationOpen = res);
        var loading = this.table.loading.subscribe(res => this.loading = res);
        this.subscription.push(getOpen);
        this.subscription.push(open);
        this.subscription.push(loading);
        this.modal.setOpen(false);

        this.modal.title.subscribe(res => this.title = res);
        this.modal.template.subscribe(res => this.template = res);
        this.modal.style.subscribe(res => this.style = res);
        this.modal.routerBack.subscribe(res => this.routerBack = res);
        this.modal.activatedRoute.subscribe(res => this.activatedRoute = res);
        this.modal.onClose.subscribe(res => this.onClose = res);
        this.modal.icon.subscribe(res => this.icon = res);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    swipe(e: TouchEvent, when: string): void {
        const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        const time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }
        else if (when === 'end') {
            const direction = [coord[0] - this.swipeCoord![0], coord[1] - this.swipeCoord![1]];
            const duration = time - this.swipeTime!;
            if (duration < 1000
                && Math.abs(direction[0]) > 30
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
                if (direction[0] < 0) {
                    //next
                    this.swipeService.swipePrevious();
                } else {
                    //previous
                    this.swipeService.swipeNext();
                }
            }
        }
    }

}
