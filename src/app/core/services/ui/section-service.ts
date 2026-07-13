import { Injectable, signal } from '@angular/core';
import { Section } from '../../types/section';

@Injectable({ providedIn: 'root' })
export class SectionService {

    private section = signal<Section>('home');
    readonly activeSection = this.section.asReadonly();

    private ratios = new Map<Section, number>();

    updateRatio(section: Section, ratio: number) {
        this.ratios.set(section, ratio);

        // elegir la sección con mayor ratio de visibilidad
        let best: Section = this.section();
        let bestRatio = 0;

        this.ratios.forEach((r, s) => {
            if (r > bestRatio) {
                bestRatio = r;
                best = s;
            }
        });

        if (bestRatio > 0) {
            this.section.set(best);
        }
    }

    setActive(section: Section) {
        this.section.set(section);
    }

    scrollTo(section: Section) {
        this.section.set(section);
        document
            .getElementById(section)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}