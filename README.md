# Premium Personal Site

A premium bilingual personal brand website with a hidden password-protected admin console for managing one site's content, sections, appearance, metadata, and JSON import/export.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

The site opens in Chinese by default. Use the language button in the top-right corner to switch between Chinese and English. The same setting is also available in the admin console under Appearance.

Editable bilingual content is stored inside the project data. Language-specific fields are edited side by side in the normal content tabs, while shared fields such as dates, URLs, visibility, and ordering are kept once. Each bilingual field includes optional Bing/Microsoft translation assist buttons for English-to-Chinese or Chinese-to-English drafts; the generated text is editable and never forced. The `翻译检查 / Translation Check` tab only reports Chinese coverage and missing translation paths.

Admin edits are made in a draft first. Use `保存并生效 / Save & apply` to write the draft into this browser's `localStorage` and update the live site. The admin panel shows whether the draft is unsaved or already live, and wide screens include a side preview of the current draft.

## Admin Access

- Click the footer `2026` mark five times, or type `admin` on the page.
- Password: `atelier`

## Checks

```bash
npm test
npm run build
npm audit
```
