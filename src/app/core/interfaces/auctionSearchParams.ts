export interface AuctionSearchParams {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;
}


export interface SortOption {
  label: string;
  icon: string;
  value: string;
}