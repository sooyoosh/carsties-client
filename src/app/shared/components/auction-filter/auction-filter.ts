import { Component, output } from '@angular/core';
import { FilterOption } from '../../../core/interfaces/auctionSearchParams';
import { AuctionStore } from '../../../core/services/auction-store';

@Component({
  selector: 'app-auction-filter',
  standalone: false,
  templateUrl: './auction-filter.html',
  styleUrl: './auction-filter.css',
})
export class AuctionFilter {


  constructor(public auctionStore: AuctionStore) {}


  filterOptions: FilterOption[] = [
    {
      label: 'Live Auctions',
      icon: 'bi-broadcast',
      value: 'live'
    },
    {
      label: 'Ending < 6 hours',
      icon: 'bi-hourglass-split',
      value: 'endingSoon'
    },
    {
      label: 'Completed',
      icon: 'bi-check-circle',
      value: 'finished'
    },
  ];

  filterChange = output<string>();

  // selectedFilter = 'live';

  onFilterChange(value:string): void {
    this.filterChange.emit(value);
  }


}
