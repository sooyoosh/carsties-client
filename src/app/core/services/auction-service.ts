import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auction, PagedResult } from '../interfaces/pagedResult';
import { AuctionSearchParams } from '../interfaces/auctionSearchParams';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {


  private readonly apiSearchUrl = 'http://localhost:5106/search';

  constructor(private http: HttpClient) { }

  getAll(pageNumber: number = 1, pageSize: number = 4) {
    return this.http.get<PagedResult<Auction>>(this.apiSearchUrl, { params: { pageNumber, pageSize } })
  }


  search(params: AuctionSearchParams) {
    return this.http.get<PagedResult<Auction>>(
      this.apiSearchUrl,
      {
        params: {
          pageNumber: params.pageNumber ?? 1,
          pageSize: params.pageSize ?? 4,
          ...(params.searchTerm
            ? { searchTerm: params.searchTerm }
            : {}),
              ...(params.orderBy
          ? { orderBy: params.orderBy }
          : {}),
              ...(params.filterBy
          ? { filterBy: params.filterBy }
          : {})
        }
      }
    );
  }

}
