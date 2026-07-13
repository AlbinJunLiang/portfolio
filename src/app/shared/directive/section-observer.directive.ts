import {
    Directive,
    ElementRef,
    inject,
    input,
    AfterViewInit,
    DestroyRef
} from '@angular/core';
import { SectionService } from '../../core/services/ui/section-service';
import { Section } from '../../core/types/section';

@Directive({
    selector: '[sectionObserver]',
    standalone: true
})
export class SectionObserverDirective implements AfterViewInit {

    public sectionObserver = input.required<Section>();
    private element = inject(ElementRef);
    private sectionService = inject(SectionService);
    private destroyRef = inject(DestroyRef);

    ngAfterViewInit() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    this.sectionService.updateRatio(
                        this.sectionObserver(),
                        entry.intersectionRatio
                    );
                });
            },
            {
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
            }
        );

        observer.observe(this.element.nativeElement);

        this.destroyRef.onDestroy(() => {
            observer.disconnect();
        });
    }
}