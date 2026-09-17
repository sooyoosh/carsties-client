import { Component, OnInit } from '@angular/core';
import { AuctionStore } from '../../../core/services/auction-store';
import { Auth } from '../../../core/services/auth';
import { AuthenticatedResult, OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { Observable, take } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  menuItems: MenuItem[] = [];
  searchValue = '';
  userData$: Observable<UserDataResult>;
  isAuthenticated$: Observable<AuthenticatedResult>;

  constructor(private auctionStore: AuctionStore, private authService: Auth, public oidcSecurityService: OidcSecurityService,
    private route: ActivatedRoute, private router: Router
  ) {
    this.userData$ = this.oidcSecurityService.userData$;
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;

  }

  ngOnInit() {
    //initial menu
    this.menuItems = [
      {
        label: 'My Auctions',
        icon: 'bi bi-car-front',
        command: () => {
          this.myAuctions();
        }
      },
      {
        label: 'Auctions Won',
        icon: 'bi bi-trophy',
        command: () => {
          this.auctionsWon();
        }
      },
      {
        label: 'Sell My Car',
        icon: 'bi bi-plus-circle',
        command: () => {

        },
        routerLink: '/create'
      },
      {
        label: 'Session',
        icon: 'bi bi-person-check',
        command: () => {
          console.log('Session');
        }
      },
      {
        separator: true
      },
      {
        label: 'Sign Out',
        icon: 'bi bi-box-arrow-right',
        command: () => {
          this.logout();
        }
      }
    ];
    //initial menu
  }


  onSearch(value: string): void {

    if (this.router.url !== '/') {

      this.router.navigate(['/']).then(() => {
        this.auctionStore.search(value);
      });

      return;
    }

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
    this.oidcSecurityService.logoff().subscribe({
      next: (result) => {
        //
      },
      error: (error) => {
        console.error('LOGOUT ERROR', error);
      },
    });
  }

  myAuctions(): void {
    this.userData$.pipe(take(1)).subscribe(userData => {
      const username = userData.userData?.username;

      if (username) {
        this.auctionStore.setSeller(username);
      }
    });
  }

  auctionsWon(): void {
    this.userData$.pipe(take(1)).subscribe(userData => {
      const username = userData.userData?.username;

      if (username) {
        this.auctionStore.setWinner(username);
      }
    });
  }
}
