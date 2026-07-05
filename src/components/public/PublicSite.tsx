import type { Language, SiteData, SectionKey } from "../../types";
import { publicCopy } from "../../i18n";
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

const renderers: Record<SectionKey, (data: SiteData, language: Language) => JSX.Element> = {
  hero: (data, language) => <HeroSection profile={data.profile} links={data.links} language={language} />,
  about: (data, language) => <AboutSection profile={data.profile} language={language} />,
  projects: (data, language) => <ProjectsSection projects={data.projects} language={language} />,
  experience: (data, language) => (
    <ExperienceSection experience={data.experience} language={language} />
  ),
  writing: (data, language) => <WritingSection writing={data.writing} language={language} />,
  media: (data, language) => <MediaSection media={data.media} language={language} />,
  services: (data, language) => <ServicesSection services={data.services} language={language} />,
  contact: (data, language) => (
    <ContactSection profile={data.profile} links={data.links} language={language} />
  ),
};

interface PublicSiteProps {
  data: SiteData;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onHiddenAdminSignal: () => void;
}

export function PublicSite({
  data,
  language,
  onLanguageChange,
  onHiddenAdminSignal,
}: PublicSiteProps) {
  const copy = publicCopy[language];
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
        <div className="topbar-tools">
          <button
            className="language-toggle"
            type="button"
            onClick={() => onLanguageChange(language === "zh" ? "en" : "zh")}
            aria-label="Switch language"
          >
            {copy.languageLabel}
          </button>
          <a className="topbar-action" href={`mailto:${data.profile.email}`}>
            {copy.contact}
          </a>
        </div>
      </header>

      {visibleSections.map((section) => (
        <div key={section.id}>{renderers[section.id](data, language)}</div>
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
