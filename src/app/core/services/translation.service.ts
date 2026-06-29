import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { from, map } from 'rxjs';

@Injectable()
export class TranslationService {
  private lang = 'es';
  private readonly loadedKeys = new Set<string>();
  private readonly translationsByLang: Record<string, Record<string, string>> = {};
  private readonly _translations = signal<Record<string, string>>({});

  readonly translations = this._translations.asReadonly();

  setLanguage(lang: string): void {
    this.lang = lang;

    const cached = this.translationsByLang[lang];
    if (cached) {
      this._translations.set(cached);
    }

    document.documentElement.lang = lang;
  }

  async loadNamespaces(namespaces: string[]): Promise<void> {
    const lang = this.lang;
    const pending = namespaces.filter((ns) => !this.loadedKeys.has(`${lang}:${ns}`));
    if (!pending.length) {
      this._translations.set(this.translationsByLang[lang] ?? {});
      return;
    }

    const results = await Promise.all(
      pending.map((ns) =>
        fetch(`i18n/${lang}/${ns}.json`)
          .then((response) => (response.ok ? response.json() : {}))
          .catch(() => ({})),
      ),
    );

    const merged: Record<string, string> = {};
    for (const namespace of results) {
      Object.assign(merged, namespace);
    }

    const nextTranslations = {
      ...(this.translationsByLang[lang] ?? {}),
      ...merged,
    };

    this.translationsByLang[lang] = nextTranslations;
    pending.forEach((ns) => this.loadedKeys.add(`${lang}:${ns}`));

    if (this.lang === lang) {
      this._translations.set(nextTranslations);
    }
  }

  get(key: string, params: Record<string, string | number> = {}): string {
    const value = this._translations()[key] ?? key;
    return Object.entries(params).reduce(
      (text, [param, replacement]) => text.replaceAll(`{${param}}`, String(replacement)),
      value,
    );
  }
}

export function loadTranslations(...namespaces: string[]): ResolveFn<boolean> {
  return (route: ActivatedRouteSnapshot) => {
    const translationService = inject(TranslationService);
    let currentRoute: ActivatedRouteSnapshot | null = route;
    let lang: string | null = null;

    while (currentRoute && !lang) {
      lang = currentRoute.paramMap.get('lang');
      currentRoute = currentRoute.parent;
    }

    translationService.setLanguage(lang ?? 'es');
    return from(translationService.loadNamespaces(namespaces)).pipe(map(() => true));
  };
}
