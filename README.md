# Hacker News Holiday Colors Extension

A browser extension that brings the festive Christmas colors to Hacker News throughout the entire holiday season, not just on Christmas Day.

## Features

- Automatically applies red and green alternating colors to story numbers on Hacker News
- Active from the day after Thanksgiving through the first workday of the new year
- Works on all pages under news.ycombinator.com
- Compatible with Chrome and Firefox

## Installation

### Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select this extension's directory
5. The extension will now be active when browsing Hacker News during the holiday season

### Firefox
1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" on the left sidebar
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from this extension's directory
5. The extension will now be active when browsing Hacker News during the holiday season

## How It Works

The extension:
- Detects if the current date falls within the holiday season (day after Thanksgiving through first workday of January)
- Applies CSS to alternate story ranking numbers between red (#ff0000) and green (#00ff00)
- Only activates on news.ycombinator.com domains

## Files

- `manifest.json` - Extension configuration
- `content.js` - JavaScript that checks dates and applies the holiday theme
- `christmas.css` - CSS rules for the red/green color alternation
- `icon*.png` - Extension icons in multiple sizes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.