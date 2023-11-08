import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/parts/loading/loading';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnDestroy {

    loading = false;
    loadingRequest: boolean[] = [];
    subscription: Subscription[] = [];
    constructor(
        private loadingUtils: LoadingService,
    ) {
        var loading = this.loadingUtils.loading.subscribe(res => this.loading = res);
        var loadingRequests = this.loadingUtils.loadingRequests.subscribe(res => this.loadingRequest = res);
        
        this.subscription.push(loading);
        this.subscription.push(loadingRequests);
    }
    
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

}
