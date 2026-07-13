import { Injectable, signal, effect, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root', })
export class LanguageService {
  private translate = inject(TranslateService);

  private initialLanguage =
    localStorage.getItem('app_a_portfolio_language') || 'ES';
  private languageSignal = signal<string>(this.initialLanguage);

  public currentLanguage = this.languageSignal.asReadonly();

  constructor() {
    this.translate.use(this.initialLanguage);

    effect(() => {
      const lang = this.currentLanguage();
      localStorage.setItem('app_a_portfolio_language', lang);
      this.translate.use(lang);
    });
  }

  changeLanguage(language: string) {
    this.languageSignal.set(language);
  }

  isThisLanguage(language: string) {
    return this.currentLanguage() === language;
  }

  getTranslation(key: string) {
    return this.translate.instant(key);

  }
}