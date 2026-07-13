import { Component } from '@angular/core';
import { SectionObserverDirective } from "../../shared/directive/section-observer.directive";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Slider } from "../slider/slider";
import { Slide } from '../../core/interfaces/slides';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-project-section',
  imports: [MatCardModule, MatButtonModule, SectionObserverDirective, Slider, TranslatePipe],
  templateUrl: './project-section.html',
  styleUrl: './project-section.scss',
})
export class ProjectSection {

  public slides1: Slide[] = [
    {
      url: 'projects/genq2.webp',
      title: 'gen_intro'
    },
    {
      url: 'projects/genq.png',
      title: 'gen_gui'
    },
    {
      url: 'projects/genq3.png',
      title: 'genq quiz'
    },
    {
      url: 'projects/genq4.png',
      title: 'genq login'
    },
  ]


  public slides2: Slide[] = [
    {
      url: 'projects/shapper3.webp',
      title: 'shapper mobile'
    },
    {
      url: 'projects/shapper2.webp',
      title: 'shapper home'
    },
    {
      url: 'projects/shapper.webp',
      title: 'shapper product'
    },
  ]

  public slides3: Slide[] = [
    {
      url: 'projects/sweeto0.webp',
      title: 'sweetOnion'
    },
    {
      url: 'projects/sweeto.webp',
      title: 'sweetOnion home'
    },
    {
      url: 'projects/sweeto1.webp',
      title: 'sweetOnion chat'
    },
    {
      url: 'projects/sweeto2.webp',
      title: 'sweetOnion models'
    },
    {
      url: 'projects/sweeto3.webp',
      title: 'sweetOnion login'
    },
  ]

  goToLink(link: string) {
    window.open(link, '_blank', 'noopener,noreferrer');
  }


}
