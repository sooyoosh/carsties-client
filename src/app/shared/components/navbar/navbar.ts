import { Component, OnInit } from '@angular/core';
import { AuctionStore } from '../../../core/services/auction-store';



@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  searchValue = '';

  constructor(private auctionStore: AuctionStore) {

  }

  ngOnInit() {

  }


  onSearch(value: string): void {
    this.auctionStore.search(value);
  }

  onLogoClick(): void {
    this.searchValue = '';
    this.auctionStore.reset();
  }


}
