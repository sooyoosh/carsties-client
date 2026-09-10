import { Component, input, output } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-app-pagination',
  standalone: false,
  templateUrl: './app-pagination.html',
  styleUrl: './app-pagination.css',
})
export class AppPagination {

  first = input(0);
  rows = input(4);
  totalRecords = input(0);

  pageChange = output<PaginatorState>();

  onPageChange(event: PaginatorState): void {
    this.pageChange.emit(event);
  }

}
