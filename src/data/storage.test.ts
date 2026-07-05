import { describe, expect, it, beforeEach } from "vitest";
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
