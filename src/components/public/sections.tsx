import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  MapPin,
  MoveRight,
  PenLine,
  Sparkles,
} from "lucide-react";
import type {
  ExperienceItem,
  LinkItem,
  MediaItem,
  ProfileData,
  ProjectItem,
  ServiceItem,
  WritingItem,
} from "../../types";

export function HeroSection({
  profile,
  links,
}: {
  profile: ProfileData;
  links: LinkItem[];
}) {
  const visibleLinks = links.filter((link) => link.visible);

  return (
    <section className="hero section" id="hero">
      <div className="hero-copy">
        <div className="brand-line">
          <span />
          {profile.location}
        </div>
        <h1>{profile.name}</h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            Start a conversation
            <MoveRight size={16} />
          </a>
          {visibleLinks.slice(0, 1).map((link) => (
            <a className="button button-ghost" href={link.url} key={link.id}>
              {link.label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </div>
      <div className="hero-visual" aria-label="Studio visual">
        {profile.heroImageUrl ? <img src={profile.heroImageUrl} alt="" /> : null}
        <div className="hero-panel">
          <span>Availability</span>
          <strong>{profile.availability}</strong>
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ profile }: { profile: ProfileData }) {
  return (
    <section className="section about" id="about">
      <div>
        <p className="section-kicker">Practice</p>
        <h2>Quiet systems for work that cannot afford noise.</h2>
      </div>
      <div className="about-body">
        <p>{profile.biography}</p>
        <div className="metrics">
          <div>
            <strong>12+</strong>
            <span>years shaping complex tools</span>
          </div>
          <div>
            <strong>34</strong>
            <span>private product systems</span>
          </div>
          <div>
            <strong>3</strong>
            <span>operating modes: advise, design, build</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  const visible = projects.filter((project) => project.visible);

  return (
    <section className="section projects" id="projects">
      <div className="section-head">
        <p className="section-kicker">Selected Work</p>
        <h2>Systems with a strong point of view.</h2>
      </div>
      <div className="project-list">
        {visible.map((project) => (
          <article className={project.featured ? "project featured" : "project"} key={project.id}>
            <div>
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <footer>
              <span>{project.status}</span>
              <span>{project.year}</span>
              {project.link ? (
                <a href={project.link} aria-label={`${project.title} link`}>
                  <ArrowUpRight size={17} />
                </a>
              ) : null}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section className="section timeline" id="experience">
      <div className="section-head">
        <p className="section-kicker">Experience</p>
        <h2>From research surfaces to executive tooling.</h2>
      </div>
      <div className="timeline-list">
        {experience
          .filter((item) => item.visible)
          .map((item) => (
            <article className="timeline-row" key={item.id}>
              <div className="timeline-date">
                <CalendarDays size={16} />
                {item.period}
              </div>
              <div>
                <h3>{item.role}</h3>
                <p className="muted">{item.organization}</p>
                <p>{item.description}</p>
                <div className="tag-row">
                  {item.highlights.map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}

export function WritingSection({ writing }: { writing: WritingItem[] }) {
  return (
    <section className="section writing" id="writing">
      <div className="section-head">
        <p className="section-kicker">Writing</p>
        <h2>Notes on tools, attention, and institutional memory.</h2>
      </div>
      <div className="writing-grid">
        {writing
          .filter((item) => item.published)
          .map((item) => (
            <a className="writing-card" href={item.url} key={item.id}>
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <small>{item.date}</small>
            </a>
          ))}
      </div>
    </section>
  );
}

export function MediaSection({ media }: { media: MediaItem[] }) {
  return (
    <section className="section media" id="media">
      <div className="section-head">
        <p className="section-kicker">Media</p>
        <h2>Visual notes from the studio archive.</h2>
      </div>
      <div className="media-grid">
        {media
          .filter((item) => item.visible)
          .map((item) => (
            <article className={`media-item media-${item.type}`} key={item.id}>
              {item.type === "image" && item.url ? <img src={item.url} alt="" /> : <Sparkles size={28} />}
              <div>
                <span>{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.caption}</p>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  return (
    <section className="section services" id="services">
      <div className="section-head">
        <p className="section-kicker">Services</p>
        <h2>Focused engagements for teams with complicated work.</h2>
      </div>
      <div className="service-list">
        {services
          .filter((service) => service.visible)
          .map((service) => (
            <article className="service" key={service.id}>
              <BriefcaseBusiness size={18} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
      </div>
    </section>
  );
}

export function ContactSection({
  profile,
  links,
}: {
  profile: ProfileData;
  links: LinkItem[];
}) {
  return (
    <section className="section contact" id="contact">
      <div>
        <p className="section-kicker">Contact</p>
        <h2>Bring the shape of the work. I will bring the operating clarity.</h2>
      </div>
      <div className="contact-panel">
        <p>
          <MapPin size={16} />
          {profile.location}
        </p>
        <a href={`mailto:${profile.email}`}>
          <Mail size={16} />
          {profile.email}
        </a>
        <div className="link-row">
          {links
            .filter((link) => link.visible)
            .map((link) => (
              <a href={link.url} key={link.id}>
                {link.label}
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}

export function SectionIcon() {
  return <PenLine size={15} />;
}
