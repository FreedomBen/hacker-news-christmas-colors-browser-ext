const TREE_LAYER_SHAPES = {
  classic: [
    '48,24 24,54 72,54',
    '48,46 18,78 78,78',
    '48,68 28,92 68,92'
  ],
  wide: [
    '48,22 18,50 78,50',
    '48,44 12,78 84,78',
    '48,68 18,96 78,96'
  ],
  tall: [
    '48,18 30,52 66,52',
    '48,42 24,78 72,78',
    '48,66 28,94 68,94'
  ],
  zigzag: [
    '48,26 26,52 70,56',
    '48,46 20,80 76,76',
    '48,68 30,94 66,96'
  ],
  plush: [
    '48,28 20,56 76,58',
    '48,48 16,82 80,82',
    '48,70 24,98 72,100'
  ]
};

const DEFAULT_STRIPE_SEGMENTS = [
  { x: 32, y: 38, width: 32, height: 4, opacity: 0.6 },
  { x: 26, y: 62, width: 44, height: 4, opacity: 0.5 }
];

const DEFAULT_LIGHT_STRINGS = [
  '26,46 36,42 46,45 56,40 66,46',
  '22,64 32,60 48,66 64,60 74,64',
  '28,80 40,76 48,80 58,76 68,80'
];

const FESTIVE_LIGHT_POSITIONS = [
  { cx: 26, cy: 46, paletteIndex: 0, baseDuration: 0.9, baseOffset: 0, pattern: '1;0.2;1' },
  { cx: 36, cy: 42, paletteIndex: 1, baseDuration: 1.1, baseOffset: 0, pattern: '0.3;1;0.3' },
  { cx: 46, cy: 45, paletteIndex: 2, baseDuration: 0.8, baseOffset: 0, pattern: '1;0.1;1' },
  { cx: 56, cy: 40, paletteIndex: 3, baseDuration: 1, baseOffset: 0.3, pattern: '0.2;1;0.2' },
  { cx: 66, cy: 46, paletteIndex: 4, baseDuration: 1.2, baseOffset: 0.2, pattern: '1;0.2;1' },
  { cx: 22, cy: 64, paletteIndex: 0, baseDuration: 1.4, baseOffset: 0, pattern: '0.2;1;0.2' },
  { cx: 32, cy: 60, paletteIndex: 1, baseDuration: 0.7, baseOffset: 0.4, pattern: '1;0.1;1' },
  { cx: 48, cy: 66, paletteIndex: 2, baseDuration: 0.95, baseOffset: 0.2, pattern: '0.3;1;0.3' },
  { cx: 64, cy: 60, paletteIndex: 3, baseDuration: 1.3, baseOffset: 0.1, pattern: '1;0.25;1' },
  { cx: 74, cy: 64, paletteIndex: 4, baseDuration: 0.85, baseOffset: 0.5, pattern: '0.1;1;0.1' },
  { cx: 28, cy: 80, paletteIndex: 0, baseDuration: 1, baseOffset: 0.6, pattern: '1;0.2;1' },
  { cx: 40, cy: 76, paletteIndex: 1, baseDuration: 1.05, baseOffset: 0.35, pattern: '0.25;1;0.25' },
  { cx: 48, cy: 80, paletteIndex: 2, baseDuration: 0.75, baseOffset: 0.15, pattern: '1;0.15;1' },
  { cx: 58, cy: 76, paletteIndex: 3, baseDuration: 1.25, baseOffset: 0.25, pattern: '0.2;1;0.2' },
  { cx: 68, cy: 80, paletteIndex: 4, baseDuration: 0.9, baseOffset: 0.45, pattern: '1;0.3;1' }
];

const DEFAULT_LIGHT_PALETTE = ['#ff5555', '#8af7ff', '#ffd966', '#ff7bf4', '#5dff8a'];

