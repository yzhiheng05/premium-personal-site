import type { CSSProperties } from "react";
import { BarChart3, Eye, Lock, LogOut, Save, Settings2, X } from "lucide-react";
import type { Language, SiteData } from "../../types";
import { adminCopy, adminTabs, localizeSiteData, normalizeLanguage } from "../../i18n";
import { Button } from "../ui";
import { PublicSite } from "../public/PublicSite";
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
  effectiveData: SiteData;
  language: Language;
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  updateSite: (updater: (data: SiteData) => SiteData) => void;
  hasUnsavedChanges: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onImport: (data: SiteData) => void;
  onReset: () => void;
  onClose: () => void;
  onLogout: () => void;
}

export function AdminPanel({
  data,
  effectiveData,
  language,
  tab,
  onTabChange,
  updateSite,
  hasUnsavedChanges,
  onSave,
  onDiscard,
  onImport,
  onReset,
  onClose,
  onLogout,
}: AdminPanelProps) {
  const copy = adminCopy[language];
  const tabLabels = adminTabs[language];
  const previewLanguage = normalizeLanguage(data.appearance.language);
  const previewData = localizeSiteData(data, previewLanguage);
  const previewStyle = {
    "--accent": data.appearance.accent,
  } as CSSProperties;

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
          <div className="admin-save-cluster">
            <div className={hasUnsavedChanges ? "save-status save-status-draft" : "save-status"}>
              <strong>{hasUnsavedChanges ? copy.unsavedChanges : copy.savedAndLive}</strong>
              <span>{hasUnsavedChanges ? copy.previewOnly : copy.localStorageSaved}</span>
            </div>
            <Button variant="primary" onClick={onSave} disabled={!hasUnsavedChanges}>
              <Save size={15} /> {copy.saveApply}
            </Button>
            <Button onClick={onDiscard} disabled={!hasUnsavedChanges}>
              {copy.discardDraft}
            </Button>
            <button className="icon-button" type="button" onClick={onClose} aria-label={copy.closeAdmin}>
              <X size={18} />
            </button>
          </div>
        </header>
        <div className="save-help">
          <strong>{copy.storageLabel}</strong>
          <span>{copy.storageHint}</span>
        </div>
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
      <aside className="admin-preview-pane" aria-label={copy.livePreview}>
        <div className="admin-preview-head">
          <div>
            <strong>{copy.livePreview}</strong>
            <span>{hasUnsavedChanges ? copy.previewDraft : copy.previewLive}</span>
          </div>
          <span>{previewLanguage === "zh" ? "中文" : "English"}</span>
        </div>
        <div
          className={`admin-preview-frame app theme-${data.appearance.theme} density-${data.appearance.density} motion-${data.appearance.motion}`}
          style={previewStyle}
        >
          <PublicSite
            data={previewData}
            language={previewLanguage}
            onLanguageChange={(nextLanguage) =>
              updateSite((current) => ({
                ...current,
                appearance: {
                  ...current.appearance,
                  language: nextLanguage,
                },
              }))
            }
            onHiddenAdminSignal={() => undefined}
          />
        </div>
        <div className="admin-preview-foot">
          <span>{copy.effectiveNow}</span>
          <strong>{effectiveData.admin.lastSavedAt || copy.notSaved}</strong>
        </div>
      </aside>
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
