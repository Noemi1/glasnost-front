import { Component, HostListener } from '@angular/core';
import { IsMobile } from './utils/mobile';
import { Modal } from './utils/modal-open';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        private isMobile: IsMobile,
        private modal: Modal,
    ) {
        this.isMobile.set();
        this.modal.setOpen(false);
    }
    @HostListener('window:resize', ['$event'])
    set() {
        this.isMobile.set();
    }

}
