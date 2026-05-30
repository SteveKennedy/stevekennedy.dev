import { Component, afterNextRender, ViewChild, ElementRef, signal, computed } from '@angular/core';
import gsap from 'gsap';

interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  bgColor: string;
  accentColor: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [],
  template: `
    <section id="portfolio" style="background: #F7F7F5; padding: 7rem 0 5rem;">

      <!-- Header -->
      <div style="max-width:1100px; margin:0 auto; padding:0 1.5rem; margin-bottom:3rem;">
        <span class="section-label">Portfolio</span>
        <h2 class="section-heading">Stuff I've made.</h2>
        <p style="font-size:0.95rem; color:#6B7280; line-height:1.75; max-width:560px; margin-top:1rem;">
          These are my personal side projects — hustles, experiments, and the occasional obsession
          that kept me up too late. Built on my own time, for the love of building. Not all of them
          are businesses. All of them taught me something.
        </p>
      </div>

      <!-- Carousel wrapper: centered max-width container, overflow clips the sliding track -->
      <div style="max-width:1100px; margin:0 auto; padding:0 1.5rem; position:relative;">
        <div class="carousel-outer"
             (mouseenter)="pauseAuto()"
             (mouseleave)="resumeAuto()"
             style="position:relative; overflow:hidden; padding:1rem 0 1.5rem; border-radius:4px;">

        <!-- Sliding track — cards are 1/3 of this container width -->
        <div #carouselTrack
             style="display:flex; gap:1.5rem; will-change:transform;">
          @for (project of allCards; track $index) {
            <div class="portfolio-card carousel-card"
                 style="flex:0 0 calc(33.333% - 1rem); min-width:0;">

              <!-- Mockup -->
              <div style="height:260px; position:relative; overflow:hidden;" [style.background]="project.bgColor">

                @if (project.id === 'careerhub') {
                  <div style="padding:20px; height:100%; font-family:'Plus Jakarta Sans',sans-serif;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                      <div style="display:flex; align-items:center; gap:8px;">
                        <div style="width:28px; height:28px; border-radius:50%; background:linear-gradient(135deg,#F97316,#FBBF24); flex-shrink:0;"></div>
                        <div>
                          <div style="color:rgba(255,255,255,0.4); font-size:9px;">Good morning,</div>
                          <div style="color:white; font-size:11px; font-weight:700;">Steve</div>
                        </div>
                      </div>
                      <div style="background:rgba(249,115,22,0.2); border-radius:100px; padding:3px 8px; font-size:9px; color:#F97316; font-weight:700;">3 New</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.08); border-radius:8px; padding:7px 10px; margin-bottom:12px; display:flex; align-items:center; gap:6px;">
                      <span style="color:rgba(255,255,255,0.3); font-size:10px;">🔍</span>
                      <span style="color:rgba(255,255,255,0.3); font-size:10px;">Search jobs &amp; companies...</span>
                    </div>
                    <div style="color:rgba(255,255,255,0.35); font-size:8px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px;">Top Matches</div>
                    @for (job of careerhubJobs; track job.company) {
                      <div style="background:rgba(255,255,255,0.07); border-radius:8px; padding:9px 10px; margin-bottom:6px; display:flex; align-items:center; gap:8px;">
                        <div style="width:28px; height:28px; border-radius:6px; flex-shrink:0;" [style.background]="job.color"></div>
                        <div style="flex:1; min-width:0;">
                          <div style="color:white; font-size:10px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{ job.title }}</div>
                          <div style="color:rgba(255,255,255,0.4); font-size:9px;">{{ job.company }}</div>
                        </div>
                        <div style="background:rgba(249,115,22,0.18); color:#F97316; font-size:9px; font-weight:700; padding:2px 7px; border-radius:100px; flex-shrink:0;">{{ job.match }}%</div>
                      </div>
                    }
                  </div>
                }

                @if (project.id === 'simplejoys') {
                  <div style="padding:20px; height:100%; display:flex; flex-direction:column; font-family:'Plus Jakarta Sans',sans-serif;">
                    <div style="color:white; font-size:11px; font-weight:700; margin-bottom:3px;">SimpleJoys</div>
                    <div style="color:rgba(255,255,255,0.5); font-size:9px; margin-bottom:16px;">13+ mini games &amp; utilities</div>
                    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px; flex:1;">
                      @for (game of simpleJoyGames; track game.name) {
                        <div style="border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:18px; aspect-ratio:1;" [style.background]="game.bg">{{ game.emoji }}</div>
                      }
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px;">
                      <span style="color:rgba(255,255,255,0.5); font-size:9px;">Cross-platform</span>
                      <div style="display:flex; gap:4px;">
                        <span style="font-size:9px; padding:2px 6px; border-radius:100px; background:rgba(255,255,255,0.12); color:rgba(255,255,255,0.6);">iOS</span>
                        <span style="font-size:9px; padding:2px 6px; border-radius:100px; background:rgba(255,255,255,0.12); color:rgba(255,255,255,0.6);">Android</span>
                      </div>
                    </div>
                  </div>
                }

                @if (project.id === 'nvision') {
                  <div style="padding:20px; height:100%; font-family:'Plus Jakarta Sans',sans-serif;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                      <div style="color:white; font-size:11px; font-weight:700;">nVision Ready</div>
                      <div style="background:rgba(124,58,237,0.35); border-radius:100px; padding:3px 8px; font-size:8px; color:#A78BFA; font-weight:700;">✦ AI</div>
                    </div>
                    <div style="text-align:center; margin-bottom:16px;">
                      <div style="position:relative; display:inline-block; width:84px; height:84px;">
                        <svg viewBox="0 0 84 84" style="transform:rotate(-90deg); display:block;">
                          <circle cx="42" cy="42" r="36" fill="none" stroke="rgba(124,58,237,0.2)" stroke-width="6"/>
                          <circle cx="42" cy="42" r="36" fill="none" stroke="#7C3AED" stroke-width="6" stroke-dasharray="226.2" stroke-dashoffset="56.6" stroke-linecap="round"/>
                        </svg>
                        <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                          <div style="font-family:'Bricolage Grotesque',sans-serif; font-size:22px; font-weight:800; color:white; line-height:1;">75</div>
                          <div style="font-size:7px; color:rgba(255,255,255,0.35); letter-spacing:0.08em; text-transform:uppercase;">READY</div>
                        </div>
                      </div>
                    </div>
                    <div style="color:rgba(255,255,255,0.3); font-size:8px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px;">Recent Ideas</div>
                    @for (idea of nvisionIdeas; track idea.title) {
                      <div style="display:flex; align-items:center; gap:8px; margin-bottom:7px; padding:6px 8px; background:rgba(124,58,237,0.1); border-radius:8px;">
                        <div style="width:6px; height:6px; border-radius:50%; flex-shrink:0;" [style.background]="idea.color"></div>
                        <div style="color:rgba(255,255,255,0.7); font-size:9px; flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{ idea.title }}</div>
                        <div style="color:rgba(255,255,255,0.3); font-size:8px; font-weight:600;">{{ idea.score }}</div>
                      </div>
                    }
                  </div>
                }

                @if (project.id === 'rootedai') {
                  <div style="padding:20px; height:100%; font-family:'Plus Jakarta Sans',sans-serif;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                      <div style="color:white; font-size:11px; font-weight:700;">Rooted.AI</div>
                      <div style="background:rgba(74,222,128,0.2); border-radius:100px; padding:3px 8px; font-size:8px; color:#4ADE80; font-weight:700;">✦ AI</div>
                    </div>
                    <div style="background:rgba(74,222,128,0.08); border-radius:8px; padding:8px 10px; margin-bottom:12px; display:flex; align-items:center; gap:6px;">
                      <div style="width:6px; height:6px; border-radius:50%; background:#4ADE80; flex-shrink:0;"></div>
                      <span style="color:rgba(255,255,255,0.5); font-size:9px;">AI is ready — what are you preparing?</span>
                    </div>
                    <div style="color:rgba(255,255,255,0.3); font-size:8px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px;">Recent Notes</div>
                    @for (note of rootedaiNotes; track note.title) {
                      <div style="display:flex; align-items:center; gap:8px; margin-bottom:7px; padding:8px 10px; background:rgba(255,255,255,0.05); border-radius:8px;">
                        <div style="flex:1; min-width:0;">
                          <div style="color:rgba(255,255,255,0.8); font-size:9px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{ note.title }}</div>
                          <div style="color:rgba(74,222,128,0.6); font-size:8px; margin-top:2px;">{{ note.tag }}</div>
                        </div>
                        <div style="font-size:8px; flex-shrink:0;" [style.color]="note.synced ? 'rgba(74,222,128,0.5)' : 'rgba(255,255,255,0.2)'">
                          {{ note.synced ? '✓ synced' : '⊘ offline' }}
                        </div>
                      </div>
                    }
                  </div>
                }

                @if (project.id === 'toxon') {
                  <div style="padding:20px; height:100%; font-family:'Plus Jakarta Sans',sans-serif; display:flex; flex-direction:column;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                      <div style="color:white; font-size:11px; font-weight:700;">Toxon</div>
                      <div style="background:rgba(239,68,68,0.2); border-radius:100px; padding:3px 8px; font-size:8px; color:#EF4444; font-weight:700;">🏹 Live</div>
                    </div>
                    <div style="display:flex; justify-content:center; margin-bottom:14px;">
                      <div style="position:relative; width:72px; height:72px; display:flex; align-items:center; justify-content:center;">
                        <div style="position:absolute; width:72px; height:72px; border-radius:50%; background:rgba(239,68,68,0.15); border:2px solid rgba(239,68,68,0.3);"></div>
                        <div style="position:absolute; width:52px; height:52px; border-radius:50%; background:rgba(239,68,68,0.2); border:2px solid rgba(239,68,68,0.4);"></div>
                        <div style="position:absolute; width:34px; height:34px; border-radius:50%; background:rgba(239,68,68,0.3); border:2px solid rgba(239,68,68,0.6);"></div>
                        <div style="position:absolute; width:16px; height:16px; border-radius:50%; background:#EF4444;"></div>
                      </div>
                    </div>
                    <div style="color:rgba(255,255,255,0.3); font-size:8px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px;">Upcoming Events</div>
                    @for (event of toxonEvents; track event.name) {
                      <div style="padding:8px 10px; background:rgba(255,255,255,0.05); border-radius:8px; margin-bottom:7px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                          <div style="color:rgba(255,255,255,0.85); font-size:9px; font-weight:600;">{{ event.name }}</div>
                          <div style="color:#EF4444; font-size:8px; font-weight:700;">{{ event.date }}</div>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-top:3px;">
                          <div style="color:rgba(255,255,255,0.35); font-size:8px;">{{ event.venue }}</div>
                          <div style="color:rgba(255,255,255,0.35); font-size:8px;">{{ event.entries }} entries</div>
                        </div>
                      </div>
                    }
                  </div>
                }

                @if (project.id === 'jobletai') {
                  <div style="padding:20px; height:100%; font-family:'Plus Jakarta Sans',sans-serif;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                      <div style="color:white; font-size:11px; font-weight:700;">Joblet.AI</div>
                      <div style="background:rgba(245,158,11,0.2); border-radius:100px; padding:3px 8px; font-size:8px; color:#F59E0B; font-weight:700;">📍 Near you</div>
                    </div>
                    <div style="background:rgba(245,158,11,0.06); border-radius:8px; height:60px; margin-bottom:12px; position:relative; overflow:hidden; border:1px solid rgba(245,158,11,0.15);">
                      <div style="position:absolute; top:50%; left:30%; width:10px; height:10px; border-radius:50%; background:#F59E0B; transform:translate(-50%,-50%);"></div>
                      <div style="position:absolute; top:30%; left:55%; width:8px; height:8px; border-radius:50%; background:rgba(245,158,11,0.6); transform:translate(-50%,-50%);"></div>
                      <div style="position:absolute; top:65%; left:70%; width:8px; height:8px; border-radius:50%; background:rgba(245,158,11,0.6); transform:translate(-50%,-50%);"></div>
                      <div style="position:absolute; bottom:6px; right:8px; font-size:7px; color:rgba(255,255,255,0.2);">map view</div>
                    </div>
                    <div style="color:rgba(255,255,255,0.3); font-size:8px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px;">Jobs Nearby</div>
                    @for (job of jobletJobs; track job.title) {
                      <div style="display:flex; align-items:center; gap:8px; margin-bottom:7px; padding:7px 10px; background:rgba(255,255,255,0.05); border-radius:8px;">
                        <div style="flex:1;">
                          <div style="color:rgba(255,255,255,0.85); font-size:9px; font-weight:600;">{{ job.title }}</div>
                          <div style="color:rgba(255,255,255,0.3); font-size:8px; margin-top:1px;">{{ job.distance }} · ⭐ {{ job.rating }}</div>
                        </div>
                        <div style="background:rgba(245,158,11,0.2); color:#F59E0B; font-size:9px; font-weight:700; padding:3px 8px; border-radius:100px;">{{ job.price }}</div>
                      </div>
                    }
                  </div>
                }

              </div>

              <!-- Card info -->
              <div style="padding:1.5rem;">
                <h3 style="font-family:'Bricolage Grotesque',sans-serif; font-size:1.2rem; font-weight:800;
                           letter-spacing:-0.02em; color:#1A1A1A; margin:0 0 0.5rem;">{{ project.name }}</h3>
                <p style="font-size:0.875rem; color:#6B7280; line-height:1.65; margin:0 0 1.25rem;">{{ project.description }}</p>
                <div style="display:flex; flex-wrap:wrap; gap:5px; margin-bottom:1.5rem;">
                  @for (tag of project.tags; track tag) {
                    <span class="tech-tag">{{ tag }}</span>
                  }
                </div>
                <a href="#" style="display:inline-flex; align-items:center; gap:6px; font-size:0.82rem;
                   font-weight:700; text-decoration:none; transition:all 0.25s ease; color:#1A1A1A;"
                   (mouseenter)="hovered[project.id + $index]=true"
                   (mouseleave)="hovered[project.id + $index]=false"
                   [style.color]="hovered[project.id + $index] ? project.accentColor : '#1A1A1A'"
                   [style.gap]="hovered[project.id + $index] ? '10px' : '6px'">
                  View Project →
                </a>
              </div>

            </div>
          }
        </div>

        </div> <!-- end carousel-outer / overflow clip -->

        <!-- Arrows sit outside the clip so they're never cut off -->
        <button (click)="prev()"
                style="position:absolute; left:-22px; top:45%; transform:translateY(-50%); z-index:10;
                       width:44px; height:44px; border-radius:50%; border:2px solid rgba(0,0,0,0.1);
                       background:white; cursor:pointer; display:flex; align-items:center; justify-content:center;
                       font-size:1.1rem; box-shadow:0 2px 12px rgba(0,0,0,0.08); transition:all 0.2s ease;"
                (mouseenter)="arrowHover.prev=true" (mouseleave)="arrowHover.prev=false"
                [style.border-color]="arrowHover.prev ? '#7C3AED' : 'rgba(0,0,0,0.1)'"
                [style.color]="arrowHover.prev ? '#7C3AED' : '#1A1A1A'">←</button>

        <button (click)="next()"
                style="position:absolute; right:-22px; top:45%; transform:translateY(-50%); z-index:10;
                       width:44px; height:44px; border-radius:50%; border:2px solid rgba(0,0,0,0.1);
                       background:white; cursor:pointer; display:flex; align-items:center; justify-content:center;
                       font-size:1.1rem; box-shadow:0 2px 12px rgba(0,0,0,0.08); transition:all 0.2s ease;"
                (mouseenter)="arrowHover.next=true" (mouseleave)="arrowHover.next=false"
                [style.border-color]="arrowHover.next ? '#7C3AED' : 'rgba(0,0,0,0.1)'"
                [style.color]="arrowHover.next ? '#7C3AED' : '#1A1A1A'">→</button>

      </div> <!-- end max-width wrapper -->

      <!-- Dot indicators -->
      <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-top:1.75rem;">
        @for (project of projects; track project.id; let i = $index) {
          <button (click)="goTo(i)"
                  style="border:none; cursor:pointer; padding:0; border-radius:100px;
                         transition:all 0.35s ease;"
                  [style.width]="activeIndex() === i ? '28px' : '8px'"
                  [style.height]="'8px'"
                  [style.background]="activeIndex() === i ? project.accentColor : '#D1D5DB'">
          </button>
        }
      </div>

    </section>
  `,
  styles: [`
    @media (max-width: 900px) {
      .carousel-card { flex: 0 0 calc(50% - 0.75rem) !important; }
    }
    @media (max-width: 600px) {
      .carousel-card { flex: 0 0 calc(100% - 3rem) !important; }
    }
  `],
})
export class PortfolioComponent {
  @ViewChild('carouselTrack') trackRef!: ElementRef<HTMLElement>;

