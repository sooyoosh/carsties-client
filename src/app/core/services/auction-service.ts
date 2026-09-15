import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auction, PagedResult } from '../interfaces/pagedResult';
import { AuctionSearchParams } from '../interfaces/auctionSearchParams';
import { CreateAuction } from '../interfaces/createAuction';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {


  private readonly apiSearchUrl = 'http://localhost:5106/search';
  private readonly apiAuctionUrl='http://localhost:5106/auctions';


  constructor(private http: HttpClient) { }

  // getAll(pageNumber: number = 1, pageSize: number = 4) {
  //   return this.http.get<PagedResult<Auction>>(this.apiSearchUrl, { params: { pageNumber, pageSize } })
  // }


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
          : {}),
              ...(params.winner
          ? { winner: params.winner }
          : {}),
              ...(params.seller
          ? { seller: params.seller }
          : {}),
        }
      }
    );
  }



  createAuction(auctionDto:CreateAuction){
    return this.http.post(
      this.apiAuctionUrl,auctionDto
    )
  }


  getAuctionById(id:string){
    return this.http.get<Auction>(
      `${this.apiAuctionUrl}/${id}`
    )
  }

}
