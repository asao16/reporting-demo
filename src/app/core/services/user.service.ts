import { Injectable, signal } from '@angular/core';
import { SupportedLang } from '../guards/language.guard';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _selectedLang = signal<SupportedLang>('es');
  readonly selectedLang = this._selectedLang.asReadonly();

  selectLang(lang: SupportedLang): void {
    this._selectedLang.set(lang);
  }
}
