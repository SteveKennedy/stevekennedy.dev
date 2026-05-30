import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  template: `
    <section id="contact" style="position:relative; overflow:hidden; padding:7rem 1.5rem; background:#100F1C;">

      <!-- Background blobs -->
      <div style="position:absolute; top:-10%; left:10%; width:500px; height:500px; border-radius:50%;
                  background:radial-gradient(circle, rgba(124,58,237,0.35), transparent 65%);
                  filter:blur(80px); pointer-events:none;"></div>
      <div style="position:absolute; bottom:-10%; right:10%; width:400px; height:400px; border-radius:50%;
                  background:radial-gradient(circle, rgba(249,115,22,0.2), transparent 65%);
                  filter:blur(70px); pointer-events:none;"></div>

      <div style="max-width:800px; margin:0 auto; text-align:center; position:relative; z-index:1;">

        <span style="font-size:0.7rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase;
                     color:rgba(255,255,255,0.3); display:block; margin-bottom:1rem;">Contact</span>

        <h2 style="font-family:'Bricolage Grotesque',sans-serif; font-size:clamp(2.25rem,5.5vw,4rem);
                   font-weight:800; letter-spacing:-0.03em; line-height:1.05; color:white; margin:0 0 1.25rem;">
          Want to build something<br>
          <span style="color:#7C3AED;">together</span><span style="color:rgba(255,255,255,0.15);">?</span>
        </h2>

        <p style="font-size:1rem; color:rgba(255,255,255,0.45); line-height:1.7; max-width:480px; margin:0 auto 3rem;">
          I'm always open to interesting problems — whether it's a new venture,
          a technical challenge, or just swapping ideas.
        </p>

        <!-- Email CTA -->
        <a href="mailto:stephenwilliamkennedy@gmail.com"
           (mouseenter)="emailHover=true" (mouseleave)="emailHover=false"
           [style.background]="emailHover ? '#7C3AED' : '#F97316'"
           [style.transform]="emailHover ? 'scale(1.04)' : 'scale(1)'"
           style="display:inline-flex; align-items:center; gap:10px; padding:16px 36px;
                  border-radius:100px; font-size:0.88rem; font-weight:700; text-decoration:none;
                  color:white; margin-bottom:3rem; transition:all 0.3s ease;">
          <span>stephenwilliamkennedy&#64;gmail.com</span>
          <span>→</span>
        </a>

        <!-- Social links -->
        <div style="display:flex; align-items:center; justify-content:center; gap:2rem; flex-wrap:wrap;">
          @for (social of socials; track social.label) {
            <a [href]="social.href" target="_blank" rel="noopener"
               (mouseenter)="socialHover[social.label]=true" (mouseleave)="socialHover[social.label]=false"
               style="font-size:0.85rem; font-weight:600; text-decoration:none; transition:color 0.2s;"
               [style.color]="socialHover[social.label] ? 'white' : 'rgba(255,255,255,0.35)'">
              {{ social.label }}
            </a>
          }
        </div>
      </div>

      <!-- Footer bar -->
      <div style="max-width:1100px; margin:5rem auto 0; padding-top:2rem;
                  border-top:1px solid rgba(255,255,255,0.07); display:flex;
                  align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
        <span style="font-family:'Bricolage Grotesque',sans-serif; font-size:1.1rem; font-weight:800;
                     letter-spacing:-0.02em;">
          <span style="color:rgba(249,115,22,0.4);">S</span><span style="color:rgba(124,58,237,0.4);">K</span>
        </span>
        <span style="font-size:0.75rem; color:rgba(255,255,255,0.18);">
          stevekennedy.dev &nbsp;·&nbsp; Built with Angular + Tailwind CSS
        </span>
      </div>
    </section>
  `,
  styles: [],
})
export class ContactComponent {
  emailHover = false;
  socialHover: Record<string, boolean> = {};

  socials = [
    { label: 'GitHub',   href: 'https://github.com/SteveKennedy' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/stevekennedy2026' },
    { label: 'Twitter',  href: 'https://x.com/kennedystephen' },
  ];
}
