export interface CreateAuction {
  make: string;
  model: string;
  year: number | null;
  color: string;
  milleage: number | null;
  imageUrl: string;
  reservePrice: number | null;
  auctionEnd: Date | null;
}