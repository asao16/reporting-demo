import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { es_ES, NZ_DATE_LOCALE, NZ_I18N } from 'ng-zorro-antd/i18n';
import { es } from 'date-fns/locale';

import { appRoutes } from './app.routes';

registerLocaleData(localeEs, 'es');
registerLocaleData(localeEs, 'es-ES');
registerLocaleData(localeEn, 'en');
registerLocaleData(localeEn, 'en-US');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes, withComponentInputBinding()),
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: NZ_I18N, useValue: es_ES },
    { provide: NZ_DATE_LOCALE, useValue: es },
  ],
};
