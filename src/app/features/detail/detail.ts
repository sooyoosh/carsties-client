import { Component, signal } from '@angular/core';
import { Auction } from '../../core/interfaces/pagedResult';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../core/services/auction-service';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {

  auction = signal<Auction | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
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
      },
      error: error => {
        console.error('Failed to load auction:', error);
        this.loading.set(false);
      }
    });
  }



}
