import { Component, effect, inject, signal } from '@angular/core';
import { DisplayedTextService } from '../../core/services/ui/display-text-service';
import { LanguageService } from '../../core/services/ui/language-service';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from '@ngx-translate/core';
import { SectionObserverDirective } from "../../shared/directive/section-observer.directive";
import { PdfUtils } from '../../core/utils/pdf.util';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-hero-section-desktop',
  imports: [MatAnchor, MatIcon, TranslatePipe, SectionObserverDirective, MatProgressSpinner, MatTooltip],
  templateUrl: './hero-section-desktop.html',
  styleUrl: './hero-section-desktop.scss',
})
export class HeroSectionDesktop {

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

  ngOnInit(): void {

  }

  goToLink(link: string) {
    window.open(link, '_blank', 'noopener,noreferrer');
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
}
