import { Component, OnInit } from '@angular/core';
import { AuctionStore } from '../../../core/services/auction-store';
import { Auth } from '../../../core/services/auth';
import { AuthenticatedResult, OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  searchValue = '';
  userData$: Observable<UserDataResult>;
  isAuthenticated$: Observable<AuthenticatedResult>;

  constructor(private auctionStore: AuctionStore, private authService: Auth, public oidcSecurityService: OidcSecurityService) {
    this.userData$ = this.oidcSecurityService.userData$;
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
  }

  ngOnInit() {

  }


  onSearch(value: string): void {
    this.auctionStore.search(value);
  }

  onLogoClick(): void {
    this.searchValue = '';
    this.auctionStore.reset();
  }

  login(): void {
    this.authService.login();
  }
  // logout(): void {
  //   this.authService.logout();
  // }
    logout(): void {
    console.log('LOGOUT START');

    this.oidcSecurityService.logoff().subscribe({
      next: (result) => {
        console.log('LOGOUT RESULT', result);
      },
      error: (error) => {
        console.error('LOGOUT ERROR', error);
      },
    });
  }
}
