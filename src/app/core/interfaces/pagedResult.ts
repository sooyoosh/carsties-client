export interface PagedResult<T>  {
results: T[]
pageCount: number
totalCount: number
}


export interface Auction {
  reservePrice: number;
  seller: string;
  winner?: string;
  soldamount: number;
  currentHighBid: number;
  createdAt: string;
  updatedAt: string;
  auctionEnd: string;
  status: string;
  make: string;
  model: string;
  year: number;
  color: string;
  milleage: number;
  imageUrl: string;
  id: string;
}