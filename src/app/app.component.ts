import { Component, HostListener } from '@angular/core';
import { IsMobile } from './utils/mobile';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        private isMobile: IsMobile,
    ) {
        this.isMobile.set();
    }
    @HostListener('window:resize', ['$event'])
    set() {
        this.isMobile.set();
    }

}
