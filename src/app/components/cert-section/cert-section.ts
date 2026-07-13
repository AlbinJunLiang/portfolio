import { Component, signal } from '@angular/core';
import { Credential } from '../../core/interfaces/credentials';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-cert-section',
  imports: [TranslatePipe],
  templateUrl: './cert-section.html',
  styleUrl: './cert-section.scss',
})
export class CertSection {

  readonly credentials = signal<Credential[]>([
    {
      title: 'Academy Accreditation - Generative AI Fundamentals',
      issuer: 'Databricks Academy',
      date: '2025',
      image: 'images/databricks.webp',
      url: 'https://credentials.databricks.com/fc82baba-16e7-41a4-93ba-412ed75b8cf5#acc.BdZbk3vI',
    },
    {
      title: 'Foundation Professional Certification - SFPC™',
      issuer: 'Certiprof',
      date: '2024',
      image: 'images/certiprof.webp',
      url: 'https://www.credly.com/badges/6053ddd7-0094-4348-9c18-a19ff0bf66f8',
    },
    {
      title: 'MongoDB Aggregation Fundamentals',
      issuer: 'MongoDB',
      date: '2025',
      image: 'images/mongo.webp',
      url: 'https://www.credly.com/badges/55e758b2-5b65-4d03-a2ac-b6e2a03810f1/public_url',
    },
  ]);

  viewCredential(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

}
