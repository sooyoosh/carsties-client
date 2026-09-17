import { Component, signal } from '@angular/core';
//
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Auth } from './core/services/auth';



@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-web-app');

  constructor(
    private authService: Auth,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.checkAuth().subscribe(result => {
        console.log('APP AUTH:', result);
      });
    }
  }

}
