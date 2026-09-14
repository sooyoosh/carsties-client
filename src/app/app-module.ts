import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//new config
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { ButtonModule } from 'primeng/button';
import { Navbar } from './shared/components/navbar/navbar';
import { Listings } from './features/listings/listings';
import { Countdown } from './shared/components/countdown/countdown';
import { Carimage } from './shared/components/carimage/carimage';
import { AppPagination } from './shared/components/app-pagination/app-pagination';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Auctionsort } from './shared/components/auctionsort/auctionsort';
import { SelectModule } from 'primeng/select';
import { AuctionFilter } from './shared/components/auction-filter/auction-filter';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { AuthCallback } from './core/components/auth-callback/auth-callback';
import { Home } from './features/home/home';

@NgModule({
  declarations: [
    App,
    Navbar,
    Listings,
    Countdown,
    Carimage,
    AppPagination,
    Auctionsort,
    AuctionFilter,
    AuthCallback,
    Home,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    SelectModule,
    AuthModule.forRoot({
      config: {
        authority: 'http://localhost:5001',
        redirectUrl: 'http://localhost:4200/auth-callback',
        postLogoutRedirectUri: 'http://localhost:4200',
        clientId: 'angApp',
        responseType: 'code',
        scope: 'openid profile auctionApp',
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    }),
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App],
})
export class AppModule {}
