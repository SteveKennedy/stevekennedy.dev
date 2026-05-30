import { Component, afterNextRender } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <section id="about" style="background: #FAFAF9; padding: 7rem 1.5rem;">
      <div style="max-width: 1100px; margin: 0 auto;">

        <span class="section-label">About</span>

        <!-- Big pull quote -->
        <div class="about-headline" style="margin-bottom: 4rem; max-width: 860px;">
          <h2 class="section-heading" style="font-size: clamp(2.25rem, 5vw, 4rem); line-height: 1.05;">
            Engineer by day.<br>
            Entrepreneur by
            <span style="position:relative; display:inline-block;">
              night.
              <svg style="position:absolute; left:0; bottom:-4px; width:100%; height:8px;" viewBox="0 0 80 8" preserveAspectRatio="none">
                <path d="M0 6 Q40 0 80 6" stroke="#F97316" stroke-width="3" fill="none" stroke-linecap="round"/>
              </svg>
            </span>
          </h2>
        </div>

        <!-- Two columns -->
        <div class="about-body" style="display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;">

          <!-- Left: Story -->
          <div>
            <p style="font-size: 1.05rem; color: #374151; line-height: 1.75; margin-bottom: 1.5rem;">
              I'm Steve Kennedy — a software engineer and engineering leader who
              can't stop building products on the side. I design enterprise SaaS
              platforms, grow engineering teams, and help organizations actually
              adopt AI-assisted development in their day-to-day work.
            </p>
            <p style="font-size: 1.05rem; color: #374151; line-height: 1.75; margin-bottom: 1.5rem;">
              On nights and weekends, I take my own ideas from zero to deployed —
              solo. The two identities aren't in conflict. The entrepreneurial lens
              makes me a better engineer. The technical depth makes my ventures
              actually work.
            </p>
            <p style="font-size: 1.05rem; color: #374151; line-height: 1.75;">
              Engineering leader. Team builder. Still writing code.
            </p>
          </div>

          <!-- Right: Stats + stack -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">

            @for (stat of stats; track stat.label) {
              <div style="display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem 1.5rem;
                          border-radius: 16px; border: 1px solid rgba(0,0,0,0.055); background: white;">
                <div style="font-family:'Bricolage Grotesque',sans-serif; font-size: 2rem; font-weight: 800;
                            line-height: 1; min-width: 60px;"
                     [style.color]="stat.color">{{ stat.value }}</div>
                <div>
                  <div style="font-weight: 700; font-size: 0.9rem; color: #1A1A1A;">{{ stat.label }}</div>
                  <div style="font-size: 0.8rem; color: #9CA3AF; margin-top: 2px;">{{ stat.sub }}</div>
                </div>
              </div>
            }

            <!-- Stack chips -->
            <div style="padding: 1.25rem 1.5rem; border-radius: 16px; border: 1px solid rgba(0,0,0,0.055); background: white;">
              <div style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
                          color: #B0B7C3; margin-bottom: 0.75rem;">Stack</div>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                @for (tech of stack; track tech) {
                  <span class="tech-tag">{{ tech }}</span>
                }
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    @media (max-width: 768px) {
      .about-body { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
    }
  `],
})
export class AboutComponent {
  stats = [
    { value: '20+',  color: '#F97316', label: 'Years in Software Development', sub: 'From intern to architect' },
    { value: '6+',   color: '#F97316', label: 'Apps built solo',      sub: 'Idea to App Store, no handoffs' },
  ];

  stack = ['Angular', 'Ionic', 'TypeScript', '.NET', 'C#', 'Firebase', 'Azure', 'SQL', 'Capacitor'];

  constructor() {
    afterNextRender(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.about-headline', {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#about', start: 'top 72%' },
      });

      gsap.from('.about-body', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: { trigger: '#about', start: 'top 65%' },
      });
    });
  }
}
