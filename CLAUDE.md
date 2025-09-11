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
   - Applies `hn-christmas-colors` class to the body element when within the holiday period
   - Uses MutationObserver to handle dynamically loaded content on Hacker News

2. **Styling System** (`christmas.css`):
   - Uses CSS nth-child selectors to alternate colors between red (#ff0000) and green (#00ff00)
   - Multiple selector strategies to ensure coverage across different HN page structures
   - All rules use `!important` to override HN's default styles

3. **Manifest Configuration**:
   - Content scripts run at `document_idle` for optimal performance
   - Only requests permissions for `news.ycombinator.com` domain
   - No background scripts or service workers needed

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

To test outside the holiday season, temporarily modify the return statement in `isHolidaySeason()` to `return true;`

### Icon Generation

Icons were generated as 2x2 checkerboard patterns (red/green) in three sizes (16x16, 48x48, 128x128). If icons need regeneration, use a script that creates simple geometric patterns rather than complex graphics.
