import { BarChart3, Eye, Lock, LogOut, Save, Settings2, X } from "lucide-react";
import type { Language, SiteData } from "../../types";
import { adminCopy, adminTabs } from "../../i18n";
import { Button } from "../ui";
import {
  AppearanceEditor,
  DataEditor,
  ExperienceEditor,
  LinksEditor,
  MediaEditor,
  ProfileEditor,
  ProjectsEditor,
  SectionsEditor,
  SeoEditor,
  ServicesEditor,
  TranslationEditor,
  WritingEditor,
} from "./editors";

type Tab =
  | "dashboard"
  | "profile"
  | "sections"
  | "projects"
  | "experience"
  | "writing"
  | "media"
  | "services"
  | "links"
  | "appearance"
  | "translations"
  | "seo"
  | "data";

const tabs: Tab[] = [
  "dashboard",
  "profile",
  "sections",
  "projects",
  "experience",
  "writing",
  "media",
  "services",
  "links",
  "appearance",
  "translations",
  "seo",
  "data",
];

interface AdminPanelProps {
  data: SiteData;
  language: Language;
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  updateSite: (updater: (data: SiteData) => SiteData) => void;
  onImport: (data: SiteData) => void;
  onReset: () => void;
  onClose: () => void;
  onLogout: () => void;
}

export function AdminPanel({
  data,
  language,
  tab,
  onTabChange,
  updateSite,
  onImport,
  onReset,
  onClose,
  onLogout,
}: AdminPanelProps) {
  const copy = adminCopy[language];
  const tabLabels = adminTabs[language];

  return (
    <aside className="admin-panel" aria-label={copy.studio}>
      <div className="admin-sidebar">
        <div className="admin-brand">
          <Settings2 size={18} />
          <div>
            <strong>{copy.studio}</strong>
            <span>{copy.control}</span>
          </div>
        </div>
        <nav className="admin-tabs">
          {tabs.map((item) => (
            <button
              className={tab === item ? "active" : ""}
              type="button"
              onClick={() => onTabChange(item)}
              key={item}
            >
              {tabLabels[item]}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-actions">
          <Button onClick={onClose}>
            <Eye size={15} /> {copy.preview}
          </Button>
          <Button onClick={onLogout}>
            <LogOut size={15} /> {copy.logout}
          </Button>
        </div>
      </div>
      <div className="admin-content">
        <header className="admin-content-head">
          <div>
            <p>
              {copy.editing} {data.profile.name}
            </p>
            <h2>{tabLabels[tab]}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label={copy.closeAdmin}>
            <X size={18} />
          </button>
        </header>
        {tab === "dashboard" ? <Dashboard data={data} language={language} /> : null}
        {tab === "profile" ? (
          <ProfileEditor data={data} updateSite={updateSite} language={language} />
        ) : null}
        {tab === "sections" ? (
          <SectionsEditor data={data} updateSite={updateSite} language={language} />
        ) : null}
        {tab === "projects" ? (
          <ProjectsEditor data={data} updateSite={updateSite} language={language} />
        ) : null}
        {tab === "experience" ? (
          <ExperienceEditor data={data} updateSite={updateSite} language={language} />
        ) : null}
        {tab === "writing" ? (
          <WritingEditor data={data} updateSite={updateSite} language={language} />
        ) : null}
        {tab === "media" ? <MediaEditor data={data} updateSite={updateSite} language={language} /> : null}
        {tab === "services" ? (
          <ServicesEditor data={data} updateSite={updateSite} language={language} />
        ) : null}
        {tab === "links" ? <LinksEditor data={data} updateSite={updateSite} language={language} /> : null}
        {tab === "appearance" ? (
          <AppearanceEditor appearance={data.appearance} updateSite={updateSite} language={language} />
        ) : null}
        {tab === "translations" ? <TranslationEditor data={data} language={language} /> : null}
        {tab === "seo" ? <SeoEditor data={data} updateSite={updateSite} language={language} /> : null}
        {tab === "data" ? (
          <DataEditor data={data} onImport={onImport} onReset={onReset} language={language} />
        ) : null}
      </div>
    </aside>
  );
}

function Dashboard({ data, language }: { data: SiteData; language: Language }) {
  const copy = adminCopy[language];
  const visibleSections = data.sections.filter((section) => section.visible).length;
  const counts = [
    [language === "zh" ? "可见模块" : "Visible sections", visibleSections],
    [adminTabs[language].projects, data.projects.length],
    [adminTabs[language].writing, data.writing.length],
    [adminTabs[language].media, data.media.length],
    [adminTabs[language].services, data.services.length],
  ];

  return (
    <div className="dashboard">
      <section className="status-card">
        <div>
          <p>{copy.siteStatus}</p>
          <h3>{copy.draftSaved}</h3>
        </div>
        <Save size={22} />
      </section>
      <section className="status-card">
        <div>
          <p>{copy.security}</p>
          <h3>{copy.passwordGate}</h3>
        </div>
        <Lock size={22} />
      </section>
      <section className="status-card">
        <div>
          <p>{copy.lastSave}</p>
          <h3>{data.admin.lastSavedAt || copy.notSaved}</h3>
        </div>
        <BarChart3 size={22} />
      </section>
      <div className="count-grid">
        {counts.map(([label, count]) => (
          <div key={label}>
            <strong>{count}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