const FESTIVE_TREE_VARIANTS = [
  {
    shape: 'classic',
    sky: '#0b1033',
    skyStroke: '#2a3777',
    overlay: '#19255c',
    overlayOpacity: 0.65,
    treeColors: ['#0a6b33', '#0e7f3d', '#12924a'],
    treeStroke: '#053a1a',
    stripeColor: '#1f9c52',
    trunk: '#6b3e1f',
    trunkStroke: '#3f2312',
    star: '#ffd658',
    starStroke: '#e29300',
    starBlink: '1.2s',
    stringColor: '#36577a',
    lightPalette: ['#ff5555', '#8af7ff', '#ffd966', '#ff7bf4', '#5dff8a'],
    durationScale: 1,
    durationJitter: 0.02,
    phaseShift: 0,
    phaseStep: 0.03,
    messageColor: '#005a00'
  },
  {
    shape: 'wide',
    sky: '#1b0f3b',
    skyStroke: '#4d3ca6',
    overlay: '#27327a',
    overlayOpacity: 0.7,
    treeColors: ['#0f8d4b', '#13a95f', '#1ad970'],
    treeStroke: '#054d24',
    stripeColor: '#21ff8d',
    stripeSegments: [
      { x: 30, y: 36, width: 36, height: 4, opacity: 0.7 },
      { x: 22, y: 60, width: 52, height: 4, opacity: 0.55 }
    ],
    trunk: '#6e4423',
    trunkStroke: '#3a2312',
    star: '#fff466',
    starStroke: '#d6a400',
    starBlink: '1s',
    stringColor: '#40b0ff',
    lightPalette: ['#ff66c4', '#7effff', '#ffe666', '#ff8f66', '#8fff66'],
    durationScale: 1.1,
    durationJitter: 0.04,
    phaseShift: 0.05,
    phaseStep: 0.04,
    messageColor: '#1ad970'
  },
  {
    shape: 'tall',
    sky: '#102125',
    skyStroke: '#2e5964',
    overlay: '#193c45',
    overlayOpacity: 0.55,
    treeColors: ['#0d5b4c', '#127b66', '#18a086'],
    treeStroke: '#063931',
    stripeColor: '#68ffe6',
    stripeSegments: [
      { x: 34, y: 36, width: 28, height: 4, opacity: 0.55 },
      { x: 28, y: 60, width: 40, height: 4, opacity: 0.5 }
    ],
    trunk: '#4e2f1f',
    trunkStroke: '#2b160d',
    star: '#fff2d6',
    starStroke: '#c9912a',
    starBlink: '1.4s',
    stringColor: '#2ab0c4',
    lightPalette: ['#8fffff', '#e0ffe0', '#fff68f', '#ff9ac2', '#a0c9ff'],
    durationScale: 0.9,
    durationJitter: 0.03,
    phaseShift: 0.1,
    phaseStep: 0.02,
    messageColor: '#0d7f6d'
  },
  {
    shape: 'zigzag',
    sky: '#260d2f',
    skyStroke: '#5f1f78',
    overlay: '#40185b',
    overlayOpacity: 0.7,
    treeColors: ['#0b6f38', '#0d8f46', '#0fae54'],
    treeStroke: '#044b23',
    stripeColor: '#ff526f',
    stripeSegments: [
      { x: 28, y: 40, width: 38, height: 4, opacity: 0.65 },
      { x: 22, y: 64, width: 48, height: 4, opacity: 0.55 }
    ],
    trunk: '#53281b',
    trunkStroke: '#33160e',
    star: '#ffe75d',
    starStroke: '#ff9f1c',
    starBlink: '1.1s',
    stringColor: '#ff92b8',
    lightPalette: ['#ff4f6d', '#ffd1dc', '#fff18b', '#ffa07a', '#ff7bda'],
    durationScale: 1.05,
    durationJitter: 0.05,
    phaseShift: 0,
    phaseStep: 0.05,
    messageColor: '#ff82ac'
  },
  {
    shape: 'plush',
    sky: '#2a1200',
    skyStroke: '#693000',
    overlay: '#3e1c05',
    overlayOpacity: 0.62,
    treeColors: ['#0f6c31', '#0c852d', '#0a9c28'],
    treeStroke: '#054d1b',
    stripeColor: '#f6b26b',
    trunk: '#7c3f00',
    trunkStroke: '#4d2400',
    star: '#ffd369',
    starStroke: '#c9971c',
    starBlink: '1.3s',
    stringColor: '#ffaa5c',
    lightPalette: ['#ffba71', '#fff2aa', '#ff8787', '#ffd5e5', '#a3ffe7'],
    durationScale: 0.95,
    durationJitter: 0.02,
    phaseShift: 0.07,
    phaseStep: 0.03,
    messageColor: '#f6b26b'
  },
  {
    shape: 'wide',
    sky: '#030b2d',
    skyStroke: '#2541ff',
    overlay: '#0d1a5c',
    overlayOpacity: 0.75,
    treeColors: ['#00b894', '#00cec9', '#00ffa6'],
    treeStroke: '#005f4e',
    stripeColor: '#96ffde',
    stringColor: '#ff57ff',
    stringStrokeWidth: 4,
    star: '#ffe66f',
    starStroke: '#d149ff',
    starBlink: '0.9s',
    lightPalette: ['#ff2d95', '#57fff2', '#ffe555', '#7b5dff', '#63ff87'],
    durationScale: 1.2,
    durationJitter: 0.06,
    phaseShift: 0.12,
    phaseStep: 0.04,
    messageColor: '#ff57ff',
    lightPatterns: ['1;0.2;1', '0.2;1;0.2', '1;0.1;1', '0.15;1;0.15', '1;0.25;1']
  },
  {
    shape: 'tall',
    sky: '#202548',
    skyStroke: '#46529c',
    overlay: '#2d3570',
    overlayOpacity: 0.6,
    treeColors: ['#1a7f5f', '#2ca87e', '#3cd9aa'],
    treeStroke: '#0c5b3d',
    stripeColor: '#d0fff2',
    trunk: '#4a3c2c',
    trunkStroke: '#2a1f16',
    star: '#fff9c4',
    starStroke: '#d1b85f',
    starBlink: '1.5s',
    stringColor: '#87d7ff',
    lightPalette: ['#ffe0f3', '#f1ffb8', '#b5ffd9', '#ffd7a8', '#fff5ba'],
    durationScale: 0.85,
    durationJitter: 0.025,
    phaseShift: 0.08,
    phaseStep: 0.02,
    messageColor: '#2ca87e'
  },
  {
    shape: 'classic',
    sky: '#140d33',
    skyStroke: '#463e8f',
    overlay: '#211853',
    overlayOpacity: 0.68,
    treeColors: ['#056b3c', '#047d4a', '#059457'],
    treeStroke: '#033d22',
    stripeColor: '#3dffe4',
    stringColor: '#54c9ff',
    star: '#ffd86b',
    starStroke: '#ff9a1f',
    starBlink: '1s',
    lightPalette: ['#ff8fa3', '#ffd166', '#8ecae6', '#caffbf', '#ffb5f5'],
    durationScale: 1.15,
    durationJitter: 0.05,
    phaseShift: 0.04,
    phaseStep: 0.03,
    messageColor: '#47d7bb'
  },
  {
    shape: 'zigzag',
    sky: '#2f043b',
    skyStroke: '#661872',
    overlay: '#420d55',
    overlayOpacity: 0.72,
    treeColors: ['#0d7436', '#12934a', '#18b75e'],
    treeStroke: '#054d24',
    stripeColor: '#ff66b3',
    stringColor: '#ff68ff',
    stringStrokeWidth: 4,
    star: '#ffe86a',
    starStroke: '#ff66c7',
    starBlink: '1.1s',
    lightPalette: ['#ff66c7', '#ffaa00', '#ffe066', '#65ffda', '#92baff'],
    durationScale: 1.05,
    durationJitter: 0.03,
    phaseShift: 0.09,
    phaseStep: 0.05,
    messageColor: '#ff66c7'
  },
  {
    shape: 'tall',
    sky: '#001b3f',
    skyStroke: '#1d4a8f',
    overlay: '#0b2f66',
    overlayOpacity: 0.58,
    treeColors: ['#067d81', '#0a9ba8', '#11b4c2'],
    treeStroke: '#044d57',
    stripeColor: '#49f6ff',
    stringColor: '#55c7ff',
    star: '#f5fcff',
    starStroke: '#9fe7ff',
    starBlink: '1s',
    lightPalette: ['#8cffff', '#b5efff', '#ffe19c', '#ff9ed1', '#bef7ff'],
    durationScale: 0.88,
    durationJitter: 0.02,
    phaseShift: 0.05,
    phaseStep: 0.02,
    messageColor: '#11b4c2'
  },
  {
    shape: 'classic',
    sky: '#2a1500',
    skyStroke: '#603800',
    overlay: '#3d2405',
    overlayOpacity: 0.66,
    treeColors: ['#0b7a32', '#0f983c', '#15b346'],
    treeStroke: '#054b1f',
    stripeColor: '#ffd166',
    stringColor: '#ff9d3f',
    star: '#fffb85',
    starStroke: '#ffba49',
    starBlink: '1.2s',
    lightPalette: ['#ff7f11', '#ffe066', '#fff5b7', '#ffb6c1', '#c3ff68'],
    durationScale: 1.1,
    durationJitter: 0.04,
    phaseShift: 0.03,
    phaseStep: 0.03,
    messageColor: '#fbbf24'
  },
  {
    shape: 'wide',
    sky: '#021f1c',
    skyStroke: '#0b5f4f',
    overlay: '#0e3630',
    overlayOpacity: 0.6,
    treeColors: ['#0d9c57', '#0dbc68', '#0fd479'],
    treeStroke: '#055f33',
    stripeColor: '#70ffb3',
    stringColor: '#31f3b3',
    star: '#f8ffe5',
    starStroke: '#9bec6d',
    starBlink: '1.05s',
    lightPalette: ['#5bffbf', '#8fffff', '#ffef6f', '#ff82fa', '#7dff6b'],
    durationScale: 1.05,
    durationJitter: 0.03,
    phaseShift: 0.11,
    phaseStep: 0.04,
    messageColor: '#31f3b3',
    lightPatterns: ['1;0.25;1', '0.2;1;0.2', '1;0.15;1', '0.3;1;0.3', '1;0.2;1']
  }
];

