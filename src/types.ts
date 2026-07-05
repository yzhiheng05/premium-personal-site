export type SectionKey =
  | "hero"
  | "about"
  | "projects"
  | "experience"
  | "writing"
  | "media"
  | "services"
  | "contact";

export type ThemeMode = "noir" | "paper" | "system";
export type Density = "calm" | "compact";
export type MotionLevel = "full" | "reduced";
export type Language = "zh" | "en";

export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  biography: string;
  location: string;
  availability: string;
  email: string;
  portraitUrl: string;
  heroImageUrl: string;
}

export interface SectionSetting {
  id: SectionKey;
  title: string;
  visible: boolean;
  order: number;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
  visible: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  status: string;
  year: string;
  link: string;
  featured: boolean;
  visible: boolean;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  visible: boolean;
}

export interface WritingItem {
  id: string;
  title: string;
  summary: string;
  tag: string;
  date: string;
  url: string;
  published: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  type: "image" | "talk" | "press" | "case";
  url: string;
  caption: string;
  visible: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  visible: boolean;
}

export interface AppearanceData {
  theme: ThemeMode;
  accent: string;
  density: Density;
  motion: MotionLevel;
  language: Language;
}

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface AdminData {
  password: string;
  lastSavedAt: string;
}

export interface TranslationData {
  zh: Record<string, string>;
}

export interface SiteData {
  profile: ProfileData;
  sections: SectionSetting[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  writing: WritingItem[];
  media: MediaItem[];
  services: ServiceItem[];
  links: LinkItem[];
  appearance: AppearanceData;
  seo: SeoData;
  admin: AdminData;
  translations?: TranslationData;
}
