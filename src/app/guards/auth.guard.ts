import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
// import { AccountService } from '../services/account.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        // private accountService: AccountService,
        private router: Router,
        private toastr: ToastrService,
    ) {

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // const account = this.accountService.accountValue;
        // if (!account) {
        //     return this.voltar(state);
        // } else {
        //     const jwtToken = JSON.parse(atob(account?.jwtToken.split('.')[1]));
        //     const expires = new Date(jwtToken.exp * 1000);
        //     // const timeout = expires.getTime() - Date.now() - (60 * 1000);
        //     if (new Date() > expires) {
        //         return this.voltar(state);
        //     }
            return true;
        // }
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (Error) {
            return null;
        }
    }

    voltar(state: RouterStateSnapshot) {
        this.toastr.error(`Acesso não autorizado. <br> Faça login.`, '');
        this.router.navigate(['account', 'login'], { queryParams: { returnUrl: state.url } })
        // this.accountService.setAccount(undefined)
        return false;
    }
}
