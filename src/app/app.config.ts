import { MessageService } from 'primeng/api';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpInterceptorInterceptor } from './http-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    MessageService,
    importProvidersFrom(BrowserModule, BrowserAnimationsModule), 
    provideHttpClient(withFetch(),withInterceptors([httpInterceptorInterceptor])),
  ],
};
