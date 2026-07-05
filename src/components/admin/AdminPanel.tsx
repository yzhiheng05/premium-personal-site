import { BarChart3, Eye, Lock, LogOut, Save, Settings2, X } from "lucide-react";
import type { SiteData } from "../../types";
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
  | "seo"
  | "data";

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "dashboard", label: "Dashboard" },
  { id: "profile", label: "Profile" },
  { id: "sections", label: "Sections" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "writing", label: "Writing" },
  { id: "media", label: "Media" },
  { id: "services", label: "Services" },
  { id: "links", label: "Links" },
  { id: "appearance", label: "Appearance" },
  { id: "seo", label: "SEO" },
  { id: "data", label: "Data" },
];

interface AdminPanelProps {
  data: SiteData;
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
  tab,
  onTabChange,
  updateSite,
  onImport,
  onReset,
  onClose,
  onLogout,
}: AdminPanelProps) {
  return (
    <aside className="admin-panel" aria-label="Studio Console">
      <div className="admin-sidebar">
        <div className="admin-brand">
          <Settings2 size={18} />
          <div>
            <strong>Studio Console</strong>
            <span>Single-site control</span>
          </div>
        </div>
        <nav className="admin-tabs">
          {tabs.map((item) => (
            <button
              className={tab === item.id ? "active" : ""}
              type="button"
              onClick={() => onTabChange(item.id)}
              key={item.id}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-actions">
          <Button onClick={onClose}>
            <Eye size={15} /> Preview
          </Button>
          <Button onClick={onLogout}>
            <LogOut size={15} /> Logout
          </Button>
        </div>
      </div>
      <div className="admin-content">
        <header className="admin-content-head">
          <div>
            <p>Editing {data.profile.name}</p>
            <h2>{tabs.find((item) => item.id === tab)?.label}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close admin">
            <X size={18} />
          </button>
        </header>
        {tab === "dashboard" ? <Dashboard data={data} /> : null}
        {tab === "profile" ? <ProfileEditor profile={data.profile} updateSite={updateSite} /> : null}
        {tab === "sections" ? <SectionsEditor sections={data.sections} updateSite={updateSite} /> : null}
        {tab === "projects" ? <ProjectsEditor projects={data.projects} updateSite={updateSite} /> : null}
        {tab === "experience" ? (
          <ExperienceEditor experience={data.experience} updateSite={updateSite} />
        ) : null}
        {tab === "writing" ? <WritingEditor writing={data.writing} updateSite={updateSite} /> : null}
        {tab === "media" ? <MediaEditor media={data.media} updateSite={updateSite} /> : null}
        {tab === "services" ? <ServicesEditor services={data.services} updateSite={updateSite} /> : null}
        {tab === "links" ? <LinksEditor links={data.links} updateSite={updateSite} /> : null}
        {tab === "appearance" ? (
          <AppearanceEditor appearance={data.appearance} updateSite={updateSite} />
        ) : null}
        {tab === "seo" ? <SeoEditor seo={data.seo} updateSite={updateSite} /> : null}
        {tab === "data" ? <DataEditor data={data} onImport={onImport} onReset={onReset} /> : null}
      </div>
    </aside>
  );
}

function Dashboard({ data }: { data: SiteData }) {
  const visibleSections = data.sections.filter((section) => section.visible).length;
  const counts = [
    ["Visible sections", visibleSections],
    ["Projects", data.projects.length],
    ["Writing", data.writing.length],
    ["Media", data.media.length],
    ["Services", data.services.length],
  ];

  return (
    <div className="dashboard">
      <section className="status-card">
        <div>
          <p>Site status</p>
          <h3>Draft changes save locally</h3>
        </div>
        <Save size={22} />
      </section>
      <section className="status-card">
        <div>
          <p>Security</p>
          <h3>Password gate active</h3>
        </div>
        <Lock size={22} />
      </section>
      <section className="status-card">
        <div>
          <p>Last save</p>
          <h3>{data.admin.lastSavedAt || "Not saved yet"}</h3>
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
