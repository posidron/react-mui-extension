# Chrome Extension Boilerplate with React and Material-UI

A modern Chrome extension boilerplate using React 18, Material-UI, and Vite. Includes examples of popup, tab, and sidebar implementations.

## Features

- 🚀 Built with Vite for fast development and building
- ⚛️ React 18 with latest features
- 🎨 Material-UI for ready-to-use components
- 📦 Three different extension views:
  - Popup (clicks on extension icon)
  - Tab (opens in new tab)
  - Sidebar (side panel view)
- 🛠 Context menu integration
- 🔄 Hot Module Replacement in development

## Project Structure

```
my-extension/
├── package.json
├── vite.config.js
├── scripts/
│   └── build.js
├── public/
│   ├── manifest.json
│   ├── background.js
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── src/
    ├── pages/
    │   ├── popup/
    │   │   ├── index.html
    │   │   └── Popup.jsx
    │   ├── tab/
    │   │   ├── index.html
    │   │   └── Tab.jsx
    │   └── sidebar/
    │       ├── index.html
    │       └── Sidebar.jsx
    ├── components/
    └── theme.js
```

## Setup

1. Create a new Vite project:
```bash
npm create vite@latest my-extension -- --template react
cd my-extension
```

2. Install dependencies:
```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

3. Install development dependencies:
```bash
npm install -D @vitejs/plugin-react
```

4. Create necessary directories:
```bash
mkdir -p src/pages/{popup,tab,sidebar} public scripts
```

## Configuration Files

### vite.config.js
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    copyPublicDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/pages/popup/index.html'),
        tab: resolve(__dirname, 'src/pages/tab/index.html'),
        sidebar: resolve(__dirname, 'src/pages/sidebar/index.html')
      }
    }
  }
});
```

### scripts/build.js
```javascript
import { rename } from "fs/promises";
import { join } from "path";

async function postBuild() {
  const dist = "dist";

  // Rename the HTML files to match manifest.json expectations
  await rename(
    join(dist, "src/pages/popup/index.html"),
    join(dist, "popup.html")
  );
  await rename(join(dist, "src/pages/tab/index.html"), join(dist, "tab.html"));
  await rename(
    join(dist, "src/pages/sidebar/index.html"),
    join(dist, "sidebar.html")
  );
}

postBuild().catch(console.error);
```

### public/manifest.json
```json
{
  "manifest_version": 3,
  "name": "React Chrome Extension",
  "version": "1.0.0",
  "description": "Chrome extension with popup, tab, and sidebar examples",
  "permissions": [
    "storage",
    "tabs",
    "bookmarks",
    "sidePanel",
    "contextMenus"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  },
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "chrome_url_overrides": {
    "newtab": "tab.html"
  },
  "side_panel": {
    "default_path": "sidebar.html"
  },
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  }
}
```

### public/background.js
```javascript
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openTab",
    title: "Open in New Tab",
    contexts: ["action"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "openTab") {
    chrome.tabs.create({ url: "tab.html" });
  }
});
```

## View Implementations

### Popup View (src/pages/popup/Popup.jsx)
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../theme';
import { Box, Typography } from '@mui/material';

function Popup() {
  return (
    <Box sx={{ width: 350, height: 500, p: 2 }}>
      <Typography variant="h6">Recent Bookmarks</Typography>
      {/* Add your popup content here */}
    </Box>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Popup />
    </ThemeProvider>
  </React.StrictMode>
);
```

### Tab View (src/pages/tab/Tab.jsx)
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../theme';
import { Container, Typography, Grid } from '@mui/material';

function Tab() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tab View
      </Typography>
      <Grid container spacing={3}>
        {/* Add your tab content here */}
      </Grid>
    </Container>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Tab />
    </ThemeProvider>
  </React.StrictMode>
);
```

### Sidebar View (src/pages/sidebar/Sidebar.jsx)
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../theme';
import { Box, Typography } from '@mui/material';

function Sidebar() {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h6">Sidebar View</Typography>
      {/* Add your sidebar content here */}
    </Box>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar />
    </ThemeProvider>
  </React.StrictMode>
);
```

### HTML Entry Points
Each view needs its own HTML entry point. Create these files in their respective directories:

src/pages/popup/index.html:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Extension Popup</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./Popup.jsx"></script>
  </body>
</html>
```

Create similar index.html files for tab and sidebar views, changing only the title and script source accordingly.

## Tab Page Configuration Options

### New Tab Override (current setup)
The current setup overrides Chrome's new tab page. This is configured in manifest.json with:
```json
{
  "chrome_url_overrides": {
    "newtab": "tab.html"
  }
}
```

### Regular Tab Page (alternative)
If you don't want to override the new tab page and just want to open your page in a regular tab:

1. Remove the `chrome_url_overrides` section from manifest.json
2. The tab page will only open when:
   - Using the context menu (right-click extension icon)
   - Programmatically via Chrome API

## Development

1. Start the development server:
```bash
npm run dev
```

2. Build the extension:
```bash
npm run build
```

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder from your project

4. After making changes:
   - Run `npm run build`
   - Click the refresh icon in `chrome://extensions/`

## Accessing Different Views

1. Popup:
   - Click the extension icon in the toolbar

2. Tab:
   - Right-click the extension icon and select "Open in New Tab", or
   - Open a new tab (if using new tab override)

3. Sidebar:
   - Click the sidebar icon in the toolbar (if available in your Chrome version)
   - Or use the keyboard shortcut (varies by OS)

## Chrome APIs Used

The boilerplate demonstrates usage of several Chrome APIs:
- `chrome.tabs` - Managing browser tabs
- `chrome.storage` - Storing and retrieving data
- `chrome.sidePanel` - Managing the sidebar panel
- `chrome.contextMenus` - Creating context menu items

## Notes

- All static files (manifest.json, background.js, icons) should be placed in the public folder
- The build script automatically handles file renaming and organization
- The extension uses Material-UI's theming system for consistent styling
- Hot Module Replacement (HMR) works in development mode
- Content scripts can be added to the public folder if needed

## Best Practices

1. Keep background scripts simple and in the public folder
2. Use Material-UI's `container` prop for portals in popups
3. Test the extension in different contexts (popup, tab, sidebar)
4. Follow Chrome's security guidelines
5. Use Chrome's storage API instead of localStorage

## Debugging

- Popup: Right-click extension icon → Inspect popup
- Tab/Sidebar: Regular Chrome DevTools
- Background: Check service worker console in `chrome://extensions/`