let selectedFestiveTree = null;

function buildRetroTree(variant) {
  const shapeKey = variant.shape && TREE_LAYER_SHAPES[variant.shape] ? variant.shape : 'classic';
  const layerPoints = TREE_LAYER_SHAPES[shapeKey];
  const treeStroke = variant.treeStroke || '#053a1a';
  const treeStrokeWidth = variant.treeStrokeWidth || 3;
  const treeColors = variant.treeColors && variant.treeColors.length ? variant.treeColors : ['#0a6b33', '#0e7f3d', '#12924a'];
  const layersMarkup = layerPoints
    .map((points, index) => `<polygon points="${points}" fill="${treeColors[index % treeColors.length]}" stroke="${treeStroke}" stroke-width="${treeStrokeWidth}"/>`)
    .join('\n          ');

  const stripeSegments = variant.stripeSegments || DEFAULT_STRIPE_SEGMENTS;
  const stripeColor = variant.stripeColor || '#1f9c52';
  const stripesMarkup = stripeSegments
    .map((segment) => `<rect x="${segment.x}" y="${segment.y}" width="${segment.width}" height="${segment.height}" fill="${stripeColor}" opacity="${segment.opacity != null ? segment.opacity : 0.5}"/>`)
    .join('\n          ');

  const lightStrings = variant.lightStrings || DEFAULT_LIGHT_STRINGS;
  const stringColor = variant.stringColor || '#36577a';
  const stringStrokeWidth = variant.stringStrokeWidth || 3;
  const stringsMarkup = lightStrings
    .map((points) => `<polyline points="${points}" fill="none" stroke="${stringColor}" stroke-width="${stringStrokeWidth}"/>`)
    .join('\n          ');

  const palette = variant.lightPalette && variant.lightPalette.length ? variant.lightPalette : DEFAULT_LIGHT_PALETTE;
  const lightPatterns = variant.lightPatterns && variant.lightPatterns.length ? variant.lightPatterns : null;
  const durationScale = variant.durationScale != null ? variant.durationScale : 1;
  const durationJitter = variant.durationJitter || 0;
  const phaseShift = variant.phaseShift || 0;
  const phaseStep = variant.phaseStep || 0;

  const lightsMarkup = FESTIVE_LIGHT_POSITIONS
    .map((light, index) => {
      const color = palette[light.paletteIndex % palette.length];
      const pattern = lightPatterns ? lightPatterns[light.paletteIndex % lightPatterns.length] : light.pattern;
      const jitterDirection = index % 2 === 0 ? 1 : -1;
      const rawDuration = light.baseDuration * durationScale + jitterDirection * durationJitter;
      const duration = Math.max(0.6, Math.round(rawDuration * 100) / 100);
      const begin = Math.max(0, Math.round((light.baseOffset + phaseShift + phaseStep * index) * 100) / 100);
      return `<circle cx="${light.cx}" cy="${light.cy}" r="3" fill="${color}">
            <animate attributeName="opacity" values="${pattern}" dur="${duration.toFixed(2)}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite"/>
          </circle>`;
    })
    .join('\n          ');

  const snowColor = variant.snowColor || '#f5f5ff';
  const snowStroke = variant.snowStroke || '#cfd3ff';
  const snowStrokeWidth = variant.snowStrokeWidth || 2;

  const trunkX = variant.trunkX != null ? variant.trunkX : 44;
  const trunkY = variant.trunkY != null ? variant.trunkY : 88;
  const trunkWidth = variant.trunkWidth || 8;
  const trunkHeight = variant.trunkHeight || 12;
  const trunkColor = variant.trunk || '#6b3e1f';
  const trunkStroke = variant.trunkStroke || '#3f2312';
  const trunkStrokeWidth = variant.trunkStrokeWidth || 2;

  const skyColor = variant.sky || '#0b1033';
  const skyStrokeColor = variant.skyStroke || '#2a3777';
  const overlayColor = variant.overlay || '#19255c';
  const overlayX = variant.overlayX != null ? variant.overlayX : 6;
  const overlayY = variant.overlayY != null ? variant.overlayY : 24;
  const overlayWidth = variant.overlayWidth || 84;
  const overlayHeight = variant.overlayHeight || 78;
  const overlayOpacity = variant.overlayOpacity != null ? variant.overlayOpacity : 0.65;

  const starColor = variant.star || '#ffd658';
  const starStroke = variant.starStroke || '#e29300';
  const starBlink = variant.starBlink || '1.2s';
  const starTwinkle = variant.starTwinkle || '1;0.4;1';

  return `
        <svg width="96" height="110" viewBox="0 0 96 110" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
          <rect x="4" y="6" width="88" height="98" fill="${skyColor}" rx="4" ry="4" stroke="${skyStrokeColor}" stroke-width="2"/>
          <rect x="${overlayX}" y="${overlayY}" width="${overlayWidth}" height="${overlayHeight}" fill="${overlayColor}" opacity="${overlayOpacity}"/>
          <rect x="14" y="86" width="68" height="16" fill="${snowColor}" stroke="${snowStroke}" stroke-width="${snowStrokeWidth}"/>
          ${layersMarkup}
          ${stripesMarkup}
          <rect x="${trunkX}" y="${trunkY}" width="${trunkWidth}" height="${trunkHeight}" fill="${trunkColor}" stroke="${trunkStroke}" stroke-width="${trunkStrokeWidth}"/>
          <polygon points="48,14 51,22 60,22 53,28 56,36 48,30 40,36 43,28 36,22 45,22"
                   fill="${starColor}" stroke="${starStroke}" stroke-width="2">
            <animate attributeName="opacity" values="${starTwinkle}" dur="${starBlink}" repeatCount="indefinite"/>
          </polygon>
          ${stringsMarkup}
          <g>
          ${lightsMarkup}
          </g>
        </svg>
      `.trim();
}

