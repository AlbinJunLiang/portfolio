import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { SectionService } from '../../core/services/ui/section-service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-bottom-nav',
  imports: [TranslatePipe],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss',
})
export class BottomNav {

  protected isHidden = signal(false);
  protected sectionService = inject(SectionService);

  private lastScrollTop = 0;


  @HostListener('document:scroll', ['$event'])
  onScroll(event: any) {
    // Obtenemos el scroll desde el elemento que realmente se mueve
    const st = event.target.documentElement?.scrollTop || event.target.scrollingElement?.scrollTop || 0;

    if (st > this.lastScrollTop && st > 50) {
      this.isHidden.set(true);
    } else if (st < this.lastScrollTop) {
      this.isHidden.set(false);
    }

    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  protected isActiveSection(section: string): boolean {
    return this.sectionService.activeSection() === section;
  }

}