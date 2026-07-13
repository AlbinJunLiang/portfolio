import { Component, effect, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/ui/language-service';
import { DisplayedTextService } from '../../core/services/ui/display-text-service';
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from '@ngx-translate/core';
import { MatAnchor } from "@angular/material/button";
import { SectionObserverDirective } from "../../shared/directive/section-observer.directive";
import { PdfUtils } from '../../core/utils/pdf.util';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-hero-section-standard',
  imports: [MatIcon, TranslatePipe, MatAnchor, SectionObserverDirective, MatProgressSpinner, MatTooltip],
  templateUrl: './hero-section-standard.html',
  styleUrl: './hero-section-standard.scss',
})
export class HeroSectionStandard {

  protected languageService = inject(LanguageService);
  public displayTextService = inject(DisplayedTextService);
  protected isLoading = signal(false);

  constructor() {
    effect(() => {
      const text = this.languageService.getTranslation(
        "HERO_SECTION.DISPLAY_TEXT"
      );
      this.displayTextService.restartStreaming(text);
    });
  }

  async downloadCV() {
    if (this.isLoading()) return;
    this.isLoading.set(true);

    try {
      const { pdf64 } = await import('../../shared/portfolio-data/cv-pdf');
      PdfUtils.downloadFromBase64(pdf64, "Albin_Liang_CV.pdf");

      // Damos un tiempo mínimo de "feedback" para que no se sienta instantáneo
      // y el usuario perciba que la acción se ejecutó.
      setTimeout(() => {
        this.isLoading.set(false);
      }, 3000);

    } catch (error) {
      this.isLoading.set(false);
    }
  }

  goToLink(link: string) {
    window.open(link, '_blank', 'noopener,noreferrer');
  }
}
