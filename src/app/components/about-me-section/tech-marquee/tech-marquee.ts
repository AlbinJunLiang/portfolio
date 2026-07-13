import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-tech-marquee',
  imports: [TranslatePipe],
  templateUrl: './tech-marquee.html',
  styleUrl: './tech-marquee.scss',
})
export class TechMarquee {
  public techStack = [
    { name: 'Angular', path: 'icons/angular.svg' },
    { name: 'Python', path: 'icons/python.svg' },
    { name: 'HTML5', path: 'icons/html5.svg' },
    { name: 'CSS3', path: 'icons/css.svg' },
    { name: 'JavaScript', path: 'icons/javascript.svg' },
    { name: 'Express.js', path: 'icons/expressjs.svg' },
    { name: 'PostgreSQL', path: 'icons/postgresql.svg' },
    { name: 'Node.js', path: 'icons/nodejs.svg' },
    { name: 'TypeScript', path: 'icons/typescript.svg' },
    { name: 'Supabase', path: 'icons/supabase.svg' }
  ];
}
