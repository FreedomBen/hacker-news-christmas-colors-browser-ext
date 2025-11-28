# Repository Guidelines

## Project Structure & Module Organization
- `manifest.json`: Manifest V3 configuration; runs content scripts at `document_idle`, requests `storage`/`tabs`, scopes permissions to `news.ycombinator.com`, and wires the popup action.
- `content.js`: Calculates Thanksgiving-to-New-Year boundaries, reads sync storage modes (`default`, `always-on`, `always-off`, `extra-festive`), applies `hn-` classes, manages MutationObserver reapplication, and injects the animated tree via `addFestiveGif`.
- `christmas.css`: Alternates rank colors with nth-of-type selectors and `!important`, handles banner theming, and defines animation keyframes for extra festive mode.
- Popup UI (`popup.html`, `popup.js`, `popup.css`): Sync-storage-backed settings panel that reloads affected tabs.
- Docs (`README.md`, `TODO.md`, `CLAUDE.md`, `DEVELOPMENT_HISTORY.md`): Update when user-visible behavior or contributor process changes to keep guidance synchronized.

## Architecture Overview
Holiday activation depends on `isHolidaySeason()`; prefer switching modes instead of editing date logic when testing. Extra Festive mode animates ranks every two seconds, alternates the header tint, and should survive DOM refreshes by keeping helper functions idempotent. MutationObserver callbacks must guard against duplicate class toggles and reinsert the festive tree if a page refresh removes it.

## Build, Test, and Development Commands
No bundler is required. For Chrome, visit `chrome://extensions`, enable Developer Mode, and choose *Load unpacked*. For Firefox, run `npx web-ext run --target=firefox-desktop`. Validate before shipping with `npx web-ext lint`. Package for store uploads using `zip -r hn-christmas-colors.zip manifest.json *.js *.css popup.html icon*.png`.

## Coding Style & Naming Conventions
Use modern ES6 syntax, two-space indentation, and semicolons. Prefix injected DOM selectors with `hn-` to prevent conflicts. Keep inline comments focused on non-obvious behavior (date arithmetic, observer lifecycle, animation intervals). CSS should remain flat and extension-scoped; introduce variables or helper classes only when extending palettes or timing options.

## Testing Guidelines
Manual QA is required. After reloading the extension, exercise every mode on `https://news.ycombinator.com/`, verify alternating ranks, banner coloration, animated tree timing, and storage persistence across tabs. Outside the holiday window, rely on Always On instead of modifying `isHolidaySeason()`. When adjusting observers or CSS, test comments pages and the “More” link to ensure classes reapply on dynamic loads.

## Commit & Pull Request Guidelines
Keep commits short and imperative (e.g., `Fix festive animation timing`) and document any permission or storage changes. Pull requests should include a summary, testing notes, and media for UI tweaks. Call out manual QA steps and update both `README.md` and `CLAUDE.md` whenever behavior or tooling changes so contributors have consistent instructions.