  hovered: Record<string, boolean> = {};
  arrowHover = { prev: false, next: false };

  currentIndex = signal(0);
  activeIndex = computed(() => this.currentIndex() % this.projects.length);

  private isAnimating = false;
  private isPaused = false;
  private autoTimer: ReturnType<typeof setInterval> | null = null;

  projects: Project[] = [
    { id: 'careerhub', name: 'CareerHub.AI',    description: 'AI-powered college & career readiness app with an AI coach, assessments, and planning tools across 800+ BLS occupations. Deployed to the App Store and Google Play.', tags: ['Ionic', 'Angular', 'Firebase', 'Azure', 'AI'],                  bgColor: '#0F172A', accentColor: '#F97316' },
    { id: 'simplejoys', name: 'SimpleJoys',      description: 'A cross-platform app with 13+ mini-games and utilities. Fun is the feature.',                                                                                          tags: ['Ionic', 'Angular', '.NET', 'Firebase', 'Capacitor'],          bgColor: '#2D1B69', accentColor: '#A78BFA' },
    { id: 'nvision',    name: 'nVision Ready',   description: 'AI-powered platform that turns employee ideas into actionable insights using a proprietary Readiness Score.',                                                           tags: ['Ionic', 'Angular', 'Azure', '.NET', 'AI', 'Firebase'],        bgColor: '#0D0D1F', accentColor: '#7C3AED' },
    { id: 'rootedai',   name: 'Rooted.AI',       description: 'AI-powered ministry companion for rural and small-town pastors — sermon prep, congregation notes, and offline-first for low-connectivity areas.',                       tags: ['Ionic', 'Angular', 'Azure', '.NET', 'AI', 'Capacitor'],       bgColor: '#0F1F0F', accentColor: '#4ADE80' },
    { id: 'toxon',      name: 'Toxon',           description: 'Archery event management and gaming platform — connecting venues with shooters through tournaments, live scoring, and mobile engagement.',                               tags: ['React Native', 'Node.js', 'AWS', 'React', 'Airtable'],        bgColor: '#0D0D0D', accentColor: '#EF4444' },
    { id: 'jobletai',   name: 'Joblet.AI',       description: 'Hyperlocal gig marketplace — find or post small jobs nearby with fixed prices, trusted ratings, and real-time messaging.',                                              tags: ['Ionic', 'Angular', 'Azure', '.NET', 'Firebase'],              bgColor: '#1A1000', accentColor: '#F59E0B' },
  ];

