import { Component } from '@angular/core';
import { NavComponent } from './components/nav/nav';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { PortfolioComponent } from './components/portfolio/portfolio';
import { BlogComponent } from './components/blog/blog';
import { ResumeComponent } from './components/resume/resume';
import { ContactComponent } from './components/contact/contact';

@Component({
  selector: 'app-root',
  imports: [NavComponent, HeroComponent, AboutComponent, PortfolioComponent, BlogComponent, ResumeComponent, ContactComponent],
  template: `
    <app-nav />
    <main>
      <app-hero />
      <app-about />
      <app-portfolio />
      <app-blog />
      <app-resume />
      <app-contact />
    </main>
  `,
  styles: [],
})
export class App {}
