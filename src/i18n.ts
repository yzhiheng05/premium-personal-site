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
    seo: "SEO",
    data: "数据",
  },
} as const;

const zhSite = {
  profile: {
    name: "林以澈",
    role: "独立系统设计师",
    tagline: "为创始人、研究团队与高信任服务设计安静、耐用、可管理的数字系统。",
    biography:
      "以澈的工作介于产品策略、界面系统与运营工具之间。实践重点是让复杂工作变得清晰、克制，并能被长期稳定地掌控。",
    location: "纽约 / 远程",
    availability: "选择性接受顾问与产品系统项目",
  },
  sections: {
    hero: "首页",
    about: "关于",
    projects: "精选项目",
    experience: "经历",
    writing: "文章",
    media: "媒体",
    services: "服务",
    contact: "联系",
  },
  links: {
    "l-email": "邮件",
    "l-linkedin": "LinkedIn",
    "l-archive": "档案",
  },
  projects: {
    "p-atelier-os": {
      title: "Atelier OS",
      category: "产品系统",
      description: "为精品策略工作室打造的私有运营层，连接客户记忆、交付节奏与高层汇报。",
      status: "已上线",
    },
    "p-civic-signal": {
      title: "Civic Signal Room",
      category: "研究界面",
      description: "为政策研究者设计的指挥界面，用于追踪弱信号、来源可信度与决策备忘录。",
      status: "试点",
    },
    "p-meridian": {
      title: "Meridian Briefing",
      category: "高层工具",
      description: "将碎片化运营数据整理为单一、具编辑品质的每日决策视图。",
      status: "私有",
    },
  },
  experience: {
    "e-independent": {
      organization: "林以澈工作室",
      role: "主理人",
      description: "面向复杂产品系统、高层工作流与编辑型软件的独立实践。",
      highlights: ["创始人顾问", "设计系统", "运营界面"],
    },
    "e-northline": {
      organization: "Northline Labs",
      role: "产品设计负责人",
      description: "负责 AI 辅助研究产品的界面策略，服务分析师与运营团队。",
      highlights: ["扩建设计团队", "发布研究控制台", "减少流程漂移"],
    },
    "e-studio": {
      organization: "独立客户",
      role: "系统顾问",
      description: "为高信任团队设计决策工具、内部平台与服务蓝图。",
      highlights: ["私有工具", "服务系统", "创始人策略"],
    },
  },
  writing: {
    "w-calm-tools": {
      title: "高风险工作的安静工具",
      summary: "为什么最好的运营软件更像一间私密房间，而不是一座控制塔。",
      tag: "界面",
    },
    "w-memory": {
      title: "设计组织记忆",
      summary: "一个把重复决策转化为长期组织知识的实践模型。",
      tag: "系统",
    },
  },
  media: {
    "m-hero": {
      title: "工作室系统研究",
      caption: "为个人作品集环境生成的视觉语言研究。",
    },
    "m-talk": {
      title: "为高层注意力而设计",
      caption: "关于专注、工作流形态与信任的私享沙龙分享。",
    },
    "m-press": {
      title: "界面笔记",
      caption: "关于安静工具与决策节奏的一次短访谈。",
    },
  },
  services: {
    "s-product": {
      title: "产品系统",
      description: "为复杂服务塑造产品界面、工作流与组件语言。",
    },
    "s-advisory": {
      title: "创始人顾问",
      description: "将模糊的产品方向转化为清晰的运营选择与执行节奏。",
    },
    "s-interface": {
      title: "高层界面",
      description: "为简报、决策、仪式与组织记忆创建高信号工具。",
    },
  },
  seo: {
    title: "林以澈 | 独立系统设计师",
    description: "面向系统设计、产品策略与高信任数字工具的高级个人作品集。",
    keywords: "系统设计, 产品策略, 作品集, 界面设计",
  },
};

function keepEdits(current: string, original: string, translated: string): string {
  return current === original ? translated : current;
}

export function normalizeLanguage(language: Language | undefined): Language {
  return language === "en" ? "en" : "zh";
}

