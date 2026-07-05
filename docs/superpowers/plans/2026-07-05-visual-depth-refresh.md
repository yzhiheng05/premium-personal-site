# Visual Depth Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add stronger visual depth to the public personal site while preserving the existing premium, restrained direction.

**Architecture:** Keep the current React/Vite structure. Modify only public presentation files and CSS: public section markup gains lightweight visual anchors, while all content remains driven by the existing `SiteData` and localization copy.

**Tech Stack:** React, TypeScript, CSS, existing lucide-react icons, Vite.

---

## File Structure

- Modify `src/i18n.ts`: add a few bilingual public labels used by the new visual overlays.
- Modify `src/components/public/sections.tsx`: add hero dossier overlays, project numbering, and media archive labels.
- Modify `src/styles.css`: add visual depth through grid overlays, fine-line frames, stronger project hierarchy, and responsive safeguards.

## Tasks

### Task 1: Add Bilingual Public Labels

- [x] Add concise labels under `publicCopy.en` and `publicCopy.zh` for hero dossier and media/project archive details.
- [x] Keep the labels generic enough for edited user content and avoid adding new data fields.

### Task 2: Add Public Markup Hooks

- [x] In `HeroSection`, add a non-editable visual dossier layer using existing profile values and new localized labels.
- [x] In `ProjectsSection`, include project index markers and wrap category/status metadata for richer card styling.
- [x] In `MediaSection`, include archive index markers and allow the first media item to receive a stronger layout treatment.

### Task 3: Add Visual CSS

- [x] Add background texture and fine-grid overlays to `.app` and `.hero-visual`.
- [x] Add dossier card, coordinate marks, and image treatment to the hero.
- [x] Add numbered project card headers, status rails, hover light sweep, and stronger featured card composition.
- [x] Add archive-wall styling for media cards and responsive fallbacks.

### Task 4: Verify

- [x] Run `npm test`.
- [x] Run `npm run build`.
- [x] Run `npm audit`.
- [x] Check desktop and mobile rendering in browser for no overlap, no blank page, no console errors, and no horizontal overflow.
