export interface AuctionSearchParams {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;
  filterBy?: string;
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