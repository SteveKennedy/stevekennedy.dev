import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      [style.transform]="scrolled() ? 'translateY(0)' : 'translateY(-110%)'"
      [style.opacity]="scrolled() ? '1' : '0'"
      style="backdrop-filter: blur(14px); background: rgba(250,250,249,0.88); border-bottom: 1px solid rgba(0,0,0,0.06);"
    >
      <nav class="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
        <a href="#" style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.25rem; font-weight: 800; letter-spacing: -0.03em; text-decoration: none; color: #1A1A1A;">
          <span style="color: #F97316;">S</span><span style="color: #7C3AED;">K</span>
        </a>

        <div class="hidden md:flex items-center gap-8">
          @for (link of links; track link.href) {
            <a
              [href]="link.href"
              style="font-size: 0.85rem; font-weight: 600; color: #1A1A1A; text-decoration: none; transition: color 0.2s;"
              (mouseenter)="hovered = link.href"
              (mouseleave)="hovered = ''"
              [style.color]="hovered === link.href ? link.hoverColor : '#1A1A1A'"
            >{{ link.label }}</a>
          }
          <a
            href="#contact"
            style="font-size: 0.8rem; font-weight: 600; padding: 8px 20px; border-radius: 100px; background: #1A1A1A; color: white; text-decoration: none; transition: background 0.25s ease;"
            (mouseenter)="ctaHovered = true"
            (mouseleave)="ctaHovered = false"
            [style.background]="ctaHovered ? '#7C3AED' : '#1A1A1A'"
          >Get in touch</a>
        </div>
      </nav>
    </header>
  `,
  styles: [],
})
export class NavComponent {
  scrolled = signal(false);
  hovered = '';
  ctaHovered = false;

  links = [
    { label: 'Work',    href: '#portfolio', hoverColor: '#7C3AED' },
    { label: 'Writing', href: '#blog',      hoverColor: '#F97316' },
    { label: 'Resume',  href: '#resume',    hoverColor: '#7C3AED' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > window.innerHeight * 0.85);
  }
}
