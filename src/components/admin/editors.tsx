import { Download, Plus, RotateCcw, Trash2, Upload } from "lucide-react";
import type {
  AppearanceData,
  ExperienceItem,
  Language,
  LinkItem,
  MediaItem,
  ProfileData,
  ProjectItem,
  SectionSetting,
  SeoData,
  ServiceItem,
  SiteData,
  WritingItem,
} from "../../types";
import { exportSiteData, parseSiteJson } from "../../data/storage";
import { Button, EditorBlock, Field, Select, TextArea, TextInput, Toggle } from "../ui";

type UpdateSite = (updater: (data: SiteData) => SiteData) => void;

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const next = [...items];
  const target = index + direction;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ProfileEditor({
  profile,
  updateSite,
}: {
  profile: ProfileData;
  updateSite: UpdateSite;
}) {
  const update = (patch: Partial<ProfileData>) =>
    updateSite((data) => ({ ...data, profile: { ...data.profile, ...patch } }));

  return (
    <EditorBlock title="Profile">
      <div className="form-grid">
        <Field label="Name">
          <TextInput value={profile.name} onChange={(name) => update({ name })} />
        </Field>
        <Field label="Role">
          <TextInput value={profile.role} onChange={(role) => update({ role })} />
        </Field>
        <Field label="Location">
          <TextInput value={profile.location} onChange={(location) => update({ location })} />
        </Field>
        <Field label="Email">
          <TextInput value={profile.email} onChange={(email) => update({ email })} />
        </Field>
        <Field label="Availability">
          <TextInput
            value={profile.availability}
            onChange={(availability) => update({ availability })}
          />
        </Field>
        <Field label="Hero image URL">
          <TextInput
            value={profile.heroImageUrl}
            onChange={(heroImageUrl) => update({ heroImageUrl })}
          />
        </Field>
      </div>
      <Field label="Tagline">
        <TextArea value={profile.tagline} onChange={(tagline) => update({ tagline })} />
      </Field>
      <Field label="Biography">
        <TextArea value={profile.biography} onChange={(biography) => update({ biography })} />
      </Field>
    </EditorBlock>
  );
}

export function SectionsEditor({
  sections,
  updateSite,
}: {
  sections: SectionSetting[];
  updateSite: UpdateSite;
}) {
  const ordered = [...sections].sort((a, b) => a.order - b.order);
  const commitOrder = (next: SectionSetting[]) =>
    updateSite((data) => ({
      ...data,
      sections: next.map((section, index) => ({ ...section, order: index + 1 })),
    }));

  return (
    <EditorBlock title="Sections">
      <div className="admin-list">
        {ordered.map((section, index) => (
          <div className="admin-row" key={section.id}>
            <strong>{section.title}</strong>
            <div className="row-actions">
              <Toggle
                checked={section.visible}
                label="Visible"
                onChange={(visible) =>
                  updateSite((data) => ({
                    ...data,
                    sections: data.sections.map((item) =>
                      item.id === section.id ? { ...item, visible } : item,
                    ),
                  }))
                }
              />
              <Button onClick={() => commitOrder(moveItem(ordered, index, -1))}>Up</Button>
              <Button onClick={() => commitOrder(moveItem(ordered, index, 1))}>Down</Button>
            </div>
          </div>
        ))}
      </div>
    </EditorBlock>
  );
}

