import { Component, inject, signal } from '@angular/core';
import { SectionObserverDirective } from "../../shared/directive/section-observer.directive";
import { LanguageService } from '../../core/services/ui/language-service';
import { TranslatePipe } from '@ngx-translate/core';
interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-experience-section',
  imports: [SectionObserverDirective, TranslatePipe],
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.scss',
})
export class ExperienceSection {

  protected languageService = inject(LanguageService);
    readonly experiences = signal<ExperienceItem[]>([
    {
      role: 'Desarrollador Full Stack Senior',
      company: 'Nombre de la Empresa',
      period: '2024 — Presente',
      description:
        'Lideré el desarrollo de nuevas funcionalidades para la plataforma principal, mejorando el rendimiento y la experiencia del usuario.',
      tags: ['Angular', 'Node.js', 'PostgreSQL'],
    },
    {
      role: 'Desarrollador Frontend',
      company: 'Otra Empresa',
      period: '2022 — 2024',
      description:
        'Construí componentes reutilizables y colaboré con diseño para implementar interfaces accesibles y responsivas.',
      tags: ['React', 'TypeScript', 'Tailwind'],
    },
    {
      role: 'Desarrollador Junior',
      company: 'Primera Empresa',
      period: '2021 — 2022',
      description:
        'Participé en el mantenimiento de aplicaciones existentes y aprendí buenas prácticas de control de versiones y testing.',
      tags: ['JavaScript', 'Git', 'HTML/CSS'],
    },
  ]);

}
