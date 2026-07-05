# Premium Personal Site

A premium bilingual personal brand website with a hidden password-protected admin console for managing one site's content, sections, appearance, metadata, and JSON import/export.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

The site opens in Chinese by default. Use the language button in the top-right corner to switch between Chinese and English. The same setting is also available in the admin console under Appearance.

Editable bilingual content is stored inside the project data. English content is edited in the normal content tabs, and Chinese content is edited in the `中文内容 / Translations` admin tab. The app does not call any online translation service.

## Admin Access

- Click the footer `2026` mark five times, or type `admin` on the page.
- Password: `atelier`

## Checks

```bash
npm test
npm run build
npm audit
```