export function ProjectsEditor({
  projects,
  updateSite,
}: {
  projects: ProjectItem[];
  updateSite: UpdateSite;
}) {
  const updateProject = (id: string, patch: Partial<ProjectItem>) =>
    updateSite((data) => ({
      ...data,
      projects: data.projects.map((project) =>
        project.id === id ? { ...project, ...patch } : project,
      ),
    }));

  return (
    <EditorBlock
      title="Projects"
      actions={
        <Button
          variant="primary"
          onClick={() =>
            updateSite((data) => ({
              ...data,
              projects: [
                ...data.projects,
                {
                  id: uid("p"),
                  title: "New Project",
                  category: "Advisory",
                  description: "Describe the work and its operating value.",
                  status: "Draft",
                  year: "2026",
                  link: "https://example.com",
                  featured: false,
                  visible: true,
                },
              ],
            }))
          }
        >
          <Plus size={15} /> Add
        </Button>
      }
    >
      <div className="stack">
        {projects.map((project, index) => (
          <article className="edit-card" key={project.id}>
            <div className="card-toolbar">
              <strong>{project.title}</strong>
              <div className="row-actions">
                <Button
                  onClick={() =>
                    updateSite((data) => ({ ...data, projects: moveItem(data.projects, index, -1) }))
                  }
                >
                  Up
                </Button>
                <Button
                  onClick={() =>
                    updateSite((data) => ({ ...data, projects: moveItem(data.projects, index, 1) }))
                  }
                >
                  Down
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    updateSite((data) => ({
                      ...data,
                      projects: data.projects.filter((item) => item.id !== project.id),
                    }))
                  }
                >
                  <Trash2 size={15} />
                </Button>
              </div>
            </div>
            <div className="form-grid">
              <Field label="Title">
                <TextInput value={project.title} onChange={(title) => updateProject(project.id, { title })} />
              </Field>
              <Field label="Category">
                <TextInput
                  value={project.category}
                  onChange={(category) => updateProject(project.id, { category })}
                />
              </Field>
              <Field label="Status">
                <TextInput value={project.status} onChange={(status) => updateProject(project.id, { status })} />
              </Field>
              <Field label="Year">
                <TextInput value={project.year} onChange={(year) => updateProject(project.id, { year })} />
              </Field>
              <Field label="Link">
                <TextInput value={project.link} onChange={(link) => updateProject(project.id, { link })} />
              </Field>
            </div>
            <Field label="Description">
              <TextArea
                value={project.description}
                onChange={(description) => updateProject(project.id, { description })}
              />
            </Field>
            <div className="toggle-row">
              <Toggle
                checked={project.visible}
                label="Visible"
                onChange={(visible) => updateProject(project.id, { visible })}
              />
              <Toggle
                checked={project.featured}
                label="Featured"
                onChange={(featured) => updateProject(project.id, { featured })}
              />
            </div>
          </article>
        ))}
      </div>
    </EditorBlock>
  );
}

