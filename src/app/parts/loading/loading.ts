import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    loading = new BehaviorSubject<boolean>(false);
    loadingRequests = new BehaviorSubject<boolean[]>([]);

    constructor() { }

    addLoadingRequest() {
        var values = this.loadingRequests.value;
        values.push(true);
        this.loadingRequests.next(values);
    }
    
    removeLoadingRequest() {
        var values = this.loadingRequests.value;
        values.pop();
        this.loadingRequests.next(values);
    }
}