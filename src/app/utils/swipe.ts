import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Header } from './header';
@Injectable({
    providedIn: 'root'
})
export class SwipeService {
    private messageSource = new BehaviorSubject<string>('');
    currentMessage = this.messageSource.asObservable();

    constructor(
        private header: Header
    ) { }

    setDirection(message: string) {
        this.messageSource.next(message);
    }
    public swipePrevious() {
        this.header.setMenuAside(false)
        this.setDirection('previous');
    }
    public swipeNext() {
        this.header.setMenuAside(true)
        this.setDirection('next');
    }
}