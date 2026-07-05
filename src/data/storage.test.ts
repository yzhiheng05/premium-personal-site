import { describe, expect, it, beforeEach } from "vitest";
import { getChineseTranslationCoverage, localizeSiteData } from "../i18n";
import { defaultSite } from "./defaultSite";
import {
  STORAGE_KEY,
  cloneDefaultSite,
  exportSiteData,
  isSiteData,
  loadSiteData,
  parseSiteJson,
  resetSiteData,
  saveSiteData,
} from "./storage";

describe("site storage", () => {
  let storage: Storage;

  beforeEach(() => {
    storage = createMemoryStorage();
  });

  it("loads defaults when local storage is empty", () => {
    const data = loadSiteData(storage);
    expect(data.profile.name).toBe(defaultSite.profile.name);
    expect(data.appearance.language).toBe("zh");
    expect(data.projects.length).toBeGreaterThan(0);
  });

  it("saves and loads compatible data", () => {
    const data = cloneDefaultSite();
    data.profile.name = "Morgan Vale";

    saveSiteData(data, storage);

    const loaded = loadSiteData(storage);
    expect(loaded.profile.name).toBe("Morgan Vale");
    expect(loaded.admin.lastSavedAt).toBeTruthy();
  });

  it("parses valid exported JSON", () => {
    const data = cloneDefaultSite();
    const parsed = parseSiteJson(exportSiteData(data));

    expect(isSiteData(parsed)).toBe(true);
    expect(parsed.profile.role).toBe(defaultSite.profile.role);
  });

  it("normalizes older site data without a language setting", () => {
    const legacyData = cloneDefaultSite() as unknown as { appearance: Record<string, unknown> };
    delete legacyData.appearance.language;

    const parsed = parseSiteJson(JSON.stringify(legacyData));

    expect(parsed.appearance.language).toBe("zh");
    expect(parsed.translations?.zh["profile.name"]).toBe("林以澈");
  });

  it("keeps legacy custom text when no matching Chinese translation was written", () => {
    const legacyData = cloneDefaultSite() as unknown as {
      profile: { name: string };
      appearance: Record<string, unknown>;
      translations?: unknown;
    };
    legacyData.profile.name = "Custom Person";
    delete legacyData.appearance.language;
    delete legacyData.translations;

    const parsed = parseSiteJson(JSON.stringify(legacyData));
    const localized = localizeSiteData(parsed, "zh");

    expect(localized.profile.name).toBe("Custom Person");
  });

  it("reports Chinese translation coverage for editable content", () => {
    const data = cloneDefaultSite();

    const coverage = getChineseTranslationCoverage(data);

    expect(coverage.total).toBeGreaterThan(0);
    expect(coverage.completed).toBe(coverage.total);
    expect(coverage.missing).toEqual([]);
  });

  it("reports missing Chinese translations for newly added content", () => {
    const data = cloneDefaultSite();
    data.projects.push({
      id: "p-new",
      title: "New Project",
      category: "Advisory",
      description: "A new body of work.",
      status: "Draft",
      year: "2026",
      link: "https://example.com/new",
      featured: false,
      visible: true,
    });

    const coverage = getChineseTranslationCoverage(data);

    expect(coverage.missing).toEqual([
      "projects.p-new.title",
      "projects.p-new.category",
      "projects.p-new.description",
      "projects.p-new.status",
    ]);
    expect(coverage.completed).toBe(coverage.total - 4);
  });

  it("rejects invalid import JSON", () => {
    expect(() => parseSiteJson("{bad")).toThrow("JSON is not valid");
    expect(() => parseSiteJson(JSON.stringify({ profile: {} }))).toThrow(
      "not compatible",
    );
  });

  it("resets persisted edits to defaults", () => {
    const edited = cloneDefaultSite();
    edited.profile.name = "Edited Name";
    saveSiteData(edited, storage);

    resetSiteData(storage);

    const raw = storage.getItem(STORAGE_KEY);
    expect(raw).toBeTruthy();
    expect(loadSiteData(storage).profile.name).toBe(defaultSite.profile.name);
  });
});

function createMemoryStorage(): Storage {
  let store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear() {
      store = new Map<string, string>();
    },
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    key(index: number) {
      return [...store.keys()][index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
  };
}
