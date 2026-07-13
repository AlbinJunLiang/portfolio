import { Component, inject } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { LanguageService } from '../../core/services/ui/language-service';
import { TranslatePipe } from '@ngx-translate/core';
import { MatMenu, MatMenuTrigger, MatMenuItem } from "@angular/material/menu";
import { SectionService } from '../../core/services/ui/section-service';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbar, MatIcon, MatDivider, MatAnchor, MatTooltip,
    MatIconButton, TranslatePipe, MatMenuItem, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {

  protected languageService = inject(LanguageService);
  protected sectionService = inject(SectionService);

  goToGithub() {
    window.open('https://github.com/AlbinJunLiang', '_blank', 'noopener,noreferrer');
  }

}
