# Premium Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium personal brand website with an unobtrusive password-protected admin area for editing a single site's content and settings.

**Architecture:** Create a React single-page app with Vite. Public sections and admin editors share one typed site data object persisted to `localStorage`, with JSON import/export/reset utilities.

**Tech Stack:** Vite, React, TypeScript, CSS, lucide-react, Vitest, Testing Library, Playwright-based manual verification.

---

## File Structure

- `package.json`: scripts and dependencies.
- `index.html`: Vite app shell.
- `src/main.tsx`: React bootstrap.
- `src/App.tsx`: application composition, hidden admin entry triggers, login state.
- `src/types.ts`: shared data types.
- `src/data/defaultSite.ts`: bundled default site content.
- `src/data/storage.ts`: validation, local save/load, import/export/reset helpers.
- `src/components/public/PublicSite.tsx`: public page composition.
- `src/components/public/sections.tsx`: public page sections.
- `src/components/admin/AdminPanel.tsx`: admin shell, tabs, dashboard.
- `src/components/admin/editors.tsx`: focused editors for profile, sections, projects, experience, writing, media, links, appearance, SEO, and data.
- `src/components/ui.tsx`: shared controls.
- `src/styles.css`: complete responsive visual system.
- `src/data/storage.test.ts`: focused data utility tests.

## Tasks

### Task 1: Scaffold App

- [x] Create Vite React/TypeScript project files.
- [x] Add scripts: `dev`, `build`, `test`, `preview`.
- [x] Add dependencies for React, icons, Vitest, Testing Library, jsdom.

### Task 2: Data Model and Persistence

- [x] Define typed site data including profile, sections, projects, experience, writing, media, links, appearance, SEO, and admin.
- [x] Add default content suitable for a premium personal brand.
- [x] Implement local storage load/save/reset.
- [x] Implement import validation that rejects malformed JSON.
- [x] Implement export serialization.
- [x] Add tests for fallback loading, valid import, invalid import, and reset behavior.

### Task 3: Public Site

- [x] Build high-end responsive public sections.
- [x] Use real visual assets where available.
- [x] Support section visibility and appearance settings.
- [x] Avoid generic landing-page structure and decorative gradient blobs.

### Task 4: Hidden Admin Entry and Login

- [x] Open login by clicking the footer admin mark five times.
- [x] Open login by typing `admin`.
- [x] Require password `atelier`.
- [x] Show an error on incorrect password.

### Task 5: Admin Editors

- [x] Build admin shell with dashboard and tabs.
- [x] Add editors for profile, sections, projects, experience, writing, media, links, appearance, SEO, and data.
- [x] Support create, update, delete, reorder, feature, publish/hide, import, export, and reset.
- [x] Reflect edits immediately in the public site.

### Task 6: Verification

- [x] Run `npm test`.
- [x] Run `npm run build`.
- [x] Start local dev server.
- [x] Verify public layout at desktop and mobile widths.
- [x] Verify footer click admin entry.
- [x] Verify keyboard admin entry.
- [x] Verify incorrect and correct passwords.
- [x] Verify edits, toggles, import/export, and reset.
- [x] Check browser console for errors.

## Self-Review

- Spec coverage: public premium site, hidden admin entry, password login, single-site content management, local persistence, import/export/reset, and visual verification are covered.
- Placeholder scan: no placeholder tasks remain.
- Type consistency: all tasks use one shared `SiteData` model.
