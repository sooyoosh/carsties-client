import { Component, OnInit, signal } from '@angular/core';
import { AuctionService } from '../../core/services/auction-service';
import { Auction, PagedResult } from '../../core/interfaces/pagedResult';
import { PaginatorState } from 'primeng/paginator';
import { AuctionStore } from '../../core/services/auction-store';

@Component({
  selector: 'app-listings',
  standalone: false,
  templateUrl: './listings.html',
  styleUrl: './listings.css',
})
export class Listings implements OnInit {
  allData: PagedResult<Auction> = {
    results: [],
    pageCount: 0,
    totalCount: 0
  }
  // data: Auction[];
  data = signal<Auction[]>([]);

  constructor(public auctionStore: AuctionStore) { }

  ngOnInit() {
    this.auctionStore.loadPage(1, 4);
  }

  onPageChange(event: PaginatorState): void {

    const page = (event.page ?? 0) + 1;
    const pageSize = event.rows ?? 4;

    this.auctionStore.loadPage(page, pageSize);
  }

  onSortChange(orderBy: string): void {
    this.auctionStore.sort(orderBy);
  }

  onFilterChange(filterBy: string): void {
    this.auctionStore.filter(filterBy);
  }

}
