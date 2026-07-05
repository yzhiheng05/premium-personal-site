# Premium Personal Site Handoff

## Project

- Local path: `/Users/yzh/AI/CodexProject/Others/premium-personal-site`
- GitHub repo: `https://github.com/yzhiheng05/premium-personal-site`
- Main branch is synced.
- Latest commit: run `git log -1 --oneline` in the project.
- Project type: React + Vite personal website with a hidden admin console.

## User Intent

The user wants a high-end personal website with many polished features and an editable admin backend. The site should feel premium, not like a simple landing page. Admin entry should be hidden or unobvious. The user prefers direct execution, minimal back-and-forth, and expects reasonable engineering judgment.

Recent focus:

- The site was originally English.
- It was changed to support Chinese and English switching.
- The user asked whether translation is online/free automatic translation or stored in-project.
- Current implementation uses stored in-project bilingual content, not online translation.
- Editable bilingual content is now edited side by side in the normal content tabs. Each bilingual field has optional Bing/Microsoft translation assist buttons for English-to-Chinese and Chinese-to-English drafts. The `翻译检查 / Translation Check` tab only reports Chinese coverage and missing translation paths.

## Current Behavior

- Default language: Chinese.
- Public language switch: top-right `EN` / `中文` button.
- Admin language setting: `Appearance` tab.
- Hidden admin entry:
  - Click footer `2026` five times, or
  - Type `admin` while on the page.
- Admin password: `atelier`
- Content persistence: browser `localStorage`.
- Data import/export: JSON.
- No backend database.
- No real server-side authentication.

Important security note: the hidden admin entrance and password are only client-side/demo protection. This is not real production security. A real deployed private admin would need a backend/auth layer.

## Bilingual Implementation

Main files:

- `src/types.ts`
  - Defines `Language = "zh" | "en"`.
  - Adds `appearance.language`.
  - Adds optional `translations?: { zh: Record<string, string> }`.

- `src/i18n.ts`
  - Contains fixed UI copy for public and admin chrome.
  - Contains `normalizeLanguage()`.
  - Contains `localizeSiteData(data, language)`.
  - When language is `en`, it returns the base English site data.
  - When language is `zh`, it overlays Chinese values from `data.translations.zh`.

- `src/data/defaultSite.ts`
  - Default site content.
  - Default `appearance.language` is `zh`.
  - Contains default Chinese translation values under `translations.zh`.

- `src/data/storage.ts`
  - Normalizes older saved data.
  - Fills missing `appearance.language`.
  - Merges missing default Chinese translations.

- `src/components/admin/AdminPanel.tsx`
  - Adds the `translations` admin tab as a translation coverage/check view.

- `src/components/admin/editors.tsx`
  - Contains bilingual field editors for language-specific content.
  - English/base values and Chinese translation values are edited side by side in the normal content tabs.
  - Bilingual fields include optional one-click Bing/Microsoft translation assist; translated output is only a draft and remains manually editable.
  - Shared fields such as dates, URLs, visibility, ordering, media type, theme, and accent remain single-value fields.
  - Contains `TranslationEditor` for coverage reporting only.

## How Editing Translation Works

There is no automatic online translation.

The app stores two editable content layers:

- Base content: treated as English.
- Chinese content: stored in `translations.zh` using path keys like:
  - `profile.name`
  - `profile.biography`
  - `projects.<id>.description`
  - `writing.<id>.summary`
  - `services.<id>.description`

When the public site is in Chinese, `localizeSiteData()` replaces supported English fields with matching Chinese translation fields. If a translation is missing, it falls back to the base English value.

For long text such as personal evaluations, biographies, or blog summaries:

- Write/edit English and Chinese side by side in the relevant content tab.
- Use `翻译检查 / Translation Check` to find missing Chinese fields.
- Optional translation assist calls Microsoft Edge/Bing translation endpoints directly from the browser when the user clicks a translate button.
- Translation is not automatic and does not force paired names or text to match.

This keeps manual control as the source of truth while making first drafts faster. If the user later wants production-grade translation, replace the public browser call with a deliberate provider choice, backend proxy, cost handling, and review-before-save behavior.

## Commands

Run locally:

```bash
npm install
npm run dev -- --port 5173
```

Open:

```text
http://127.0.0.1:5173/
```

Verify:

```bash
npm test
npm run build
npm audit
```

Git:

```bash
git status --short
git log -1 --oneline
git remote -v
```

Push:

```bash
git push origin main
```

## Previous Verification

Earlier checks passed:

- `npm test`
- `npm run build`
- `npm audit`
- Browser QA for:
  - default Chinese rendering
  - switching to English
  - admin language setting
  - editable bilingual content
  - mobile layout without horizontal overflow
  - no console errors

QA screenshots were added in:

- `qa/editable-bilingual-desktop.png`
- `qa/editable-bilingual-mobile.png`

## Good Next Steps

Only do these if the user asks or if they are clearly needed:

- Deploy to Vercel and connect the GitHub repo.
- Replace demo content with the user's real profile, projects, writing, and services.
- Add real authentication and backend persistence.
- Add optional AI-assisted translation with manual review.
- Add image upload/storage instead of URL-only media fields.

Avoid overbuilding unless requested. Keep changes surgical and verify with tests/build/browser checks.

## Copy-Paste Prompt For Next Session

```text
你正在接手一个已有项目，请继续在这个项目上工作，不要从零开始。

项目路径：
/Users/yzh/AI/CodexProject/Others/premium-personal-site

GitHub 仓库：
https://github.com/yzhiheng05/premium-personal-site

当前状态：
- React + Vite 个人高端网页项目。
- 已有隐藏管理员后台。
- 后台入口：点击页脚 2026 五次，或在页面输入 admin。
- 后台密码：atelier。
- 默认中文，支持中英文切换。
- 双语不是联网翻译，是项目内存储的固定/可编辑内容。
- 中英文内容在普通后台内容页并排编辑。
- 后台 `翻译检查 / Translation Check` 页只检查中文覆盖率和缺失路径。
- 数据保存在 localStorage，支持 JSON 导入导出。
- 当前没有后端数据库，也没有真正的服务端认证。

关键文件：
- src/types.ts
- src/i18n.ts
- src/data/defaultSite.ts
- src/data/storage.ts
- src/components/public/PublicSite.tsx
- src/components/public/sections.tsx
- src/components/admin/AdminPanel.tsx
- src/components/admin/editors.tsx
- README.md
- HANDOFF.md

运行：
npm run dev -- --port 5173

验证：
npm test
npm run build
npm audit

请先查看 git status 和相关文件，再继续。保持最小必要修改，不要随意重构。完成后运行相关验证，并把变更 commit/push 到 origin main，除非用户明确说不用。
```
