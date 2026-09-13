import { Component, output } from '@angular/core';
import { SortOption } from '../../../core/interfaces/auctionSearchParams';
import { AuctionStore } from '../../../core/services/auction-store';





@Component({
  selector: 'app-auctionsort',
  standalone: false,
  templateUrl: './auctionsort.html',
  styleUrl: './auctionsort.css',
})
export class Auctionsort {

  constructor(public auctionStore: AuctionStore) {}


  sortOptions: SortOption[] = [
    {
      label: 'Alphabetical',
      icon: 'bi-sort-alpha-down',
      value: 'make'
    },
    {
      label: 'End date',
      icon: 'bi-hourglass-split',
      value: 'endingSoon'
    },
    {
      label: 'Recently added',
      icon: 'bi-clock-history',
      value: 'new'
    },
  ];

  sortChange = output<string>();

  // selectedSort = 'new';

  onSortChange(value:string): void {
    this.sortChange.emit(value);
  }



}
