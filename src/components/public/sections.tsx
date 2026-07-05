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
  Language,
  LinkItem,
  MediaItem,
  ProfileData,
  ProjectItem,
  ServiceItem,
  WritingItem,
} from "../../types";
import { publicCopy } from "../../i18n";

export function HeroSection({
  profile,
  links,
  language,
}: {
  profile: ProfileData;
  links: LinkItem[];
  language: Language;
}) {
  const visibleLinks = links.filter((link) => link.visible);
  const copy = publicCopy[language];

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
            {copy.startConversation}
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
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-coordinate hero-coordinate-top" aria-hidden="true">
          {copy.fieldIndex} / 01
        </div>
        <div className="hero-coordinate hero-coordinate-side" aria-hidden="true">
          {copy.dossier} 2026
        </div>
        <div className="hero-dossier">
          <span>{copy.currentFile}</span>
          <strong>{profile.role}</strong>
          <small>{profile.location}</small>
        </div>
        <div className="hero-panel">
          <span>{copy.availability}</span>
          <strong>{profile.availability}</strong>
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ profile, language }: { profile: ProfileData; language: Language }) {
  const copy = publicCopy[language];

  return (
    <section className="section about" id="about">
      <div>
        <p className="section-kicker">{copy.practice}</p>
        <h2>{copy.aboutHeading}</h2>
      </div>
      <div className="about-body">
        <p>{profile.biography}</p>
        <div className="metrics">
          <div>
            <strong>12+</strong>
            <span>{copy.metricOne}</span>
          </div>
          <div>
            <strong>34</strong>
            <span>{copy.metricTwo}</span>
          </div>
          <div>
            <strong>3</strong>
            <span>{copy.metricThree}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({
  projects,
  language,
}: {
  projects: ProjectItem[];
  language: Language;
}) {
  const visible = projects.filter((project) => project.visible);
  const copy = publicCopy[language];

  return (
    <section className="section projects" id="projects">
      <div className="section-head">
        <p className="section-kicker">{copy.selectedWork}</p>
        <h2>{copy.projectsHeading}</h2>
      </div>
      <div className="project-list">
        {visible.map((project, index) => (
          <article className={project.featured ? "project featured" : "project"} key={project.id}>
            <div className="project-body">
              <div className="project-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.category}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <footer>
              <span className="project-status">{project.status}</span>
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

export function ExperienceSection({
  experience,
  language,
}: {
  experience: ExperienceItem[];
  language: Language;
}) {
  const copy = publicCopy[language];

  return (
    <section className="section timeline" id="experience">
      <div className="section-head">
        <p className="section-kicker">{copy.experience}</p>
        <h2>{copy.experienceHeading}</h2>
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

export function WritingSection({ writing, language }: { writing: WritingItem[]; language: Language }) {
  const copy = publicCopy[language];

  return (
    <section className="section writing" id="writing">
      <div className="section-head">
        <p className="section-kicker">{copy.writing}</p>
        <h2>{copy.writingHeading}</h2>
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

export function MediaSection({ media, language }: { media: MediaItem[]; language: Language }) {
  const copy = publicCopy[language];

  return (
    <section className="section media" id="media">
      <div className="section-head">
        <p className="section-kicker">{copy.media}</p>
        <h2>{copy.mediaHeading}</h2>
      </div>
      <div className="media-grid">
        {media
          .filter((item) => item.visible)
          .map((item, index) => (
            <article
              className={`media-item media-${item.type}${index === 0 ? " media-primary" : ""}`}
              key={item.id}
            >
              {item.type === "image" && item.url ? <img src={item.url} alt="" /> : <Sparkles size={28} />}
              <div>
                <span>
                  {copy.archiveRecord} {String(index + 1).padStart(2, "0")} / {item.type}
                </span>
                <h3>{item.title}</h3>
                <p>{item.caption}</p>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}

export function ServicesSection({
  services,
  language,
}: {
  services: ServiceItem[];
  language: Language;
}) {
  const copy = publicCopy[language];

  return (
    <section className="section services" id="services">
      <div className="section-head">
        <p className="section-kicker">{copy.services}</p>
        <h2>{copy.servicesHeading}</h2>
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
  language,
}: {
  profile: ProfileData;
  links: LinkItem[];
  language: Language;
}) {
  const copy = publicCopy[language];

  return (
    <section className="section contact" id="contact">
      <div>
        <p className="section-kicker">{copy.contact}</p>
        <h2>{copy.contactHeading}</h2>
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
