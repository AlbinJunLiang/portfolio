import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TRANSLATE_SERVICE_CONFIG } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),

    provideTranslateService(),

    { 
      provide: TRANSLATE_SERVICE_CONFIG, 
      useValue: { defaultLanguage: 'ES' } 
    },

    provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json',
      enforceLoading: true
    }),

    provideRouter(routes)
  ]
};