  // 6 originals + first 3 cloned at end for seamless infinite loop
  get allCards(): Project[] {
    return [...this.projects, ...this.projects.slice(0, 3)];
  }

  careerhubJobs   = [{ title: 'Software Engineer Intern', company: 'Shopify',  color: '#16A34A', match: 94 }, { title: 'Product Manager Co-op', company: 'RBC', color: '#1D4ED8', match: 88 }, { title: 'Data Analyst', company: 'TD Bank', color: '#15803D', match: 81 }];
  simpleJoyGames  = [{ name: "Liar's Dice", emoji: '🎲', bg: 'rgba(239,68,68,0.75)' }, { name: 'Word Guess', emoji: '🔤', bg: 'rgba(234,179,8,0.75)' }, { name: 'Magic 8-Ball', emoji: '🎱', bg: 'rgba(124,58,237,0.75)' }, { name: 'Hangman', emoji: '🪤', bg: 'rgba(34,197,94,0.75)' }, { name: 'Tic-Tac-Toe', emoji: '✕', bg: 'rgba(249,115,22,0.75)' }, { name: 'Day Trader', emoji: '📈', bg: 'rgba(6,182,212,0.75)' }, { name: 'Six Guesses', emoji: '🟩', bg: 'rgba(234,88,12,0.75)' }, { name: 'Todo List', emoji: '✅', bg: 'rgba(168,85,247,0.75)' }];
  nvisionIdeas    = [{ title: 'Automate onboarding flow', color: '#34D399', score: '92' }, { title: 'Gamify peer recognition', color: '#A78BFA', score: '78' }, { title: 'AI meeting summarizer', color: '#F97316', score: '65' }];
  rootedaiNotes   = [{ title: 'Sunday Sermon — John 15:5', tag: 'Sermon',   synced: true }, { title: 'Visit: Margaret Hoffman', tag: 'Pastoral', synced: false }, { title: 'Prayer: Johnson family', tag: 'Prayer', synced: true }];
  toxonEvents     = [{ name: 'Spring 3D Shoot', venue: 'Wildwood Archery', date: 'Jun 7',  entries: 24 }, { name: 'Indoor Qualifier', venue: 'Arrow Range', date: 'Jun 14', entries: 18 }];
  jobletJobs      = [{ title: 'Lawn mowing', price: '$45', distance: '0.3 mi', rating: '4.8' }, { title: 'Furniture assembly', price: '$60', distance: '1.2 mi', rating: '4.9' }, { title: 'Dog walking', price: '$20', distance: '0.5 mi', rating: '5.0' }];

