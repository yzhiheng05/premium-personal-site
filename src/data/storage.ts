import { defaultSite } from "./defaultSite";
import type { SiteData } from "../types";
import { normalizeLanguage } from "../i18n";

export const STORAGE_KEY = "premium-personal-site:v1";

export function cloneDefaultSite(): SiteData {
  return structuredClone(defaultSite);
}

function normalizeSiteData(data: SiteData): SiteData {
  return {
    ...data,
    appearance: {
      ...defaultSite.appearance,
      ...data.appearance,
      language: normalizeLanguage(data.appearance.language),
    },
    translations: {
      zh: {
        ...defaultSite.translations?.zh,
        ...data.translations?.zh,
      },
    },
  };
}

function hasObjectShape(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasRequiredArray(value: Record<string, unknown>, key: keyof SiteData): boolean {
  return Array.isArray(value[key]);
}

export function isSiteData(value: unknown): value is SiteData {
  if (!hasObjectShape(value)) return false;

  const objectKeys: Array<keyof SiteData> = ["profile", "appearance", "seo", "admin"];
  const arrayKeys: Array<keyof SiteData> = [
    "sections",
    "projects",
    "experience",
    "writing",
    "media",
    "services",
    "links",
  ];

  const hasObjects = objectKeys.every((key) => hasObjectShape(value[key]));
  const hasArrays = arrayKeys.every((key) => hasRequiredArray(value, key));

  if (!hasObjects || !hasArrays) return false;

  const profile = value.profile as Record<string, unknown>;
  const appearance = value.appearance as Record<string, unknown>;
  const admin = value.admin as Record<string, unknown>;

  return (
    typeof profile.name === "string" &&
    typeof profile.role === "string" &&
    typeof profile.email === "string" &&
    typeof appearance.theme === "string" &&
    typeof appearance.accent === "string" &&
    typeof admin.password === "string"
  );
}

export function parseSiteJson(text: string): SiteData {
  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Import failed: JSON is not valid.");
  }

  if (!isSiteData(parsed)) {
    throw new Error("Import failed: this file is not compatible site data.");
  }

  return normalizeSiteData({
    ...parsed,
    admin: {
      ...parsed.admin,
      lastSavedAt: new Date().toISOString(),
    },
  });
}

export function exportSiteData(data: SiteData): string {
  return JSON.stringify(data, null, 2);
}

export function loadSiteData(storage: Storage = window.localStorage): SiteData {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return cloneDefaultSite();

  try {
    return parseSiteJson(raw);
  } catch {
    return cloneDefaultSite();
  }
}

export function saveSiteData(data: SiteData, storage: Storage = window.localStorage): SiteData {
  const next = normalizeSiteData({
    ...data,
    admin: {
      ...data.admin,
      lastSavedAt: new Date().toISOString(),
    },
  });
  storage.setItem(STORAGE_KEY, exportSiteData(next));
  return next;
}

export function resetSiteData(storage: Storage = window.localStorage): SiteData {
  const next = cloneDefaultSite();
  storage.setItem(STORAGE_KEY, exportSiteData(next));
  return next;
}
