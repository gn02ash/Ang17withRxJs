import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), {
    provide: MatDialogRef,
    useValue: {}
  },
  provideClientHydration(), provideHttpClient()]
};
