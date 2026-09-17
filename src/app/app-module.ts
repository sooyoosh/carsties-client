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
import { MenuModule } from 'primeng/menu';
import { Create } from './features/create/create';
import { Detail } from './features/detail/detail';
import { Update } from './features/update/update';
import { AuctionForm } from './shared/components/auction-form/auction-form';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    Create,
    Detail,
    Update,
    AuctionForm,
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
    MenuModule,
    InputNumberModule,
    DatePickerModule,
    ReactiveFormsModule,
    ToastModule,
    AuthModule.forRoot({
      config: {
        authority: 'http://localhost:5001',
        redirectUrl: 'http://localhost:4200/auth-callback',
        postLogoutRedirectUri: 'http://localhost:4200',
        clientId: 'angApp',
        responseType: 'code',
        scope: 'openid profile auctionApp offline_access',
        useRefreshToken: true,
        secureRoutes: [
          'http://localhost:5106/'
        ],

        logLevel: LogLevel.Debug,
      },
    }),
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

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
export class AppModule { }
