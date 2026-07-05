import type { SiteData, SectionKey } from "../../types";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  HeroSection,
  MediaSection,
  ProjectsSection,
  ServicesSection,
  WritingSection,
} from "./sections";

const renderers: Record<SectionKey, (data: SiteData) => JSX.Element> = {
  hero: (data) => <HeroSection profile={data.profile} links={data.links} />,
  about: (data) => <AboutSection profile={data.profile} />,
  projects: (data) => <ProjectsSection projects={data.projects} />,
  experience: (data) => <ExperienceSection experience={data.experience} />,
  writing: (data) => <WritingSection writing={data.writing} />,
  media: (data) => <MediaSection media={data.media} />,
  services: (data) => <ServicesSection services={data.services} />,
  contact: (data) => <ContactSection profile={data.profile} links={data.links} />,
};

interface PublicSiteProps {
  data: SiteData;
  onHiddenAdminSignal: () => void;
}

export function PublicSite({ data, onHiddenAdminSignal }: PublicSiteProps) {
  const visibleSections = [...data.sections]
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#hero">
          {data.profile.name}
        </a>
        <nav>
          {visibleSections
            .filter((section) => section.id !== "hero")
            .slice(0, 5)
            .map((section) => (
              <a href={`#${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
        </nav>
        <a className="topbar-action" href={`mailto:${data.profile.email}`}>
          Contact
        </a>
      </header>

      {visibleSections.map((section) => (
        <div key={section.id}>{renderers[section.id](data)}</div>
      ))}

      <footer className="footer">
        <span>{data.seo.title}</span>
        <button
          className="admin-mark"
          type="button"
          aria-label="Site mark"
          onClick={onHiddenAdminSignal}
        >
          2026
        </button>
      </footer>
    </main>
  );
}
