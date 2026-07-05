# Premium Personal Site Design

Date: 2026-07-05

## Goal

Build a premium personal website with a polished public experience and an unobtrusive administrator area. The administrator area manages one website's content and presentation settings.

The first version should feel rich and capable, but it should stay simple enough to run locally and verify end to end.

## Working Assumptions

- The site is for a high-end personal brand or portfolio.
- The target user is one owner, not a team.
- The first deliverable is a local web app that can later be deployed.
- The administrator area is hidden from casual visitors but still protected by a password.
- Content persistence can use browser storage for version one, with import and export for portability.

## Non-Goals

- No multi-user permission system.
- No cloud database in the first version.
- No payment, newsletter backend, or CRM integration.
- No real file upload service.
- No security claim based only on a hidden entry point.

## Public Site

The public site is the default first screen. It should not look like a template or a landing page shell.

Sections:

- Immersive hero with name, role, positioning, portrait or abstract personal visual, and primary actions.
- About section with short biography, metrics, and current focus.
- Selected projects with title, category, description, status, links, and featured flag.
- Experience timeline with organizations, roles, dates, and highlights.
- Writing or notes section with article cards and tags.
- Media wall for visual highlights, talks, appearances, screenshots, or selected images.
- Services or collaboration section with offerings and availability.
- Contact section with email, social links, and call-to-action.
- Footer with a subtle status line and unobtrusive admin entry trigger.

Interaction and presentation:

- Responsive desktop and mobile layouts.
- Smooth but restrained motion.
- Section navigation.
- Light/dark or editorial theme support.
- High-end typography and spacing.
- Real visual assets where useful, reusing existing local images if appropriate.

## Administrator Entry

The admin entry should be discoverable by the owner but not obvious to regular visitors.

Supported entry mechanisms:

- Click the footer year or small mark five times.
- Type the keyboard sequence `admin` while focused on the page.

After either trigger, a login panel appears. The panel requires a password before showing administrator controls.

Default local password:

- `atelier`

This password is only for local demonstration. A deployed version should move authentication server-side.

## Administrator Area

The administrator area manages a single website.

Core views:

- Dashboard: site status, visible modules, content counts, last local save time.
- Profile: name, role, tagline, biography, location, availability, portrait URL, hero visual text.
- Sections: show or hide public modules and reorder major sections.
- Projects: create, edit, delete, feature, reorder projects.
- Experience: create, edit, delete, reorder timeline entries.
- Writing: create, edit, delete, publish or hide article cards.
- Media: manage media items by URL, caption, type, and visibility.
- Links: manage email, social links, and contact actions.
- Appearance: choose theme mode, accent color, density, and motion level.
- SEO and metadata: page title, description, keywords, Open Graph image URL.
- Data: export JSON, import JSON, reset to defaults.

Expected operations:

- Add, update, delete, reorder, publish or hide content.
- Toggle modules on and off.
- Preview changes on the public page.
- Save changes to local browser storage.
- Export current site data as JSON.
- Import compatible JSON with validation.
- Reset local changes to bundled defaults.

## Data Model

The app uses one structured site data object.

Top-level fields:

- `profile`
- `sections`
- `projects`
- `experience`
- `writing`
- `media`
- `links`
- `appearance`
- `seo`
- `admin`

Every collection item should have a stable `id`, display fields, and a `visible` boolean where relevant.

Version one persistence:

- Bundled default data in source code or a JSON file.
- Local edits stored in `localStorage`.
- Export produces a full JSON snapshot.
- Import replaces current local data after schema checks.

## Architecture

Recommended implementation:

- A React single-page app built with Vite.
- Public site and admin area share the same data store.
- A small data utility handles defaults, validation, local save, import, export, and reset.
- UI state such as login status and active admin tab stays separate from persisted site content.

Module boundaries:

- `data`: defaults, schema helpers, persistence.
- `components/public`: public sections.
- `components/admin`: admin shell and editors.
- `components/ui`: shared controls.
- `styles`: global layout, typography, theme tokens.

## Error Handling

- Invalid admin password shows a short error without revealing more detail.
- Invalid import JSON is rejected with a clear message.
- Missing optional images degrade to intentional fallback visuals.
- Empty content collections show intentional empty states in admin and are hidden or de-emphasized on the public page.
- Local storage write failures show a non-blocking warning.

## Visual Direction

The site should feel premium through restraint and precision rather than visual clutter.

Design principles:

- Strong editorial typography.
- Clear hierarchy and confident whitespace.
- Sophisticated contrast between text, images, and surface colors.
- Limited accent color use.
- Polished controls in the admin area, optimized for repeated editing.
- No decorative gradient blobs, generic hero cards, or heavy one-color theme.

## Verification Plan

Before calling the implementation complete:

- Run install/build or equivalent project checks.
- Start the local development server.
- Verify the public site renders on desktop and mobile widths.
- Verify the hidden footer click entry opens the login panel.
- Verify the `admin` keyboard sequence opens the login panel.
- Verify incorrect password fails and correct password enters admin.
- Verify editing profile content updates the public site.
- Verify adding, editing, deleting, reordering, and hiding a project works.
- Verify toggling a public section changes the public page.
- Verify appearance controls affect the page.
- Verify JSON export downloads or displays valid JSON.
- Verify JSON import updates the site and rejects invalid JSON.
- Verify reset restores default data.
- Check browser console for errors.
- Capture screenshots or otherwise inspect rendered layout for obvious overflow, overlap, or broken responsive behavior.

## Open Decisions

These can be refined during implementation without changing the product direction:

- Exact displayed name, profession, biography, and project content.
- Whether to use the existing local images or generate/find new visuals.
- Final color palette and typography choices.
- Whether a later deployment needs a server-backed data store.

## Approval Status

The user approved the overall direction:

- High-end personal brand or portfolio site.
- Editable administrator backend.
- Unobtrusive admin entry.
- Single-site management.
- Local first implementation with a later path to deployment.