export function localizeSiteData(data: SiteData, language: Language): SiteData {
  if (language === "en") return data;

  return {
    ...data,
    profile: {
      ...data.profile,
      name: keepEdits(data.profile.name, defaultSite.profile.name, zhSite.profile.name),
      role: keepEdits(data.profile.role, defaultSite.profile.role, zhSite.profile.role),
      tagline: keepEdits(data.profile.tagline, defaultSite.profile.tagline, zhSite.profile.tagline),
      biography: keepEdits(
        data.profile.biography,
        defaultSite.profile.biography,
        zhSite.profile.biography,
      ),
      location: keepEdits(data.profile.location, defaultSite.profile.location, zhSite.profile.location),
      availability: keepEdits(
        data.profile.availability,
        defaultSite.profile.availability,
        zhSite.profile.availability,
      ),
    },
    sections: data.sections.map((section) => {
      const original = defaultSite.sections.find((item) => item.id === section.id);
      return {
        ...section,
        title: original
          ? keepEdits(section.title, original.title, zhSite.sections[section.id])
          : section.title,
      };
    }),
    links: data.links.map((link) => {
      const original = defaultSite.links.find((item) => item.id === link.id);
      return {
        ...link,
        label:
          original && link.id in zhSite.links
            ? keepEdits(link.label, original.label, zhSite.links[link.id as keyof typeof zhSite.links])
            : link.label,
      };
    }),
    projects: data.projects.map((project) => {
      const original = defaultSite.projects.find((item) => item.id === project.id);
      const translated = zhSite.projects[project.id as keyof typeof zhSite.projects];
      return original && translated
        ? {
            ...project,
            title: keepEdits(project.title, original.title, translated.title),
            category: keepEdits(project.category, original.category, translated.category),
            description: keepEdits(project.description, original.description, translated.description),
            status: keepEdits(project.status, original.status, translated.status),
          }
        : project;
    }),
    experience: data.experience.map((item) => {
      const original = defaultSite.experience.find((entry) => entry.id === item.id);
      const translated = zhSite.experience[item.id as keyof typeof zhSite.experience];
      return original && translated
        ? {
            ...item,
            organization: keepEdits(item.organization, original.organization, translated.organization),
            role: keepEdits(item.role, original.role, translated.role),
            description: keepEdits(item.description, original.description, translated.description),
            highlights:
              item.highlights.join("|") === original.highlights.join("|")
                ? translated.highlights
                : item.highlights,
          }
        : item;
    }),
    writing: data.writing.map((item) => {
      const original = defaultSite.writing.find((entry) => entry.id === item.id);
      const translated = zhSite.writing[item.id as keyof typeof zhSite.writing];
      return original && translated
        ? {
            ...item,
            title: keepEdits(item.title, original.title, translated.title),
            summary: keepEdits(item.summary, original.summary, translated.summary),
            tag: keepEdits(item.tag, original.tag, translated.tag),
          }
        : item;
    }),
    media: data.media.map((item) => {
      const original = defaultSite.media.find((entry) => entry.id === item.id);
      const translated = zhSite.media[item.id as keyof typeof zhSite.media];
      return original && translated
        ? {
            ...item,
            title: keepEdits(item.title, original.title, translated.title),
            caption: keepEdits(item.caption, original.caption, translated.caption),
          }
        : item;
    }),
    services: data.services.map((service) => {
      const original = defaultSite.services.find((entry) => entry.id === service.id);
      const translated = zhSite.services[service.id as keyof typeof zhSite.services];
      return original && translated
        ? {
            ...service,
            title: keepEdits(service.title, original.title, translated.title),
            description: keepEdits(service.description, original.description, translated.description),
          }
        : service;
    }),
    seo: {
      ...data.seo,
      title: keepEdits(data.seo.title, defaultSite.seo.title, zhSite.seo.title),
      description: keepEdits(data.seo.description, defaultSite.seo.description, zhSite.seo.description),
      keywords: keepEdits(data.seo.keywords, defaultSite.seo.keywords, zhSite.seo.keywords),
    },
  };
}
