export interface AuctionSearchParams {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;
  filterBy?: string;
  winner?: string;
  seller?: string;
}


export interface SortOption {
  label: string;
  icon: string;
  value: string;
}
export interface FilterOption {
  label: string;
  icon: string;
  value: string;
}