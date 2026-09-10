import { Component, output } from '@angular/core';
import { SortOption } from '../../../core/interfaces/auctionSearchParams';





@Component({
  selector: 'app-auctionsort',
  standalone: false,
  templateUrl: './auctionsort.html',
  styleUrl: './auctionsort.css',
})
export class Auctionsort {

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

  selectedSort = 'new';

  onSortChange(): void {
    this.sortChange.emit(this.selectedSort);
  }



}
