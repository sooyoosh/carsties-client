import { Injectable, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { AuctionService } from './auction-service';
import { Auction, PagedResult } from '../interfaces/pagedResult';

@Injectable({
  providedIn: 'root'
})
export class AuctionStore {

  private searchSubject = new Subject<string>();

  data = signal<Auction[]>([]);

  totalRecords = signal(0);

  searchTerm = signal('');
  orderBy = signal('new');
  filterBy = signal('live');
  winner=signal('');
  seller=signal('');



  page = signal(1);

  pageSize = signal(4);

  constructor(private auctionService: AuctionService) {

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm =>
        this.auctionService.search({
          searchTerm: searchTerm || undefined,
          orderBy: this.orderBy(),
          filterBy: this.filterBy(),
          winner: this.winner(),
          seller: this.seller(),
          pageNumber: 1,
          pageSize: this.pageSize()
        })
      )
    ).subscribe(result => {
      this.data.set(result.results);
      this.totalRecords.set(result.totalCount);
      this.page.set(1);
    });



  }

  search(value: string): void {
    this.searchTerm.set(value);
    this.searchSubject.next(value);
  }

  sort(value: string): void {
    this.orderBy.set(value);

    this.loadPage(1, this.pageSize());
  }

  filter(value: string): void {
    this.filterBy.set(value);

    this.loadPage(1, this.pageSize());
  }

  setWinner(value:string):void{
    this.winner.set(value);
    this.loadPage(1, this.pageSize());
  }

  setSeller(value:string):void{
    this.seller.set(value);
    this.loadPage(1, this.pageSize());
  }


  loadPage(page: number, pageSize: number): void {

    this.page.set(page);
    this.pageSize.set(pageSize);
    
    this.auctionService.search({
      searchTerm: this.searchTerm() || undefined,
      orderBy: this.orderBy(),
      filterBy: this.filterBy(),
      winner: this.winner(),
      seller: this.seller(),
      pageNumber: page,
      pageSize
    }).subscribe(result => {
      this.data.set(result.results);
      this.totalRecords.set(result.totalCount);
    });
  }

  reset(): void {
    this.searchTerm.set('');
    this.orderBy.set('new');
    this.filterBy.set('live');
    this.winner.set('');
    this.seller.set('');

    this.loadPage(1, this.pageSize());
  }
}