function getSelectedFestiveTree() {
  if (!selectedFestiveTree) {
    const randomIndex = Math.floor(Math.random() * FESTIVE_TREE_VARIANTS.length);
    const variant = FESTIVE_TREE_VARIANTS[randomIndex];
    selectedFestiveTree = {
      svg: buildRetroTree(variant),
      messageColor: variant.messageColor || '#005a00'
    };
  }

  return selectedFestiveTree;
}

function addFestiveGif() {
  // Remove existing GIF if present
  removeFestiveGif();

  // Wait a bit for page to load if needed
  setTimeout(() => {
    // Find the first story item
    const firstStory = document.querySelector('.athing');
    if (!firstStory) {
      console.log('HN Christmas Colors: No stories found for GIF placement');
      return;
    }

    // Create a new row for the festive element
    const gifRow = document.createElement('tr');
    gifRow.id = 'hn-festive-gif';

    // Use inline SVG Christmas tree with animation to avoid CSP issues
    const festiveTree = getSelectedFestiveTree();
    gifRow.innerHTML = `
      <td colspan="3" style="text-align: center; padding: 20px 0; background: #f6f6ef;">
        ${festiveTree.svg}
        <div style="margin-top: 5px; color: ${festiveTree.messageColor}; font-weight: bold; font-size: 14px;">
          🎄 Merry Christmas and Happy Holidays! 🎄
        </div>
      </td>
    `;

    // Insert before the first story
    firstStory.parentNode.insertBefore(gifRow, firstStory);
    console.log('HN Christmas Colors: Festive decoration added');
  }, 100);
}

