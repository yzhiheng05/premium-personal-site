import { defaultSite } from "./data/defaultSite";
import type { Language, SiteData } from "./types";

export const publicCopy = {
  en: {
    contact: "Contact",
    startConversation: "Start a conversation",
    availability: "Availability",
    practice: "Practice",
    aboutHeading: "Quiet systems for work that cannot afford noise.",
    metricOne: "years shaping complex tools",
    metricTwo: "private product systems",
    metricThree: "operating modes: advise, design, build",
    selectedWork: "Selected Work",
    projectsHeading: "Systems with a strong point of view.",
    experience: "Experience",
    experienceHeading: "From research surfaces to executive tooling.",
    writing: "Writing",
    writingHeading: "Notes on tools, attention, and institutional memory.",
    media: "Media",
    mediaHeading: "Visual notes from the studio archive.",
    services: "Services",
    servicesHeading: "Focused engagements for teams with complicated work.",
    contactHeading: "Bring the shape of the work. I will bring the operating clarity.",
    languageLabel: "中文",
  },
  zh: {
    contact: "联系",
    startConversation: "开始沟通",
    availability: "当前可合作",
    practice: "实践方向",
    aboutHeading: "为高风险工作设计安静、可靠的系统。",
    metricOne: "年复杂工具设计经验",
    metricTwo: "套私有产品系统",
    metricThree: "种协作模式：咨询、设计、构建",
    selectedWork: "精选项目",
    projectsHeading: "有明确判断力的系统设计。",
    experience: "经历",
    experienceHeading: "从研究界面到高层决策工具。",
    writing: "文章",
    writingHeading: "关于工具、注意力与组织记忆的笔记。",
    media: "媒体",
    mediaHeading: "来自工作室档案的视觉记录。",
    services: "服务",
    servicesHeading: "面向复杂团队的聚焦型合作。",
    contactHeading: "带来工作的轮廓，我负责让它变得清晰可执行。",
    languageLabel: "EN",
  },
} as const;

export const adminCopy = {
  en: {
    studio: "Studio Console",
    control: "Single-site control",
    preview: "Preview",
    logout: "Logout",
    editing: "Editing",
    closeAdmin: "Close admin",
    siteStatus: "Site status",
    draftSaved: "Draft changes save locally",
    security: "Security",
    passwordGate: "Password gate active",
    lastSave: "Last save",
    notSaved: "Not saved yet",
    loginTitle: "Studio access",
    loginBody: "Enter the site password to open the editing console.",
    password: "Password",
    loginButton: "Enter console",
    passwordError: "Password did not match.",
  },
  zh: {
    studio: "工作室控制台",
    control: "单站点管理",
    preview: "预览",
    logout: "退出",
    editing: "正在编辑",
    closeAdmin: "关闭后台",
    siteStatus: "站点状态",
    draftSaved: "草稿会保存在本地",
    security: "安全",
    passwordGate: "密码保护已启用",
    lastSave: "上次保存",
    notSaved: "尚未保存",
    loginTitle: "工作室入口",
    loginBody: "输入站点密码后打开编辑后台。",
    password: "密码",
    loginButton: "进入后台",
    passwordError: "密码不正确。",
  },
} as const;

export const adminTabs = {
  en: {
    dashboard: "Dashboard",
    profile: "Profile",
    sections: "Sections",
    projects: "Projects",
    experience: "Experience",
    writing: "Writing",
    media: "Media",
    services: "Services",
    links: "Links",
    appearance: "Appearance",
    translations: "Translations",
    seo: "SEO",
    data: "Data",
  },
  zh: {
    dashboard: "概览",
    profile: "个人资料",
    sections: "页面模块",
    projects: "项目",
    experience: "经历",
    writing: "文章",
    media: "媒体",
    services: "服务",
    links: "链接",
    appearance: "外观",
    translations: "中文内容",
    seo: "SEO",
    data: "数据",
  },
} as const;

export function normalizeLanguage(language: Language | undefined): Language {
  return language === "en" ? "en" : "zh";
}

