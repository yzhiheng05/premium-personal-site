import { useState } from "react";
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
import { getChineseTranslationCoverage } from "../../i18n";
import { Button, EditorBlock, Field, Select, TextArea, TextInput, Toggle } from "../ui";

type UpdateSite = (updater: (data: SiteData) => SiteData) => void;

const editorCopy = {
  en: {
    profile: "Profile",
    sections: "Sections",
    projects: "Projects",
    experience: "Experience",
    writing: "Writing",
    media: "Media",
    services: "Services",
    links: "Links",
    appearance: "Appearance",
    data: "Data",
    seo: "SEO and Metadata",
    add: "Add",
    addRole: "Add role",
    addNote: "Add note",
    addMedia: "Add media",
    addService: "Add service",
    addLink: "Add link",
    up: "Up",
    down: "Down",
    delete: "Delete",
    visible: "Visible",
    featured: "Featured",
    published: "Published",
    name: "Name",
    role: "Role",
    location: "Location",
    email: "Email",
    availability: "Availability",
    heroImageUrl: "Hero image URL",
    tagline: "Tagline",
    biography: "Biography",
    title: "Title",
    category: "Category",
    status: "Status",
    year: "Year",
    link: "Link",
    description: "Description",
    organization: "Organization",
    period: "Period",
    highlights: "Highlights, comma separated",
    tag: "Tag",
    date: "Date",
    url: "URL",
    summary: "Summary",
    type: "Type",
    caption: "Caption",
    label: "Label",
    defaultLanguage: "Default language",
    theme: "Theme",
    accent: "Accent",
    density: "Density",
    motion: "Motion",
    pageTitle: "Page title",
    keywords: "Keywords",
    openGraphImage: "Open Graph image",
    exportJson: "Export JSON",
    importJson: "Import JSON",
    reset: "Reset",
    importFailed: "Import failed.",
    englishContent: "English",
    chineseContent: "Chinese",
    translationCheck: "Translation Check",
    translationCheckBody: "Use the content tabs to edit English and Chinese side by side.",
    options: {
      english: "English",
      image: "Image",
      talk: "Talk",
      press: "Press",
      case: "Case",
      noir: "Noir",
      paper: "Paper",
      system: "System",
      calm: "Calm",
      compact: "Compact",
      full: "Full",
      reduced: "Reduced",
    },
  },
  zh: {
    profile: "个人资料",
    sections: "页面模块",
    projects: "项目",
    experience: "经历",
    writing: "文章",
    media: "媒体",
    services: "服务",
    links: "链接",
    appearance: "外观",
    data: "数据",
    seo: "SEO 与元数据",
    add: "添加",
    addRole: "添加经历",
    addNote: "添加文章",
    addMedia: "添加媒体",
    addService: "添加服务",
    addLink: "添加链接",
    up: "上移",
    down: "下移",
    delete: "删除",
    visible: "显示",
    featured: "精选",
    published: "已发布",
    name: "姓名",
    role: "身份",
    location: "地点",
    email: "邮箱",
    availability: "可合作状态",
    heroImageUrl: "首屏图片 URL",
    tagline: "简介短句",
    biography: "个人介绍",
    title: "标题",
    category: "类别",
    status: "状态",
    year: "年份",
    link: "链接",
    description: "描述",
    organization: "机构",
    period: "时间",
    highlights: "亮点，逗号分隔",
    tag: "标签",
    date: "日期",
    url: "URL",
    summary: "摘要",
    type: "类型",
    caption: "说明",
    label: "标签",
    defaultLanguage: "默认语言",
    theme: "主题",
    accent: "强调色",
    density: "密度",
    motion: "动效",
    pageTitle: "页面标题",
    keywords: "关键词",
    openGraphImage: "Open Graph 图片",
    exportJson: "导出 JSON",
    importJson: "导入 JSON",
    reset: "重置",
    importFailed: "导入失败。",
    englishContent: "英文",
    chineseContent: "中文",
    translationCheck: "翻译检查",
    translationCheckBody: "请在各内容页并排编辑英文和中文，这里只检查中文覆盖情况。",
    options: {
      english: "英文",
      image: "图片",
      talk: "演讲",
      press: "报道",
      case: "案例",
      noir: "深色",
      paper: "浅纸",
      system: "跟随系统",
      calm: "舒展",
      compact: "紧凑",
      full: "完整",
      reduced: "减少",
    },
  },
} as const;

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

