import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LockKeyhole, X } from "lucide-react";
import { AdminPanel } from "./components/admin/AdminPanel";
import { PublicSite } from "./components/public/PublicSite";
import { Button, Field, TextInput } from "./components/ui";
import { cloneDefaultSite, loadSiteData, saveSiteData } from "./data/storage";
import { adminCopy, localizeSiteData, normalizeLanguage } from "./i18n";
import type { Language, SiteData } from "./types";

type AdminTab =
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

export function App() {
  const [siteData, setSiteData] = useState<SiteData>(() => loadSiteData());
  const [loginOpen, setLoginOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const hiddenClickCount = useRef(0);
  const keyBuffer = useRef("");
  const language = normalizeLanguage(siteData.appearance.language);
  const displayData = useMemo(() => localizeSiteData(siteData, language), [siteData, language]);
  const adminText = adminCopy[language];

  useEffect(() => {
    document.title = displayData.seo.title;
    updateMeta("description", displayData.seo.description);
    updateMeta("keywords", displayData.seo.keywords);
  }, [displayData.seo]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT";
      if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;

      keyBuffer.current = `${keyBuffer.current}${event.key.toLowerCase()}`.slice(-5);
      if (keyBuffer.current === "admin") {
        setLoginOpen(true);
        keyBuffer.current = "";
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const accentStyle = useMemo(
    () =>
      ({
        "--accent": siteData.appearance.accent,
      }) as React.CSSProperties,
    [siteData.appearance.accent],
  );

  const updateSite = useCallback((updater: (data: SiteData) => SiteData) => {
    setSiteData((current) => saveSiteData(updater(current)));
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setSiteData((current) =>
      saveSiteData({
        ...current,
        appearance: {
          ...current.appearance,
          language: nextLanguage,
        },
      }),
    );
  }, []);

  const openHiddenLogin = () => {
    hiddenClickCount.current += 1;
    window.setTimeout(() => {
      hiddenClickCount.current = 0;
    }, 1100);

    if (hiddenClickCount.current >= 5) {
      hiddenClickCount.current = 0;
      setLoginOpen(true);
    }
  };

  const submitLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === siteData.admin.password) {
      setLoginError("");
      setPassword("");
      setLoginOpen(false);
      setAdminOpen(true);
      return;
    }

    setLoginError(adminText.passwordError);
  };

  const closeAdmin = () => {
    setAdminOpen(false);
  };

  const logout = () => {
    setAdminOpen(false);
    setLoginOpen(false);
    setPassword("");
  };

  return (
    <div
      className={`app theme-${siteData.appearance.theme} density-${siteData.appearance.density} motion-${siteData.appearance.motion}`}
      style={accentStyle}
    >
      <PublicSite
        data={displayData}
        language={language}
        onLanguageChange={setLanguage}
        onHiddenAdminSignal={openHiddenLogin}
      />

      {loginOpen ? (
        <div className="modal-layer" role="dialog" aria-modal="true" aria-label={adminText.loginTitle}>
          <form className="login-panel" onSubmit={submitLogin}>
            <button
              className="icon-button login-close"
              type="button"
              onClick={() => setLoginOpen(false)}
              aria-label={adminText.closeAdmin}
            >
              <X size={18} />
            </button>
            <LockKeyhole size={22} />
            <h2>{adminText.loginTitle}</h2>
            <p>{adminText.loginBody}</p>
            <Field label={adminText.password}>
              <TextInput value={password} type="password" onChange={setPassword} />
            </Field>
            {loginError ? <p className="login-error">{loginError}</p> : null}
            <Button variant="primary" type="submit">
              {adminText.loginButton}
            </Button>
          </form>
        </div>
      ) : null}

      {adminOpen ? (
        <AdminPanel
          data={siteData}
          language={language}
          tab={activeTab}
          onTabChange={setActiveTab}
          updateSite={updateSite}
          onImport={(data) => setSiteData(saveSiteData(data))}
          onReset={() => setSiteData(saveSiteData(cloneDefaultSite()))}
          onClose={closeAdmin}
          onLogout={logout}
        />
      ) : null}
    </div>
  );
}

function updateMeta(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}