function translationFor(
  data: SiteData,
  path: string,
  current: string,
  defaultEnglish?: string,
): string {
  const translated = data.translations?.zh[path];
  if (!translated) return current;

  const defaultTranslated = defaultSite.translations?.zh[path];
  if (defaultTranslated && translated === defaultTranslated && defaultEnglish && current !== defaultEnglish) {
    return current;
  }

  return translated;
}

function csvToList(value: string): string[] {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function localizeSiteData(data: SiteData, language: Language): SiteData {
  if (language === "en") return data;

  return {
    ...data,
    profile: {
      ...data.profile,
      name: translationFor(data, "profile.name", data.profile.name, defaultSite.profile.name),
      role: translationFor(data, "profile.role", data.profile.role, defaultSite.profile.role),
      tagline: translationFor(data, "profile.tagline", data.profile.tagline, defaultSite.profile.tagline),
      biography: translationFor(
        data,
        "profile.biography",
        data.profile.biography,
        defaultSite.profile.biography,
      ),
      location: translationFor(data, "profile.location", data.profile.location, defaultSite.profile.location),
      availability: translationFor(
        data,
        "profile.availability",
        data.profile.availability,
        defaultSite.profile.availability,
      ),
    },
    sections: data.sections.map((section) => {
      const original = defaultSite.sections.find((item) => item.id === section.id);
      return {
        ...section,
        title: translationFor(data, `sections.${section.id}.title`, section.title, original?.title),
      };
    }),
    links: data.links.map((link) => {
      const original = defaultSite.links.find((item) => item.id === link.id);
      return {
        ...link,
        label: translationFor(data, `links.${link.id}.label`, link.label, original?.label),
      };
    }),
    projects: data.projects.map((project) => {
      const original = defaultSite.projects.find((item) => item.id === project.id);
      return {
        ...project,
        title: translationFor(data, `projects.${project.id}.title`, project.title, original?.title),
        category: translationFor(data, `projects.${project.id}.category`, project.category, original?.category),
        description: translationFor(
          data,
          `projects.${project.id}.description`,
          project.description,
          original?.description,
        ),
        status: translationFor(data, `projects.${project.id}.status`, project.status, original?.status),
      };
    }),
    experience: data.experience.map((item) => {
      const original = defaultSite.experience.find((entry) => entry.id === item.id);
      const highlights = translationFor(
        data,
        `experience.${item.id}.highlights`,
        item.highlights.join(", "),
        original?.highlights.join(", "),
      );
      return {
        ...item,
        organization: translationFor(
          data,
          `experience.${item.id}.organization`,
          item.organization,
          original?.organization,
        ),
        role: translationFor(data, `experience.${item.id}.role`, item.role, original?.role),
        description: translationFor(
          data,
          `experience.${item.id}.description`,
          item.description,
          original?.description,
        ),
        highlights: csvToList(highlights),
      };
    }),
    writing: data.writing.map((item) => {
      const original = defaultSite.writing.find((entry) => entry.id === item.id);
      return {
        ...item,
        title: translationFor(data, `writing.${item.id}.title`, item.title, original?.title),
        summary: translationFor(data, `writing.${item.id}.summary`, item.summary, original?.summary),
        tag: translationFor(data, `writing.${item.id}.tag`, item.tag, original?.tag),
      };
    }),
    media: data.media.map((item) => {
      const original = defaultSite.media.find((entry) => entry.id === item.id);
      return {
        ...item,
        title: translationFor(data, `media.${item.id}.title`, item.title, original?.title),
        caption: translationFor(data, `media.${item.id}.caption`, item.caption, original?.caption),
      };
    }),
    services: data.services.map((service) => {
      const original = defaultSite.services.find((entry) => entry.id === service.id);
      return {
        ...service,
        title: translationFor(data, `services.${service.id}.title`, service.title, original?.title),
        description: translationFor(
          data,
          `services.${service.id}.description`,
          service.description,
          original?.description,
        ),
      };
    }),
    seo: {
      ...data.seo,
      title: translationFor(data, "seo.title", data.seo.title, defaultSite.seo.title),
      description: translationFor(data, "seo.description", data.seo.description, defaultSite.seo.description),
      keywords: translationFor(data, "seo.keywords", data.seo.keywords, defaultSite.seo.keywords),
    },
  };
}
