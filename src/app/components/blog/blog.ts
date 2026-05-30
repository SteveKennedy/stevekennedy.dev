import { Component, afterNextRender } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Post {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

@Component({
  selector: 'app-blog',
  imports: [],
  template: `
    <section id="blog" style="background: #FAFAF9; padding: 7rem 1.5rem;">
      <div style="max-width: 1100px; margin: 0 auto;">

        <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 3.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="section-label">Writing</span>
            <h2 class="section-heading">What I write.</h2>
          </div>
          <a href="#" style="font-size: 0.82rem; font-weight: 700; color: #7C3AED; text-decoration: none;
             display:inline-flex; align-items:center; gap:5px;"
             (mouseenter)="allHover=true" (mouseleave)="allHover=false"
             [style.gap]="allHover ? '10px' : '5px'"
             style="transition: gap 0.25s ease;">
            All posts →
          </a>
        </div>

        <div class="blog-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
          @for (post of posts; track post.id) {
            <article class="blog-card blog-item">
              <span style="font-size:0.68rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;
                           padding:3px 10px; border-radius:100px;"
                    [style.color]="post.categoryColor"
                    [style.background]="post.categoryColor + '18'">
                {{ post.category }}
              </span>

              <h3 style="font-family:'Bricolage Grotesque',sans-serif; font-size:1.1rem; font-weight:800;
                         letter-spacing:-0.02em; line-height:1.25; color:#1A1A1A; margin: 1rem 0 0.6rem;">
                {{ post.title }}
              </h3>

              <p style="font-size:0.875rem; color:#6B7280; line-height:1.65; margin:0 0 1.5rem;">
                {{ post.excerpt }}
              </p>

              <div style="display:flex; align-items:center; justify-content:space-between; margin-top:auto;">
                <div style="font-size:0.78rem; color:#B0B7C3;">
                  {{ post.date }} · {{ post.readTime }}
                </div>
                <a href="#" style="font-size:0.78rem; font-weight:700; color:#1A1A1A; text-decoration:none;
                   transition: color 0.2s;" (mouseenter)="postHover[post.id]=true" (mouseleave)="postHover[post.id]=false"
                   [style.color]="postHover[post.id] ? post.categoryColor : '#1A1A1A'">
                  Read →
                </a>
              </div>
            </article>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .blog-card { display: flex; flex-direction: column; }
    @media (max-width: 900px) {
      .blog-grid { grid-template-columns: 1fr 1fr !important; }
    }
    @media (max-width: 600px) {
      .blog-grid { grid-template-columns: 1fr !important; }
    }
  `],
})
export class BlogComponent {
  allHover = false;
  postHover: Record<number, boolean> = {};

  posts: Post[] = [
    {
      id: 1,
      category: 'Solo Building',
      categoryColor: '#F97316',
      title: 'Why I build alone (and why that\'s not a limitation)',
      excerpt: 'Most people see "one person" as a constraint. I see it as the fastest path from idea to deployment — fewer decisions to negotiate, more agency to execute.',
      date: 'May 2026',
      readTime: '5 min read',
    },
    {
      id: 2,
      category: 'Product',
      categoryColor: '#7C3AED',
      title: 'The Readiness Score: AI that makes ideas actionable',
      excerpt: 'Building nVision meant defining what "ready" looks like for an idea. Here\'s how we designed a scoring system that actually helps teams prioritize.',
      date: 'Apr 2026',
      readTime: '7 min read',
    },
    {
      id: 3,
      category: 'Dev Diary',
      categoryColor: '#06B6D4',
      title: '13 games, one app, and what SimpleJoys taught me',
      excerpt: 'I built 13 mini-games inside a single Ionic app over one weekend. It was chaos. Here\'s what I\'d do differently, and what I\'d do exactly the same.',
      date: 'Mar 2026',
      readTime: '6 min read',
    },
  ];

  constructor() {
    afterNextRender(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.blog-item', {
        y: 44,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#blog', start: 'top 72%' },
      });
    });
  }
}