export function ExperienceEditor({
  experience,
  updateSite,
}: {
  experience: ExperienceItem[];
  updateSite: UpdateSite;
}) {
  const updateExperience = (id: string, patch: Partial<ExperienceItem>) =>
    updateSite((data) => ({
      ...data,
      experience: data.experience.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  return (
    <CollectionEditor
      title="Experience"
      items={experience}
      addLabel="Add role"
      addItem={() =>
        updateSite((data) => ({
          ...data,
          experience: [
            ...data.experience,
            {
              id: uid("e"),
              organization: "Organization",
              role: "Role",
              period: "2026",
              description: "Describe the scope and impact.",
              highlights: ["Signal", "System", "Delivery"],
              visible: true,
            },
          ],
        }))
      }
      moveItemAt={(index, direction) =>
        updateSite((data) => ({ ...data, experience: moveItem(data.experience, index, direction) }))
      }
      deleteItem={(id) =>
        updateSite((data) => ({
          ...data,
          experience: data.experience.filter((item) => item.id !== id),
        }))
      }
      renderItem={(item) => (
        <>
          <div className="form-grid">
            <Field label="Role">
              <TextInput value={item.role} onChange={(role) => updateExperience(item.id, { role })} />
            </Field>
            <Field label="Organization">
              <TextInput
                value={item.organization}
                onChange={(organization) => updateExperience(item.id, { organization })}
              />
            </Field>
            <Field label="Period">
              <TextInput value={item.period} onChange={(period) => updateExperience(item.id, { period })} />
            </Field>
          </div>
          <Field label="Description">
            <TextArea
              value={item.description}
              onChange={(description) => updateExperience(item.id, { description })}
            />
          </Field>
          <Field label="Highlights, comma separated">
            <TextInput
              value={item.highlights.join(", ")}
              onChange={(value) =>
                updateExperience(item.id, {
                  highlights: value
                    .split(",")
                    .map((entry) => entry.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
          <Toggle
            checked={item.visible}
            label="Visible"
            onChange={(visible) => updateExperience(item.id, { visible })}
          />
        </>
      )}
    />
  );
}

export function WritingEditor({
  writing,
  updateSite,
}: {
  writing: WritingItem[];
  updateSite: UpdateSite;
}) {
  const updateWriting = (id: string, patch: Partial<WritingItem>) =>
    updateSite((data) => ({
      ...data,
      writing: data.writing.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  return (
    <CollectionEditor
      title="Writing"
      items={writing}
      addLabel="Add note"
      addItem={() =>
        updateSite((data) => ({
          ...data,
          writing: [
            ...data.writing,
            {
              id: uid("w"),
              title: "New Note",
              summary: "Short editorial summary.",
              tag: "Notes",
              date: new Date().toISOString().slice(0, 10),
              url: "https://example.com",
              published: true,
            },
          ],
        }))
      }
      moveItemAt={(index, direction) =>
        updateSite((data) => ({ ...data, writing: moveItem(data.writing, index, direction) }))
      }
      deleteItem={(id) =>
        updateSite((data) => ({ ...data, writing: data.writing.filter((item) => item.id !== id) }))
      }
      renderItem={(item) => (
        <>
          <div className="form-grid">
            <Field label="Title">
              <TextInput value={item.title} onChange={(title) => updateWriting(item.id, { title })} />
            </Field>
            <Field label="Tag">
              <TextInput value={item.tag} onChange={(tag) => updateWriting(item.id, { tag })} />
            </Field>
            <Field label="Date">
              <TextInput value={item.date} onChange={(date) => updateWriting(item.id, { date })} />
            </Field>
            <Field label="URL">
              <TextInput value={item.url} onChange={(url) => updateWriting(item.id, { url })} />
            </Field>
          </div>
          <Field label="Summary">
            <TextArea value={item.summary} onChange={(summary) => updateWriting(item.id, { summary })} />
          </Field>
          <Toggle
            checked={item.published}
            label="Published"
            onChange={(published) => updateWriting(item.id, { published })}
          />
        </>
      )}
    />
  );
}

export function MediaEditor({
  media,
  updateSite,
}: {
  media: MediaItem[];
  updateSite: UpdateSite;
}) {
  const updateMedia = (id: string, patch: Partial<MediaItem>) =>
    updateSite((data) => ({
      ...data,
      media: data.media.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  return (
    <CollectionEditor
      title="Media"
      items={media}
      addLabel="Add media"
      addItem={() =>
        updateSite((data) => ({
          ...data,
          media: [
            ...data.media,
            {
              id: uid("m"),
              title: "New Media",
              type: "case",
              url: "https://example.com",
              caption: "Describe this visual or appearance.",
              visible: true,
            },
          ],
        }))
      }
      moveItemAt={(index, direction) =>
        updateSite((data) => ({ ...data, media: moveItem(data.media, index, direction) }))
      }
      deleteItem={(id) =>
        updateSite((data) => ({ ...data, media: data.media.filter((item) => item.id !== id) }))
      }
      renderItem={(item) => (
        <>
          <div className="form-grid">
            <Field label="Title">
              <TextInput value={item.title} onChange={(title) => updateMedia(item.id, { title })} />
            </Field>
            <Field label="Type">
              <Select
                value={item.type}
                options={[
                  { label: "Image", value: "image" },
                  { label: "Talk", value: "talk" },
                  { label: "Press", value: "press" },
                  { label: "Case", value: "case" },
                ]}
                onChange={(type) => updateMedia(item.id, { type: type as MediaItem["type"] })}
              />
            </Field>
            <Field label="URL">
              <TextInput value={item.url} onChange={(url) => updateMedia(item.id, { url })} />
            </Field>
          </div>
          <Field label="Caption">
            <TextArea value={item.caption} onChange={(caption) => updateMedia(item.id, { caption })} />
          </Field>
          <Toggle
            checked={item.visible}
            label="Visible"
            onChange={(visible) => updateMedia(item.id, { visible })}
          />
        </>
      )}
    />
  );
}

export function ServicesEditor({
  services,
  updateSite,
}: {
  services: ServiceItem[];
  updateSite: UpdateSite;
}) {
  const updateService = (id: string, patch: Partial<ServiceItem>) =>
    updateSite((data) => ({
      ...data,
      services: data.services.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  return (
    <CollectionEditor
      title="Services"
      items={services}
      addLabel="Add service"
      addItem={() =>
        updateSite((data) => ({
          ...data,
          services: [
            ...data.services,
            {
              id: uid("s"),
              title: "New Service",
              description: "Describe the engagement clearly.",
              visible: true,
            },
          ],
        }))
      }
      moveItemAt={(index, direction) =>
        updateSite((data) => ({ ...data, services: moveItem(data.services, index, direction) }))
      }
      deleteItem={(id) =>
        updateSite((data) => ({
          ...data,
          services: data.services.filter((item) => item.id !== id),
        }))
      }
      renderItem={(item) => (
        <>
          <Field label="Title">
            <TextInput value={item.title} onChange={(title) => updateService(item.id, { title })} />
          </Field>
          <Field label="Description">
            <TextArea
              value={item.description}
              onChange={(description) => updateService(item.id, { description })}
            />
          </Field>
          <Toggle
            checked={item.visible}
            label="Visible"
            onChange={(visible) => updateService(item.id, { visible })}
          />
        </>
      )}
    />
  );
}

export function LinksEditor({ links, updateSite }: { links: LinkItem[]; updateSite: UpdateSite }) {
  const updateLink = (id: string, patch: Partial<LinkItem>) =>
    updateSite((data) => ({
      ...data,
      links: data.links.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  return (
    <CollectionEditor
      title="Links"
      items={links}
      addLabel="Add link"
      addItem={() =>
        updateSite((data) => ({
          ...data,
          links: [...data.links, { id: uid("l"), label: "New Link", url: "https://example.com", visible: true }],
        }))
      }
      moveItemAt={(index, direction) =>
        updateSite((data) => ({ ...data, links: moveItem(data.links, index, direction) }))
      }
      deleteItem={(id) =>
        updateSite((data) => ({ ...data, links: data.links.filter((item) => item.id !== id) }))
      }
      renderItem={(item) => (
        <>
          <div className="form-grid">
            <Field label="Label">
              <TextInput value={item.label} onChange={(label) => updateLink(item.id, { label })} />
            </Field>
            <Field label="URL">
              <TextInput value={item.url} onChange={(url) => updateLink(item.id, { url })} />
            </Field>
          </div>
          <Toggle
            checked={item.visible}
            label="Visible"
            onChange={(visible) => updateLink(item.id, { visible })}
          />
        </>
      )}
    />
  );
}

export function AppearanceEditor({
  appearance,
  updateSite,
  language,
}: {
  appearance: AppearanceData;
  updateSite: UpdateSite;
  language: Language;
}) {
  const update = (patch: Partial<AppearanceData>) =>
    updateSite((data) => ({ ...data, appearance: { ...data.appearance, ...patch } }));

  return (
    <EditorBlock title="Appearance">
      <div className="form-grid">
        <Field label={language === "zh" ? "默认语言" : "Default language"}>
          <Select
            value={appearance.language}
            options={[
              { label: "中文", value: "zh" },
              { label: "English", value: "en" },
            ]}
            onChange={(nextLanguage) => update({ language: nextLanguage as Language })}
          />
        </Field>
        <Field label="Theme">
          <Select
            value={appearance.theme}
            options={[
              { label: "Noir", value: "noir" },
              { label: "Paper", value: "paper" },
              { label: "System", value: "system" },
            ]}
            onChange={(theme) => update({ theme: theme as AppearanceData["theme"] })}
          />
        </Field>
        <Field label="Accent">
          <TextInput value={appearance.accent} onChange={(accent) => update({ accent })} />
        </Field>
        <Field label="Density">
          <Select
            value={appearance.density}
            options={[
              { label: "Calm", value: "calm" },
              { label: "Compact", value: "compact" },
            ]}
            onChange={(density) => update({ density: density as AppearanceData["density"] })}
          />
        </Field>
        <Field label="Motion">
          <Select
            value={appearance.motion}
            options={[
              { label: "Full", value: "full" },
              { label: "Reduced", value: "reduced" },
            ]}
            onChange={(motion) => update({ motion: motion as AppearanceData["motion"] })}
          />
        </Field>
      </div>
    </EditorBlock>
  );
}

export function SeoEditor({ seo, updateSite }: { seo: SeoData; updateSite: UpdateSite }) {
  const update = (patch: Partial<SeoData>) =>
    updateSite((data) => ({ ...data, seo: { ...data.seo, ...patch } }));

  return (
    <EditorBlock title="SEO and Metadata">
      <Field label="Page title">
        <TextInput value={seo.title} onChange={(title) => update({ title })} />
      </Field>
      <Field label="Description">
        <TextArea value={seo.description} onChange={(description) => update({ description })} />
      </Field>
      <div className="form-grid">
        <Field label="Keywords">
          <TextInput value={seo.keywords} onChange={(keywords) => update({ keywords })} />
        </Field>
        <Field label="Open Graph image">
          <TextInput value={seo.ogImage} onChange={(ogImage) => update({ ogImage })} />
        </Field>
      </div>
    </EditorBlock>
  );
}

export function DataEditor({
  data,
  onImport,
  onReset,
}: {
  data: SiteData;
  onImport: (data: SiteData) => void;
  onReset: () => void;
}) {
  const handleFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        onImport(parseSiteJson(String(reader.result)));
      } catch (error) {
        alert(error instanceof Error ? error.message : "Import failed.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <EditorBlock title="Data">
      <div className="data-actions">
        <Button variant="primary" onClick={() => downloadText("site-data.json", exportSiteData(data))}>
          <Download size={15} /> Export JSON
        </Button>
        <label className="button button-ghost">
          <Upload size={15} /> Import JSON
          <input
            className="file-input"
            type="file"
            accept="application/json"
            onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          />
        </label>
        <Button variant="danger" onClick={onReset}>
          <RotateCcw size={15} /> Reset
        </Button>
      </div>
      <pre className="json-preview">{exportSiteData(data).slice(0, 1600)}</pre>
    </EditorBlock>
  );
}

function CollectionEditor<T extends { id: string; title?: string; role?: string }>({
  title,
  items,
  addLabel,
  addItem,
  moveItemAt,
  deleteItem,
  renderItem,
}: {
  title: string;
  items: T[];
  addLabel: string;
  addItem: () => void;
  moveItemAt: (index: number, direction: -1 | 1) => void;
  deleteItem: (id: string) => void;
  renderItem: (item: T) => JSX.Element;
}) {
  return (
    <EditorBlock
      title={title}
      actions={
        <Button variant="primary" onClick={addItem}>
          <Plus size={15} /> {addLabel}
        </Button>
      }
    >
      <div className="stack">
        {items.map((item, index) => (
          <article className="edit-card" key={item.id}>
            <div className="card-toolbar">
              <strong>{item.title ?? item.role ?? item.id}</strong>
              <div className="row-actions">
                <Button onClick={() => moveItemAt(index, -1)}>Up</Button>
                <Button onClick={() => moveItemAt(index, 1)}>Down</Button>
                <Button variant="danger" onClick={() => deleteItem(item.id)}>
                  <Trash2 size={15} />
                </Button>
              </div>
            </div>
            {renderItem(item)}
          </article>
        ))}
      </div>
    </EditorBlock>
  );
}
