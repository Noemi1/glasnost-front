import { Location } from "@angular/common";
import { EventEmitter, Injectable, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IconDefinition, faCheck } from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class Modal {
    openSubject = new BehaviorSubject<boolean>(false);

    title = new BehaviorSubject<string>('');
    template = new BehaviorSubject<TemplateRef<any> | undefined>(undefined);
    style = new BehaviorSubject< object>({'max-width': '1000px'});
    routerBack = new BehaviorSubject<string[]>([]);
    activatedRoute = new BehaviorSubject<ActivatedRoute | undefined>(undefined);
    onClose = new BehaviorSubject<EventEmitter<boolean>>(new EventEmitter())
    icon = new BehaviorSubject<TemplateRef<any> | undefined>(undefined);
    onPaste: EventEmitter<ClipboardEvent> = new EventEmitter;

    constructor(
        private location: Location,
        private router: Router
    ) { 
    }

    resetModal() {
        this.setOpen(false)
        this.title.next('');
        this.template.next(undefined);
        this.style.next({'max-width': '1000px'});
        this.routerBack.next([]);
        this.activatedRoute.next(undefined);
        this.onClose.next(new EventEmitter())
        this.icon.next(undefined);
    }

    getOpen(): BehaviorSubject<boolean> {
        let value = this.openSubject.value ?? localStorage.getItem('modal') === 'true' ? true : false;
        if(this.openSubject.value != undefined) {
            return this.openSubject;
        } else {
            this.openSubject.next(value)
        }
        return this.openSubject;
    }
    
    setOpen(value: boolean) {
        this.openSubject.next(value);
        localStorage.setItem('modal', value.toString())
    }

    voltar(where?: string[], options?: any) {
        this.setOpen(false);
        // this.router.dispose()
        setTimeout(() => {
            if (where && where.length > 0) {
                this.router.navigate(where, options)
            } else {
                this.location.back();
            }
        }, 200);
    }
}