function removeFestiveGif(options = {}) {
  const { resetSelection = false } = options;
  const existingGif = document.getElementById('hn-festive-gif');
  if (existingGif) {
    existingGif.remove();
  }
  if (resetSelection) {
    selectedFestiveTree = null;
  }
}

function isHolidaySeason() {
  const today = new Date();
  const year = today.getFullYear();
  
  // Get Thanksgiving (fourth Thursday of November)
  const november = new Date(year, 10, 1); // Month is 0-indexed
  const firstThursday = november.getDay() <= 4 ? 
    new Date(year, 10, 1 + (4 - november.getDay())) : 
    new Date(year, 10, 1 + (11 - november.getDay()));
  const thanksgiving = new Date(firstThursday);
  thanksgiving.setDate(thanksgiving.getDate() + 21); // Add 3 weeks to get 4th Thursday
  
  // Day after Thanksgiving
  const startDate = new Date(thanksgiving);
  startDate.setDate(startDate.getDate() + 1);
  
  // First workday of new year (accounting for weekends)
  let endDate = new Date(year + 1, 0, 1); // January 1st of next year
  
  // If January 1st is Saturday, first workday is Monday the 3rd
  if (endDate.getDay() === 6) {
    endDate.setDate(3);
  }
  // If January 1st is Sunday, first workday is Monday the 2nd
  else if (endDate.getDay() === 0) {
    endDate.setDate(2);
  }
  // Otherwise, January 1st is a weekday and is the first workday
  
  // Check if today is within the holiday season
  return today >= startDate && today < endDate;
}

