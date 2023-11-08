import { lastValueFrom } from 'rxjs';
import { AccountService } from './../services/account.service';
import { Router } from '@angular/router';

export function appInitializer(
    accountService: AccountService,
    router: Router,
) {
    return () => new Promise<void>((resolve, reject) => {
        lastValueFrom(accountService.refreshToken())
        .then(res => {
            if (window.location.pathname == '/account/login') {
                var returnUrl = window.location.search;
                var array = returnUrl.split('?returnUrl=');
                returnUrl = array[array.length - 1]
                if (returnUrl.trim()) {
                    router.navigateByUrl(decodeURIComponent(returnUrl))
                } else {
                    router.navigate([''])
                }
            }
        })
        .catch(res => {

        })
        .finally(() => {
            resolve();
        })
    });
}