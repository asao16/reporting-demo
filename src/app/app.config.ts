import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { en_US, NZ_I18N, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { enUS } from 'date-fns/locale';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes, withComponentInputBinding()),
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_DATE_LOCALE, useValue: enUS },
  ],
};
