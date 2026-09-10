import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [App, Navbar, Listings, Countdown, Carimage, AppPagination, Auctionsort],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    SelectModule
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
