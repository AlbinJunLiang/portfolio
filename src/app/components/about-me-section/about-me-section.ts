import { Component, inject } from '@angular/core';
import { TechMarquee } from "./tech-marquee/tech-marquee";
import { SectionObserverDirective } from "../../shared/directive/section-observer.directive";
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/ui/language-service';

@Component({
  selector: 'app-about-me-section',
  imports: [TechMarquee, SectionObserverDirective, TranslatePipe],
  templateUrl: './about-me-section.html',
  styleUrl: './about-me-section.scss',
})
export class AboutMeSection {

  protected languageService = inject(LanguageService);
}
