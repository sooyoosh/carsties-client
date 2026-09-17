import { Component, inject, signal } from '@angular/core';
import { Auction } from '../../core/interfaces/pagedResult';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../../core/services/auction-service';
import { Auth } from '../../core/services/auth';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ToastService } from '../../core/services/toast-service';


@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {

  auction = signal<Auction | null>(null);
  loading = signal(true);
  isOwner = signal(false);

  private oidcSecurityService = inject(OidcSecurityService);

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading.set(false);
      return;
    }

    this.auctionService.getAuctionById(id).subscribe({
      next: auction => {
        this.auction.set(auction);
        this.loading.set(false);

        this.checkOwner();
      },
      error: error => {
        console.error('Failed to load auction:', error);
        this.loading.set(false);
      }
    });
  }

  checkOwner(): void {

    this.oidcSecurityService.userData$.subscribe(userData => {

      const username = userData.userData?.username;
      const auction = this.auction();

      if (username && auction) {
        this.isOwner.set(username === auction.seller);
      }

      console.log('isOwner:', this.isOwner());
    });
  }
  goToUpdate(id: string) {
    this.router!.navigate([`update`, id])
  }
  deleteAuction(id: string) {
    this.auctionService.deleteAuction(id).subscribe({
      next: (res) => {
        this.toastService.success(
          'Auction Deleted',
          'Auction deleted successfully.'
        );
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);

      },
    })
  }
}