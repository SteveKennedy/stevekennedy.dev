import { Component, afterNextRender } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  imports: [],
  template: `
    <section class="hero-section">

      <!-- ── LEFT: Entrepreneur ── -->
      <div class="hero-half hero-left">
        <!-- Warm glow blobs -->
        <div style="position:absolute; top:25%; left:20%; width:260px; height:260px; border-radius:50%;
                    background:radial-gradient(circle, rgba(249,115,22,0.18), transparent 70%);
                    filter:blur(40px); pointer-events:none;"></div>
        <div style="position:absolute; bottom:20%; right:15%; width:180px; height:180px; border-radius:50%;
                    background:radial-gradient(circle, rgba(251,191,36,0.14), transparent 70%);
                    filter:blur(32px); pointer-events:none;"></div>

        <!-- Dot grid -->
        <div style="position:absolute; inset:0; opacity:0.045;
                    background-image: radial-gradient(circle, #F97316 1px, transparent 1px);
                    background-size: 28px 28px; pointer-events:none;"></div>

        <!-- Content -->
        <div class="hero-content relative z-10" style="padding: 3rem; max-width: 420px;">
          <div class="hero-animate" style="font-size:0.72rem; font-weight:700; letter-spacing:0.18em;
                      text-transform:uppercase; color:#F97316; margin-bottom:1.5rem;">
            Entrepreneur
          </div>
          <h1 class="hero-title hero-animate">
            I<br>build<br>
            <span style="color:#F97316;">stuff.</span>
          </h1>
          <p class="hero-animate" style="font-size:0.9rem; color:#B0A89A; margin-top:1.25rem; letter-spacing:0.01em;">
            Ideas → Products → Impact.
          </p>
          <a href="#portfolio" class="hero-animate" style="display:inline-flex; align-items:center; gap:6px;
             margin-top:2.25rem; font-size:0.85rem; font-weight:700; color:#1A1A1A; text-decoration:none;
             transition: gap 0.3s ease;" onmouseenter="this.style.gap='12px'" onmouseleave="this.style.gap='6px'">
            See my work <span>↓</span>
          </a>
        </div>
      </div>

      <!-- ── DIVIDER ── -->
      <div class="hero-divider">
        <div class="hero-divider-dot"></div>
      </div>

      <!-- ── RIGHT: Coder ── -->
      <div class="hero-half hero-right">
        <!-- Cool glow blobs -->
        <div style="position:absolute; top:25%; right:20%; width:260px; height:260px; border-radius:50%;
                    background:radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%);
                    filter:blur(40px); pointer-events:none;"></div>
        <div style="position:absolute; bottom:20%; left:15%; width:180px; height:180px; border-radius:50%;
                    background:radial-gradient(circle, rgba(167,139,250,0.14), transparent 70%);
                    filter:blur(32px); pointer-events:none;"></div>

        <!-- Subtle grid -->
        <div style="position:absolute; inset:0; opacity:0.04;
                    background-image: linear-gradient(rgba(124,58,237,1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px);
                    background-size: 36px 36px; pointer-events:none;"></div>

        <!-- Floating code decorations -->
        <div class="float-a" style="position:absolute; top:18%; right:14%; font-family:'JetBrains Mono',monospace;
             font-size:2.5rem; font-weight:200; color:rgba(124,58,237,0.12); pointer-events:none; user-select:none;">&#123; &#125;</div>
        <div class="float-b" style="position:absolute; bottom:22%; left:12%; font-family:'JetBrains Mono',monospace;
             font-size:2rem; font-weight:200; color:rgba(124,58,237,0.1); pointer-events:none; user-select:none;">&lt;/&gt;</div>
        <div class="float-c" style="position:absolute; top:42%; right:8%; font-family:'JetBrains Mono',monospace;
             font-size:1.5rem; font-weight:200; color:rgba(124,58,237,0.08); pointer-events:none; user-select:none;">( )</div>

        <!-- Content -->
        <div class="hero-content relative z-10" style="padding: 3rem; max-width: 420px;">
          <div class="hero-animate" style="font-family:'JetBrains Mono',monospace; font-size:0.9rem; font-weight:500;
                      color:#7C3AED; margin-bottom:1.5rem; letter-spacing:0.02em;">
            &lt;Coder /&gt;
          </div>
          <h1 class="hero-title hero-animate">
            I<br>code<br>
            <span style="color:#7C3AED;">stuff.</span>
          </h1>
          <p class="hero-animate" style="font-family:'JetBrains Mono',monospace; font-size:0.82rem;
                    color:rgba(124,58,237,0.6); margin-top:1.25rem; letter-spacing:-0.01em;">
            // idea.code().deploy()
          </p>
          <a href="#portfolio" class="hero-animate" style="display:inline-flex; align-items:center; gap:6px;
             margin-top:2.25rem; font-size:0.85rem; font-weight:700; color:#1A1A1A; text-decoration:none;
             transition: gap 0.3s ease;" onmouseenter="this.style.gap='12px'" onmouseleave="this.style.gap='6px'">
            See my code <span>↓</span>
          </a>
        </div>

        <!-- Cursor blink detail -->
        <div style="position:absolute; bottom:28%; left:50%; transform:translateX(-50%);
             font-family:'JetBrains Mono',monospace; font-size:1.25rem; color:rgba(124,58,237,0.25);
             pointer-events:none; user-select:none;">
          <span class="cursor-blink">_</span>
        </div>
      </div>

    </section>
  `,
  styles: [],
})
export class HeroComponent {
  constructor() {
    afterNextRender(() => {
      gsap.set('.hero-left', { clipPath: 'inset(0 100% 0 0)' });
      gsap.set('.hero-right', { clipPath: 'inset(0 0 0 100%)' });
      gsap.set('.hero-divider', { scaleY: 0, transformOrigin: 'top center' });
      gsap.set('.hero-animate', { y: 32, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to('.hero-left', {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.1,
        ease: 'power4.inOut',
      })
      .to('.hero-right', {
        clipPath: 'inset(0 0 0 0%)',
        duration: 1.1,
        ease: 'power4.inOut',
      }, '<')
      .to('.hero-divider', {
        scaleY: 1,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.55')
      .to('.hero-animate', {
        y: 0,
        opacity: 1,
        stagger: 0.09,
        duration: 0.75,
        ease: 'power3.out',
      }, '-=0.45');
    });
  }
}
