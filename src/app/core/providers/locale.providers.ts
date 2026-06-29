import { LOCALE_ID, Provider, inject } from '@angular/core';
import { NZ_DATE_LOCALE, NZ_I18N, en_US, es_ES } from 'ng-zorro-antd/i18n';
import { enUS, es } from 'date-fns/locale';
import { UserService } from '../services/user.service';

const LOCALE_MAP = {
  es: { localeId: 'es-ES', nzI18n: es_ES, dateFns: es },
  en: { localeId: 'en-US', nzI18n: en_US, dateFns: enUS },
} as const;

function getLocaleConfig() {
  const lang = inject(UserService).selectedLang();
  return LOCALE_MAP[lang] ?? LOCALE_MAP.es;
}

export function provideLocale(): Provider[] {
  return [
    {
      provide: LOCALE_ID,
      useFactory: () => getLocaleConfig().localeId,
    },
    {
      provide: NZ_I18N,
      useFactory: () => getLocaleConfig().nzI18n,
    },
    {
      provide: NZ_DATE_LOCALE,
      useFactory: () => getLocaleConfig().dateFns,
    },
  ];
}
