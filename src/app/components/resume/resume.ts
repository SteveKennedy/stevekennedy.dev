import { Component, afterNextRender } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Role {
  id: number;
  title: string;
  company: string;
  companyMeta: string;
  period: string;
  bullets: string[];
  nodeColor: 'purple' | 'orange';
  side: 'left' | 'right';
}

@Component({
  selector: 'app-resume',
  imports: [NgTemplateOutlet],
  template: `
    <section id="resume" style="background: #F7F7F5; padding: 7rem 1.5rem;">
      <div style="max-width: 900px; margin: 0 auto;">

        <div style="text-align:center; margin-bottom:4rem;">
          <span class="section-label">Experience</span>
          <h2 class="section-heading">Where I've been.</h2>
        </div>

        <div class="timeline-track">
          @for (role of roles; track role.id) {
            <div class="resume-item"
                 style="position:relative; display:grid; grid-template-columns:1fr 40px 1fr; margin-bottom:2.5rem;">

              @if (role.side === 'right') {
                <div style="grid-column:1;"></div>
                <div style="grid-column:2; display:flex; justify-content:center; padding-top:1.3rem;">
                  <div class="timeline-node" [class.orange]="role.nodeColor === 'orange'"
                       style="position:static; transform:none; margin:0;"></div>
                </div>
                <div style="grid-column:3; padding-left:2rem;">
                  <ng-container [ngTemplateOutlet]="card" [ngTemplateOutletContext]="{ role: role }"></ng-container>
                </div>
              }

              @if (role.side === 'left') {
                <div style="grid-column:1; padding-right:2rem; text-align:right;">
                  <ng-container [ngTemplateOutlet]="card" [ngTemplateOutletContext]="{ role: role }"></ng-container>
                </div>
                <div style="grid-column:2; display:flex; justify-content:center; padding-top:1.3rem;">
                  <div class="timeline-node" [class.orange]="role.nodeColor === 'orange'"
                       style="position:static; transform:none; margin:0;"></div>
                </div>
                <div style="grid-column:3;"></div>
              }

            </div>
          }
        </div>

        <!-- Education & Certs -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-top:2rem;">
          <div class="resume-item" style="background:white; border-radius:14px; padding:1.25rem 1.5rem;
               border:1px solid rgba(0,0,0,0.055); box-shadow:0 2px 16px rgba(0,0,0,0.04);">
            <div style="font-size:0.68rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase;
                        color:#B0B7C3; margin-bottom:0.75rem;">Education</div>
            @for (ed of education; track ed.school) {
              <div style="margin-bottom:0.6rem;">
                <div style="font-weight:700; font-size:0.9rem; color:#1A1A1A;">{{ ed.degree }}</div>
                <div style="font-size:0.8rem; color:#9CA3AF;">{{ ed.school }}</div>
              </div>
            }
          </div>
          <div class="resume-item" style="background:white; border-radius:14px; padding:1.25rem 1.5rem;
               border:1px solid rgba(0,0,0,0.055); box-shadow:0 2px 16px rgba(0,0,0,0.04);">
            <div style="font-size:0.68rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase;
                        color:#B0B7C3; margin-bottom:0.75rem;">Certifications</div>
            @for (cert of certs; track cert) {
              <div style="font-size:0.82rem; color:#6B7280; margin-bottom:5px; display:flex; align-items:center; gap:6px;">
                <span style="width:5px; height:5px; border-radius:50%; background:#7C3AED; flex-shrink:0; display:inline-block;"></span>
                {{ cert }}
              </div>
            }
          </div>
        </div>

        <!-- Download CTA -->
        <div style="text-align:center; margin-top:2.5rem;">
          <a href="#" style="display:inline-flex; align-items:center; gap:8px; padding:12px 28px;
             border-radius:100px; border:2px solid #E5E7EB; font-size:0.82rem; font-weight:700;
             color:#1A1A1A; text-decoration:none; background:white; transition:all 0.25s ease;"
             (mouseenter)="dlHover=true" (mouseleave)="dlHover=false"
             [style.border-color]="dlHover ? '#7C3AED' : '#E5E7EB'"
             [style.color]="dlHover ? '#7C3AED' : '#1A1A1A'">
            ↓ Download full resume
          </a>
        </div>

      </div>
    </section>

    <ng-template #card let-role="role">
      <div style="background:white; border-radius:14px; padding:1.25rem 1.5rem; text-align:left;
                  border:1px solid rgba(0,0,0,0.055); box-shadow:0 2px 16px rgba(0,0,0,0.04);">
        <div style="font-family:'Bricolage Grotesque',sans-serif; font-size:1rem; font-weight:800;
                    letter-spacing:-0.02em; color:#1A1A1A; margin-bottom:4px;">{{ role.title }}</div>
        <div style="font-size:0.78rem; color:#9CA3AF; font-weight:500; margin-bottom:10px;">
          {{ role.company }}&nbsp;·&nbsp;{{ role.companyMeta }}&nbsp;·&nbsp;{{ role.period }}
        </div>
        <ul style="margin:0; padding:0 0 0 1rem; list-style:disc;">
          @for (bullet of role.bullets; track bullet) {
            <li style="font-size:0.82rem; color:#6B7280; line-height:1.6; margin-bottom:4px;">{{ bullet }}</li>
          }
        </ul>
      </div>
    </ng-template>
  `,
  styles: [`
    @media (max-width: 640px) {
      .resume-item { grid-template-columns: 24px 1fr !important; }
    }
  `],
})
export class ResumeComponent {
  dlHover = false;