async function applyChristmasColors() {
  try {
    // Cross-browser compatibility
    const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
    
    // Get user settings
    let result;
    if (typeof browser !== 'undefined') {
      // Firefox uses promises
      result = await browserAPI.storage.sync.get(['mode']);
    } else {
      // Chrome uses callbacks, wrap in promise
      result = await new Promise((resolve) => {
        chrome.storage.sync.get(['mode'], resolve);
      });
    }
    
    const mode = result.mode || 'default';
    
    // Handle different modes
    if (mode === 'always-off') {
      // Remove Christmas colors if they're applied
      document.body.classList.remove('hn-christmas-colors');
      document.body.classList.remove('hn-extra-festive');
      removeFestiveGif({ resetSelection: true });
      return;
    }
    
    if (mode === 'extra-festive') {
      // Extra Festive mode - animated colors and GIF
      document.body.classList.add('hn-christmas-colors');
      document.body.classList.add('hn-extra-festive');

      // Add festive GIF at the top of the story list
      addFestiveGif();

      // Handle dynamically loaded content
      const observer = new MutationObserver(() => {
        if (document.body && !document.body.classList.contains('hn-extra-festive')) {
          document.body.classList.add('hn-christmas-colors');
          document.body.classList.add('hn-extra-festive');
        }
        // Re-add GIF if it gets removed
        if (!document.getElementById('hn-festive-gif')) {
          addFestiveGif();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else if (mode === 'always-on' || (mode === 'default' && isHolidaySeason())) {
      // Add the christmas-colors class to body to activate our CSS
      document.body.classList.add('hn-christmas-colors');
      document.body.classList.remove('hn-extra-festive');
      removeFestiveGif({ resetSelection: true });

      // Also handle dynamically loaded content
      const observer = new MutationObserver(() => {
        if (document.body && !document.body.classList.contains('hn-christmas-colors')) {
          document.body.classList.add('hn-christmas-colors');
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      // Remove Christmas colors if outside holiday season in default mode
      document.body.classList.remove('hn-christmas-colors');
      document.body.classList.remove('hn-extra-festive');
      removeFestiveGif({ resetSelection: true });
    }
  } catch (error) {
    console.error('Error accessing storage:', error);
    // Fall back to default behavior if storage access fails
    if (isHolidaySeason()) {
      document.body.classList.add('hn-christmas-colors');
    }
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyChristmasColors);
} else {
  applyChristmasColors();
}