  constructor() {
    afterNextRender(() => {
      this.startAuto();
    });
  }

  private getStep(): number {
    const track = this.trackRef?.nativeElement;
    if (!track) return 0;
    const cards = Array.from(track.querySelectorAll('.carousel-card')) as HTMLElement[];
    if (cards.length < 2) return cards[0]?.offsetWidth ?? 0;
    const r0 = cards[0].getBoundingClientRect();
    const r1 = cards[1].getBoundingClientRect();
    return r1.left - r0.left;
  }

  next() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const next = this.currentIndex() + 1;
    gsap.to(this.trackRef.nativeElement, {
      x: -next * this.getStep(),
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        if (next >= this.projects.length) {
          gsap.set(this.trackRef.nativeElement, { x: 0 });
          this.currentIndex.set(0);
        } else {
          this.currentIndex.set(next);
        }
        this.isAnimating = false;
      },
    });
  }

  prev() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const step = this.getStep();
    const prev = this.currentIndex() - 1;

    if (prev < 0) {
      // Jump to cloned end position, then animate to last real card
      gsap.set(this.trackRef.nativeElement, { x: -this.projects.length * step });
      this.currentIndex.set(this.projects.length);
      requestAnimationFrame(() => {
        const target = this.projects.length - 1;
        gsap.to(this.trackRef.nativeElement, {
          x: -target * step,
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => { this.currentIndex.set(target); this.isAnimating = false; },
        });
      });
      return;
    }

    gsap.to(this.trackRef.nativeElement, {
      x: -prev * step,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => { this.currentIndex.set(prev); this.isAnimating = false; },
    });
  }

  goTo(index: number) {
    if (this.isAnimating || index === this.currentIndex()) return;
    this.isAnimating = true;
    gsap.to(this.trackRef.nativeElement, {
      x: -index * this.getStep(),
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => { this.currentIndex.set(index); this.isAnimating = false; },
    });
  }

  pauseAuto() {
    this.isPaused = true;
    if (this.autoTimer) clearInterval(this.autoTimer);
  }

  resumeAuto() {
    this.isPaused = false;
    this.startAuto();
  }

  private startAuto() {
    if (this.autoTimer) clearInterval(this.autoTimer);
    this.autoTimer = setInterval(() => { if (!this.isPaused) this.next(); }, 3000);
  }
}
