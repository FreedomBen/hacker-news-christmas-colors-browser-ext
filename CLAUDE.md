# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a browser extension that applies festive red and green colors to Hacker News story numbers during the holiday season (day after Thanksgiving through first workday of January). It's designed to work with both Chrome and Firefox browsers.

## Development and Project Guidelines

- Whenever making a code change, always update the README.md and CLAUDE.md if the change is relevant

## Extension Architecture

The extension uses Manifest V3 and consists of:

1. **Date Detection Logic** (`content.js`): 
   - Calculates holiday season boundaries dynamically based on Thanksgiving (4th Thursday of November) and New Year
   - Checks user settings from Chrome storage to determine activation mode
   - Applies `hn-christmas-colors` class to the body element based on mode and date
   - Uses MutationObserver to handle dynamically loaded content on Hacker News

2. **Styling System** (`christmas.css`):
   - Uses CSS nth-of-type selectors to alternate colors between red (#be2828) and green (#005a00)
   - Changes top banner background to festive red (#cc1010)
   - Colors match Hacker News's actual Christmas theme colors
   - All rules use `!important` to override HN's default styles

3. **Settings System** (`popup.html`, `popup.js`, `popup.css`):
   - Provides a popup interface accessible via the extension icon
   - Four modes available:
     - Default: Active only during holiday season
     - Always On: Christmas colors year-round
     - Always Off: Disable Christmas colors completely
     - Extra Festive: Animated colors (alternating red/green every 2 seconds) plus festive GIF
   - Settings stored in Chrome sync storage for persistence across devices
   - Automatically reloads Hacker News tabs when settings change
   - Extra Festive mode features:
     - Story numbers alternate between red and green colors every 2 seconds
     - Title bar alternates between red and green backgrounds
     - Animated Christmas tree GIF displayed at top of story list

4. **Manifest Configuration**:
   - Content scripts run at `document_idle` for optimal performance
   - Requests `storage` permission for settings persistence
   - Requests `tabs` permission for automatic reload on settings change
   - Includes popup action for settings interface
   - Only requests permissions for `news.ycombinator.com` domain

## Development Commands

### Testing the Extension

**Chrome:**
1. Navigate to `chrome://extensions/`
2. Enable Developer mode
3. Click "Load unpacked" and select this directory
4. Visit news.ycombinator.com to test

**Firefox:**
1. Navigate to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on" and select `manifest.json`
4. Visit news.ycombinator.com to test

### Modifying Holiday Date Range

The date calculation logic in `content.js:isHolidaySeason()` handles:
- Thanksgiving calculation (4th Thursday of November)
- Weekend handling for January 1st
- Timezone considerations (uses local time)

To test outside the holiday season, use the extension popup to switch to "Always On" mode instead of modifying code.

### Icon Generation

Icons feature a festive browser window design with a green frame containing a "Y" logo, browser controls (three dots), and a red content area with a green Christmas tree topped with a golden star. Icons are provided in three sizes (16x16, 48x48, 128x128) for different display contexts.