function formatImportError(message: string, language: Language) {
  if (language === "en") return message;
  if (message === "Import failed: JSON is not valid.") return "导入失败：JSON 格式不正确。";
  if (message === "Import failed: this file is not compatible site data.") {
    return "导入失败：这个文件不是兼容的站点数据。";
  }
  return message.replace("Import failed", "导入失败");
}

function csvToItems(value: string): string[] {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function updateEnglishValue(data: SiteData, path: string, value: string): SiteData {
  const [group, idOrField, field] = path.split(".");

  if (group === "profile") {
    switch (idOrField) {
      case "name":
      case "role":
      case "location":
      case "availability":
      case "tagline":
      case "biography":
        return { ...data, profile: { ...data.profile, [idOrField]: value } };
      default:
        return data;
    }
  }

  if (group === "sections" && field === "title") {
    return {
      ...data,
      sections: data.sections.map((section) =>
        section.id === idOrField ? { ...section, title: value } : section,
      ),
    };
  }

  if (group === "links" && field === "label") {
    return {
      ...data,
      links: data.links.map((link) => (link.id === idOrField ? { ...link, label: value } : link)),
    };
  }

  if (group === "projects") {
    switch (field) {
      case "title":
      case "category":
      case "description":
      case "status":
        return {
          ...data,
          projects: data.projects.map((project) =>
            project.id === idOrField ? { ...project, [field]: value } : project,
          ),
        };
      default:
        return data;
    }
  }

  if (group === "experience") {
    switch (field) {
      case "organization":
      case "role":
      case "description":
        return {
          ...data,
          experience: data.experience.map((item) =>
            item.id === idOrField ? { ...item, [field]: value } : item,
          ),
        };
      case "highlights":
        return {
          ...data,
          experience: data.experience.map((item) =>
            item.id === idOrField ? { ...item, highlights: csvToItems(value) } : item,
          ),
        };
      default:
        return data;
    }
  }

  if (group === "writing") {
    switch (field) {
      case "title":
      case "tag":
      case "summary":
        return {
          ...data,
          writing: data.writing.map((item) =>
            item.id === idOrField ? { ...item, [field]: value } : item,
          ),
        };
      default:
        return data;
    }
  }

  if (group === "media") {
    switch (field) {
      case "title":
      case "caption":
        return {
          ...data,
          media: data.media.map((item) => (item.id === idOrField ? { ...item, [field]: value } : item)),
        };
      default:
        return data;
    }
  }

  if (group === "services") {
    switch (field) {
      case "title":
      case "description":
        return {
          ...data,
          services: data.services.map((service) =>
            service.id === idOrField ? { ...service, [field]: value } : service,
          ),
        };
      default:
        return data;
    }
  }

  if (group === "seo") {
    switch (idOrField) {
      case "title":
      case "description":
      case "keywords":
        return { ...data, seo: { ...data.seo, [idOrField]: value } };
      default:
        return data;
    }
  }

  return data;
}

function updateChineseValue(data: SiteData, path: string, value: string): SiteData {
  return {
    ...data,
    translations: {
      zh: {
        ...data.translations?.zh,
        [path]: value,
      },
    },
  };
}

function chineseValue(data: SiteData, path: string): string {
  return data.translations?.zh[path] ?? "";
}

export function ProfileEditor({
  data,
  updateSite,
  language,
}: {
  data: SiteData;
  updateSite: UpdateSite;
  language: Language;
}) {
  const t = editorCopy[language];
  const profile = data.profile;
  const update = (patch: Partial<ProfileData>) =>
    updateSite((data) => ({ ...data, profile: { ...data.profile, ...patch } }));

  return (
    <EditorBlock title={t.profile}>
      <div className="form-grid">
        <BilingualField
          label={t.name}
          language={language}
          path="profile.name"
          sourceValue={profile.name}
          translationValue={chineseValue(data, "profile.name")}
          updateSite={updateSite}
        />
        <BilingualField
          label={t.role}
          language={language}
          path="profile.role"
          sourceValue={profile.role}
          translationValue={chineseValue(data, "profile.role")}
          updateSite={updateSite}
        />
        <BilingualField
          label={t.location}
          language={language}
          path="profile.location"
          sourceValue={profile.location}
          translationValue={chineseValue(data, "profile.location")}
          updateSite={updateSite}
        />
        <Field label={t.email}>
          <TextInput value={profile.email} onChange={(email) => update({ email })} />
        </Field>
        <BilingualField
          label={t.availability}
          language={language}
          path="profile.availability"
          sourceValue={profile.availability}
          translationValue={chineseValue(data, "profile.availability")}
          updateSite={updateSite}
        />
        <Field label={t.heroImageUrl}>
          <TextInput
            value={profile.heroImageUrl}
            onChange={(heroImageUrl) => update({ heroImageUrl })}
          />
        </Field>
      </div>
      <BilingualField
        area
        label={t.tagline}
        language={language}
        path="profile.tagline"
        sourceValue={profile.tagline}
        translationValue={chineseValue(data, "profile.tagline")}
        updateSite={updateSite}
      />
      <BilingualField
        area
        label={t.biography}
        language={language}
        path="profile.biography"
        sourceValue={profile.biography}
        translationValue={chineseValue(data, "profile.biography")}
        updateSite={updateSite}
      />
    </EditorBlock>
  );
}

export function SectionsEditor({
  data,
  updateSite,
  language,
}: {
  data: SiteData;
  updateSite: UpdateSite;
  language: Language;
}) {
  const t = editorCopy[language];
  const sections = data.sections;
  const ordered = [...sections].sort((a, b) => a.order - b.order);
  const commitOrder = (next: SectionSetting[]) =>
    updateSite((data) => ({
      ...data,
      sections: next.map((section, index) => ({ ...section, order: index + 1 })),
    }));

  return (
    <EditorBlock title={t.sections}>
      <div className="admin-list">
        {ordered.map((section, index) => (
          <div className="admin-row" key={section.id}>
            <BilingualField
              label={t.title}
              language={language}
              path={`sections.${section.id}.title`}
              sourceValue={section.title}
              translationValue={chineseValue(data, `sections.${section.id}.title`)}
              updateSite={updateSite}
            />
            <div className="row-actions">
              <Toggle
                checked={section.visible}
                label={t.visible}
                onChange={(visible) =>
                  updateSite((data) => ({
                    ...data,
                    sections: data.sections.map((item) =>
                      item.id === section.id ? { ...item, visible } : item,
                    ),
                  }))
                }
              />
              <Button onClick={() => commitOrder(moveItem(ordered, index, -1))}>{t.up}</Button>
              <Button onClick={() => commitOrder(moveItem(ordered, index, 1))}>{t.down}</Button>
            </div>
          </div>
        ))}
      </div>
    </EditorBlock>
  );
}

export function TranslationEditor({ data, language }: { data: SiteData; language: Language }) {
  const t = editorCopy[language];
  const coverage = getChineseTranslationCoverage(data);

  return (
    <div className="stack">
      <EditorBlock title={t.translationCheck}>
        <p className="translation-complete">{t.translationCheckBody}</p>
        <div className="translation-summary">
          <div>
            <strong>{coverage.completed}</strong>
            <span>已填写</span>
          </div>
          <div>
            <strong>{coverage.total}</strong>
            <span>总字段</span>
          </div>
          <div>
            <strong>{coverage.missing.length}</strong>
            <span>缺失项</span>
          </div>
        </div>
        {coverage.missing.length ? (
          <div className="missing-translations">
            <span>缺失路径</span>
            <p>{coverage.missing.join(", ")}</p>
          </div>
        ) : (
          <p className="translation-complete">当前中文内容已覆盖所有可编辑字段。</p>
        )}
      </EditorBlock>
    </div>
  );
}

function BilingualField({
  label,
  language,
  path,
  sourceValue,
  translationValue,
  updateSite,
  area = false,
}: {
  label: string;
  language: Language;
  path: string;
  sourceValue: string;
  translationValue: string;
  updateSite: UpdateSite;
  area?: boolean;
}) {
  const t = editorCopy[language];
  const updateEnglish = (next: string) =>
    updateSite((current) => updateEnglishValue(current, path, next));
  const updateChinese = (next: string) =>
    updateSite((current) => updateChineseValue(current, path, next));

  return (
    <div className="translation-field">
      <span>{label}</span>
      <div className="translation-pair">
        <Field label={t.englishContent}>
          {area ? (
            <TextArea value={sourceValue} onChange={updateEnglish} />
          ) : (
            <TextInput value={sourceValue} onChange={updateEnglish} />
          )}
        </Field>
        <Field label={t.chineseContent}>
          {area ? (
            <TextArea value={translationValue} onChange={updateChinese} />
          ) : (
            <TextInput value={translationValue} onChange={updateChinese} />
          )}
        </Field>
      </div>
    </div>
  );
}

export function ProjectsEditor({
  data,
  updateSite,
  language,
}: {
  data: SiteData;
  updateSite: UpdateSite;
  language: Language;
}) {
  const t = editorCopy[language];
  const projects = data.projects;
  const updateProject = (id: string, patch: Partial<ProjectItem>) =>
    updateSite((data) => ({
      ...data,
      projects: data.projects.map((project) =>
        project.id === id ? { ...project, ...patch } : project,
      ),
    }));

  return (
    <EditorBlock
      title={t.projects}
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
          <Plus size={15} /> {t.add}
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
                  {t.up}
                </Button>
                <Button
                  onClick={() =>
                    updateSite((data) => ({ ...data, projects: moveItem(data.projects, index, 1) }))
                  }
                >
                  {t.down}
                </Button>
                <Button
                  variant="danger"
                  ariaLabel={`${t.delete} ${project.title}`}
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
              <BilingualField
                label={t.title}
                language={language}
                path={`projects.${project.id}.title`}
                sourceValue={project.title}
                translationValue={chineseValue(data, `projects.${project.id}.title`)}
                updateSite={updateSite}
              />
              <BilingualField
                label={t.category}
                language={language}
                path={`projects.${project.id}.category`}
                sourceValue={project.category}
                translationValue={chineseValue(data, `projects.${project.id}.category`)}
                updateSite={updateSite}
              />
              <BilingualField
                label={t.status}
                language={language}
                path={`projects.${project.id}.status`}
                sourceValue={project.status}
                translationValue={chineseValue(data, `projects.${project.id}.status`)}
                updateSite={updateSite}
              />
              <Field label={t.year}>
                <TextInput value={project.year} onChange={(year) => updateProject(project.id, { year })} />
              </Field>
              <Field label={t.link}>
                <TextInput value={project.link} onChange={(link) => updateProject(project.id, { link })} />
              </Field>
            </div>
            <BilingualField
              area
              label={t.description}
              language={language}
              path={`projects.${project.id}.description`}
              sourceValue={project.description}
              translationValue={chineseValue(data, `projects.${project.id}.description`)}
              updateSite={updateSite}
            />
            <div className="toggle-row">
              <Toggle
                checked={project.visible}
                label={t.visible}
                onChange={(visible) => updateProject(project.id, { visible })}
              />
              <Toggle
                checked={project.featured}
                label={t.featured}
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
  data,
  updateSite,
  language,
}: {
  data: SiteData;
  updateSite: UpdateSite;
  language: Language;
}) {
  const t = editorCopy[language];
  const experience = data.experience;
  const updateExperience = (id: string, patch: Partial<ExperienceItem>) =>
    updateSite((data) => ({
      ...data,
      experience: data.experience.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  return (
    <CollectionEditor
      title={t.experience}
      items={experience}
      addLabel={t.addRole}
      language={language}
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
            <BilingualField
              label={t.role}
              language={language}
              path={`experience.${item.id}.role`}
              sourceValue={item.role}
              translationValue={chineseValue(data, `experience.${item.id}.role`)}
              updateSite={updateSite}
            />
            <BilingualField
              label={t.organization}
              language={language}
              path={`experience.${item.id}.organization`}
              sourceValue={item.organization}
              translationValue={chineseValue(data, `experience.${item.id}.organization`)}
              updateSite={updateSite}
            />
            <Field label={t.period}>
              <TextInput value={item.period} onChange={(period) => updateExperience(item.id, { period })} />
            </Field>
          </div>
          <BilingualField
            area
            label={t.description}
            language={language}
            path={`experience.${item.id}.description`}
            sourceValue={item.description}
            translationValue={chineseValue(data, `experience.${item.id}.description`)}
            updateSite={updateSite}
          />
          <BilingualField
            label={t.highlights}
            language={language}
            path={`experience.${item.id}.highlights`}
            sourceValue={item.highlights.join(", ")}
            translationValue={chineseValue(data, `experience.${item.id}.highlights`)}
            updateSite={updateSite}
          />
          <Toggle
            checked={item.visible}
            label={t.visible}
            onChange={(visible) => updateExperience(item.id, { visible })}
          />
        </>
      )}
    />
  );
}

export function WritingEditor({
  data,
  updateSite,
  language,
}: {
  data: SiteData;
  updateSite: UpdateSite;
  language: Language;
}) {
  const t = editorCopy[language];
  const writing = data.writing;
  const updateWriting = (id: string, patch: Partial<WritingItem>) =>
    updateSite((data) => ({
      ...data,
      writing: data.writing.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  return (
    <CollectionEditor
      title={t.writing}
      items={writing}
      addLabel={t.addNote}
      language={language}
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
            <BilingualField
              label={t.title}
              language={language}
              path={`writing.${item.id}.title`}
              sourceValue={item.title}
              translationValue={chineseValue(data, `writing.${item.id}.title`)}
              updateSite={updateSite}
            />
            <BilingualField
              label={t.tag}
              language={language}
              path={`writing.${item.id}.tag`}
              sourceValue={item.tag}
              translationValue={chineseValue(data, `writing.${item.id}.tag`)}
              updateSite={updateSite}
            />
            <Field label={t.date}>
              <TextInput value={item.date} onChange={(date) => updateWriting(item.id, { date })} />
            </Field>
            <Field label={t.url}>
              <TextInput value={item.url} onChange={(url) => updateWriting(item.id, { url })} />
            </Field>
          </div>
          <BilingualField
            area
            label={t.summary}
            language={language}
            path={`writing.${item.id}.summary`}
            sourceValue={item.summary}
            translationValue={chineseValue(data, `writing.${item.id}.summary`)}
            updateSite={updateSite}
          />
          <Toggle
            checked={item.published}
            label={t.published}
            onChange={(published) => updateWriting(item.id, { published })}
          />
        </>
      )}
    />
  );
}

export function MediaEditor({
  data,
  updateSite,
  language,
}: {
  data: SiteData;
  updateSite: UpdateSite;
  language: Language;
}) {
  const t = editorCopy[language];
  const media = data.media;
  const updateMedia = (id: string, patch: Partial<MediaItem>) =>
    updateSite((data) => ({
      ...data,
      media: data.media.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  return (
    <CollectionEditor
      title={t.media}
      items={media}
      addLabel={t.addMedia}
      language={language}
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
            <BilingualField
              label={t.title}
              language={language}
              path={`media.${item.id}.title`}
              sourceValue={item.title}
              translationValue={chineseValue(data, `media.${item.id}.title`)}
              updateSite={updateSite}
            />
            <Field label={t.type}>
              <Select
                value={item.type}
                options={[
                  { label: t.options.image, value: "image" },
                  { label: t.options.talk, value: "talk" },
                  { label: t.options.press, value: "press" },
                  { label: t.options.case, value: "case" },
                ]}
                onChange={(type) => updateMedia(item.id, { type: type as MediaItem["type"] })}
              />
            </Field>
            <Field label={t.url}>
              <TextInput value={item.url} onChange={(url) => updateMedia(item.id, { url })} />
            </Field>
          </div>
          <BilingualField
            area
            label={t.caption}
            language={language}
            path={`media.${item.id}.caption`}
            sourceValue={item.caption}
            translationValue={chineseValue(data, `media.${item.id}.caption`)}
            updateSite={updateSite}
          />
          <Toggle
            checked={item.visible}
            label={t.visible}
            onChange={(visible) => updateMedia(item.id, { visible })}
          />
        </>
      )}
    />
  );
}

export function ServicesEditor({
  data,
  updateSite,
  language,
}: {
  data: SiteData;
  updateSite: UpdateSite;
  language: Language;
}) {
  const t = editorCopy[language];
  const services = data.services;
  const updateService = (id: string, patch: Partial<ServiceItem>) =>
    updateSite((data) => ({
      ...data,
      services: data.services.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  return (
    <CollectionEditor
      title={t.services}
      items={services}
      addLabel={t.addService}
      language={language}
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
          <BilingualField
            label={t.title}
            language={language}
            path={`services.${item.id}.title`}
            sourceValue={item.title}
            translationValue={chineseValue(data, `services.${item.id}.title`)}
            updateSite={updateSite}
          />
          <BilingualField
            area
            label={t.description}
            language={language}
            path={`services.${item.id}.description`}
            sourceValue={item.description}
            translationValue={chineseValue(data, `services.${item.id}.description`)}
            updateSite={updateSite}
          />
          <Toggle
            checked={item.visible}
            label={t.visible}
            onChange={(visible) => updateService(item.id, { visible })}
          />
        </>
      )}
    />
  );
}

export function LinksEditor({
  data,
  updateSite,
  language,
}: {
  data: SiteData;
  updateSite: UpdateSite;
  language: Language;
}) {
  const t = editorCopy[language];
  const links = data.links;
  const updateLink = (id: string, patch: Partial<LinkItem>) =>
    updateSite((data) => ({
      ...data,
      links: data.links.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  return (
    <CollectionEditor
      title={t.links}
      items={links}
      addLabel={t.addLink}
      language={language}
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
            <BilingualField
              label={t.label}
              language={language}
              path={`links.${item.id}.label`}
              sourceValue={item.label}
              translationValue={chineseValue(data, `links.${item.id}.label`)}
              updateSite={updateSite}
            />
            <Field label={t.url}>
              <TextInput value={item.url} onChange={(url) => updateLink(item.id, { url })} />
            </Field>
          </div>
          <Toggle
            checked={item.visible}
            label={t.visible}
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
  const t = editorCopy[language];
  const update = (patch: Partial<AppearanceData>) =>
    updateSite((data) => ({ ...data, appearance: { ...data.appearance, ...patch } }));

  return (
    <EditorBlock title={t.appearance}>
      <div className="form-grid">
        <Field label={t.defaultLanguage}>
          <Select
            value={appearance.language}
            options={[
              { label: "中文", value: "zh" },
              { label: t.options.english, value: "en" },
            ]}
            onChange={(nextLanguage) => update({ language: nextLanguage as Language })}
          />
        </Field>
        <Field label={t.theme}>
          <Select
            value={appearance.theme}
            options={[
              { label: t.options.noir, value: "noir" },
              { label: t.options.paper, value: "paper" },
              { label: t.options.system, value: "system" },
            ]}
            onChange={(theme) => update({ theme: theme as AppearanceData["theme"] })}
          />
        </Field>
        <Field label={t.accent}>
          <TextInput value={appearance.accent} onChange={(accent) => update({ accent })} />
        </Field>
        <Field label={t.density}>
          <Select
            value={appearance.density}
            options={[
              { label: t.options.calm, value: "calm" },
              { label: t.options.compact, value: "compact" },
            ]}
            onChange={(density) => update({ density: density as AppearanceData["density"] })}
          />
        </Field>
        <Field label={t.motion}>
          <Select
            value={appearance.motion}
            options={[
              { label: t.options.full, value: "full" },
              { label: t.options.reduced, value: "reduced" },
            ]}
            onChange={(motion) => update({ motion: motion as AppearanceData["motion"] })}
          />
        </Field>
      </div>
    </EditorBlock>
  );
}

export function SeoEditor({
  data,
  updateSite,
  language,
}: {
  data: SiteData;
  updateSite: UpdateSite;
  language: Language;
}) {
  const t = editorCopy[language];
  const seo = data.seo;
  const update = (patch: Partial<SeoData>) =>
    updateSite((data) => ({ ...data, seo: { ...data.seo, ...patch } }));

  return (
    <EditorBlock title={t.seo}>
      <BilingualField
        label={t.pageTitle}
        language={language}
        path="seo.title"
        sourceValue={seo.title}
        translationValue={chineseValue(data, "seo.title")}
        updateSite={updateSite}
      />
      <BilingualField
        area
        label={t.description}
        language={language}
        path="seo.description"
        sourceValue={seo.description}
        translationValue={chineseValue(data, "seo.description")}
        updateSite={updateSite}
      />
      <div className="form-grid">
        <BilingualField
          label={t.keywords}
          language={language}
          path="seo.keywords"
          sourceValue={seo.keywords}
          translationValue={chineseValue(data, "seo.keywords")}
          updateSite={updateSite}
        />
        <Field label={t.openGraphImage}>
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
  language,
}: {
  data: SiteData;
  onImport: (data: SiteData) => void;
  onReset: () => void;
  language: Language;
}) {
  const t = editorCopy[language];
  const [importError, setImportError] = useState("");

  const handleFile = (file: File | null) => {
    if (!file) return;
    setImportError("");
    const reader = new FileReader();
    reader.onload = () => {
      try {
        onImport(parseSiteJson(String(reader.result)));
        setImportError("");
      } catch (error) {
        const message = error instanceof Error ? error.message : t.importFailed;
        setImportError(formatImportError(message, language));
      }
    };
    reader.readAsText(file);
  };

  return (
    <EditorBlock title={t.data}>
      <div className="data-actions">
        <Button variant="primary" onClick={() => downloadText("site-data.json", exportSiteData(data))}>
          <Download size={15} /> {t.exportJson}
        </Button>
        <label className="button button-ghost">
          <Upload size={15} /> {t.importJson}
          <input
            className="file-input"
            type="file"
            accept="application/json"
            onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          />
        </label>
        <Button variant="danger" onClick={onReset}>
          <RotateCcw size={15} /> {t.reset}
        </Button>
      </div>
      {importError ? (
        <p className="import-error" role="alert">
          {importError}
        </p>
      ) : null}
      <pre className="json-preview">{exportSiteData(data).slice(0, 1600)}</pre>
    </EditorBlock>
  );
}

function CollectionEditor<T extends { id: string; title?: string; role?: string }>({
  title,
  items,
  addLabel,
  language,
  addItem,
  moveItemAt,
  deleteItem,
  renderItem,
}: {
  title: string;
  items: T[];
  addLabel: string;
  language: Language;
  addItem: () => void;
  moveItemAt: (index: number, direction: -1 | 1) => void;
  deleteItem: (id: string) => void;
  renderItem: (item: T) => JSX.Element;
}) {
  const t = editorCopy[language];

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
                <Button onClick={() => moveItemAt(index, -1)}>{t.up}</Button>
                <Button onClick={() => moveItemAt(index, 1)}>{t.down}</Button>
                <Button
                  variant="danger"
                  ariaLabel={`${t.delete} ${item.title ?? item.role ?? item.id}`}
                  onClick={() => deleteItem(item.id)}
                >
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
