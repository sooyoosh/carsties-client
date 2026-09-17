import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';


@Injectable({
  providedIn: 'root',
})
export class Auth {

  userData$;

  constructor(
    private oidcSecurityService: OidcSecurityService
  ) {
    this.userData$ = this.oidcSecurityService.userData$;
   }

  checkAuth() {
    return this.oidcSecurityService.checkAuth();
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout() {
    return this.oidcSecurityService.logoff();
  }


}
