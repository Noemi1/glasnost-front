import { HostListener, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Crypto } from "./crypto";

@Injectable({
    providedIn: 'root'
})
export class IsMobile {

    value: BehaviorSubject<ScreenWidth> = new BehaviorSubject<ScreenWidth>(ScreenWidth.lg);

    constructor() {
        this.set();
    }
    
    @HostListener('window:resize', ['$event'])
    set() {
        if (window.innerWidth < 768 ) {
            this.value.next(ScreenWidth.sm)
        } else if (window.innerWidth < 992) {
            this.value.next(ScreenWidth.md)
        } else if (window.innerWidth < 1200) {
            this.value.next(ScreenWidth.lg)
        } else {
            this.value.next(ScreenWidth.xl)
        }
    }

    get() {
      return this.value;
    }
}


export enum ScreenWidth {
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl'
}
