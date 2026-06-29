import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

const SUPPORTED_LANGS = ['es', 'en'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const languageGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const lang = route.paramMap.get('lang');

  if (!lang || !SUPPORTED_LANGS.includes(lang as SupportedLang)) {
    return router.createUrlTree(['/es']);
  }

  userService.selectLang(lang as SupportedLang);
  return true;
};
