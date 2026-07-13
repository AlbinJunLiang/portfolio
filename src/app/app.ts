import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { Toolbar } from "./components/toolbar/toolbar";
import { LanguageService } from './core/services/ui/language-service';
import { TranslateService } from '@ngx-translate/core';
import { HeroSectionDesktop } from "./components/hero-section-desktop/hero-section-desktop";
import { HeroSectionStandard } from "./components/hero-section-standard/hero-section-standard";
import { BreakpointService } from './core/services/ui/breakpoint-service';
import { AboutMeSection } from "./components/about-me-section/about-me-section";
import { ProjectSection } from "./components/project-section/project-section";
import { Slide } from './core/interfaces/slides';
import { Footer } from "./components/footer/footer";
import { CertSection } from "./components/cert-section/cert-section";
import { ExperienceSection } from "./components/experience-section/experience-section";
import { ContactSection } from "./components/contact-section/contact-section";
import { BottomNav } from "./components/botton-nav/bottom-nav";

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatMenuModule, MatDividerModule, Toolbar,
    HeroSectionDesktop, HeroSectionStandard, AboutMeSection, ProjectSection
    , Footer, CertSection, ExperienceSection, ContactSection, BottomNav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private route = inject(ActivatedRoute);
  protected breakpointService = inject(BreakpointService);
  private languageService = inject(LanguageService);

  ngOnInit(): void {
    this.setLanguageByParam();
  }

  private setLanguageByParam() {
    this.route.queryParams.subscribe(params => {
      const language = params['language'] || 'default';
      if (language !== 'default') {
        this.languageService.changeLanguage(language);
      }
    });
  }










}
