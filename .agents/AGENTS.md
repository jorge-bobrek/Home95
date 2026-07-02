# Home95 AI Agent Guidelines

Welcome to the **Home95** personal portfolio codebase! This project is a personal portfolio styled after the classic **Windows 95** desktop environment.

## Technology Stack

- **Framework**: Vite + React (v19)
- **State Management**: React Context + `useReducer` via `src/store/WindowsContext.jsx`
- **Styling**: Vanilla CSS (pure, standard CSS files mapped to components). Tailwind CSS is **not** used.
- **Window Drag/Resize**: Native mouse and touch event-based hook (`src/hooks/useDragResize.js`). No external libraries (like `interactjs`) are used.
- **Time/Clock**: Native JavaScript `Intl.DateTimeFormat` (no `moment.js`).

---

## Workspace Structure

```
src/
├── App.jsx                    # Root layout orchestrating screen, taskbar, start menu, and windows
├── main.jsx                   # React application entry point
├── index.css                  # Global styles, typography, cursors, scrollbars, and Windows 95 themes
├── store/
│   └── WindowsContext.jsx     # Centralized state reducer for window states, active tracking, and z-indexes
├── hooks/
│   └── useDragResize.js       # Native drag & resize logic supporting mouse + touch events
├── utils/
│   └── imagePath.js           # Icon resolver helpers mapping asset files dynamically
├── components/                # Modular desktop components (AppGrid, Navbar, StartMenu, Window variants)
└── views/                     # Main content views loaded inside generic windows (Bio, Resume)
```

---

## Architectural Patterns & Conventions

### 1. Adding a New Window / Application
To add a new window or desktop icon, follow these steps:
1. **Define the Window Meta**: In `src/store/WindowsContext.jsx`, append a new config object to the `INITIAL_WINDOWS` array:
   ```javascript
   {
     windowId: 'MyNewWindow',
     windowState: 'close', // starts closed
     displayName: 'App Name',
     windowComponent: 'window', // generic Window, FilesWindow, or ImagePreviewWindow
     windowContent: 'myNewView', // target key for SLOT_VIEWS in App.jsx
     windowContentPadding: { top: '5px', right: '5px', bottom: '5px', left: '5px' },
     position: 'absolute',
     positionX: '15vw',
     positionY: '20vh',
     iconImage: 'my-icon.png', // stored in src/assets/win95Icons/
     altText: 'App Name Icon',
     fullscreen: false,
     showInAppGrid: true, // shows as desktop shortcut
     showInNavbar: true,  // shows on taskbar when open/minimized
   }
   ```
2. **Create the View Component**: Create your content view inside `src/views/` (e.g., `MyNewView.jsx` and `MyNewView.css`).
3. **Register the View**: Import and map it in `src/App.jsx` under `SLOT_VIEWS`:
   ```javascript
   import MyNewView from '@/views/MyNewView';
   // ...
   const SLOT_VIEWS = {
     bio: Bio,
     resume: Resume,
     myNewView: MyNewView,
   };
   ```

### 2. Window Controls & Icon Assets
- Window control buttons (minimize, maximize, close) inside `Window.jsx`, `FileWindow.jsx`, and `ImagePreviewWindow.jsx` use inline, coordinate-aligned SVGs.
- Do not use text symbols (e.g. `×` or `-`) or raw character strings for window controls as line heights vary across OS and platforms.
- Obsolete or unused images must be actively removed from the codebase to keep the production bundle size optimal.

### 3. Drag and Resize Hook Rules (`useDragResize.js`)
- Dragging is handled via custom `mousedown` / `touchstart` listeners on elements with the `data-topbar` attribute.
- Drag and resize operations are automatically bypassed when the target window's `win.fullscreen` state is `true` or when the width is restricted on mobile devices.
- On mobile layouts (screen width <= 600px), window positioning defaults to the top-left of the viewport with `width: 100vw !important` and `transform` translations are only applied during user dragging.

### 4. Layout & Flexbox Overflow Rules
- The main desk wrapper `.screen` has overflow hidden.
- Windows must have fixed container heights or flex bounds (e.g. `.window-style` uses `height: 80vh; overflow: hidden;` instead of `min-height`).
- Sub-components that display lists or grids (like `.fw-content` or `.ipw-content`) must use `overflow: hidden` to avoid creating double vertical scrollbars on the grey container borders.
- Only internal explorer frames (`.file-explorer` or `.content`) are permitted to have `overflow-y: auto`.