  roles: Role[] = [
    {
      id: 1,
      title: 'Software Architect',
      company: 'Nelnet',
      companyMeta: 'Lincoln, NE',
      period: 'May 2023 – Present',
      bullets: [
        'Architected a greenfield SaaS daycare management platform end to end — software, cloud, and infrastructure — serving private and faith-based schools nationwide.',
        'Led the rollout of AI-assisted development across engineering teams, driving adoption of GitHub Copilot, Windsurf, Claude Code, and CodeRabbit.',
        'Provide technical direction and mentorship, establishing architecture, security, and quality standards across teams.',
      ],
      nodeColor: 'orange',
      side: 'right',
    },
    {
      id: 2,
      title: 'Software Engineering Manager',
      company: 'Q2 Banking',
      companyMeta: 'Austin, TX',
      period: 'Feb 2020 – May 2023',
      bullets: [
        'Led 20+ engineers (C#, Python, QA) delivering banking software for top-tier clients tied to nearly $40M in annual revenue.',
        'Recruited and mentored senior engineers into technical leadership roles.',
        'Built a global delivery model integrating onshore and offshore teams across the US, India, and Mexico.',
        'Engaged clients at the executive and technical level to ensure delivery of customized solutions.',
      ],
      nodeColor: 'purple',
      side: 'left',
    },
    {
      id: 3,
      title: 'Sr. Software Development Supervisor',
      company: 'Assurity',
      companyMeta: 'Lincoln, NE',
      period: 'Dec 2016 – Feb 2020',
      bullets: [
        'Managed up to 11 developers — performance reviews, one-on-ones, career coaching, hiring, and personnel decisions.',
        'Championed engineering best practices across the team: SOLID, dependency injection, unit testing, static analysis, source control.',
        'Earlier as Software Developer (Mar 2014–Dec 2016): built internal web apps and APIs in C# to streamline insurance policy workflows and pioneered a new electronic enrollment system.',
      ],
      nodeColor: 'orange',
      side: 'right',
    },
    {
      id: 4,
      title: 'Earlier Experience',
      company: 'Ameritas · NRC · Olsson Associates',
      companyMeta: 'Nebraska',
      period: '1999 – 2014',
      bullets: [
        'Business Analyst — Ameritas (2010–2014): managed large-scale HIPAA/EDI X12 compliance projects and led IBM WebSphere Transformation Extender & Partner Gateway implementations.',
        '.NET Developer / Lead — National Research Corporation (2007–2010): developer and lead on Windows and web projects from requirements through delivery; built data processing, reporting, and BI apps; supervised a small dev team.',
        'Web Developer — Olsson Associates (2006–2007): client-driven ASP.NET projects with full web server administration; coordinated across engineering, marketing, and client teams.',
        'Programmer/Analyst — Ameritas (2001–2006): lead developer for the corporate website and 10+ affiliated sites; built the Intranet re-development and electronic reporting portal; expert-level SOA web services in Perl, ASP, C#, and XML. Promoted on merit.',
      ],
      nodeColor: 'purple',
      side: 'left',
    },
  ];

  education = [
    { degree: 'Computer Science & Engineering', school: 'University of Nebraska – Kearney' },
    { degree: 'Engineering',                    school: 'Western Nebraska Community College' },
  ];

  certs = [
    'AWS Certified Cloud Practitioner',
    'Microsoft Certified: Azure Fundamentals',
    'Certified Java Programmer (CIW)',
    'IBM Certified e-Business Solution Designer',
  ];

  constructor() {
    afterNextRender(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.resume-item', {
        y: 36,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#resume', start: 'top 68%' },
      });
    });
  }
}
