import React, { createContext, useContext, useReducer, useCallback } from 'react';

const INITIAL_WINDOWS = [
  {
    windowId: 'BiographyWindow',
    windowState: 'close',
    displayName: 'Biography',
    windowComponent: 'window',
    windowContent: 'bio',
    windowContentPadding: { top: null, right: null, bottom: null, left: null },
    position: 'absolute',
    positionX: '5vw',
    positionY: '5%',
    iconImage: 'bio.png',
    altText: 'Biography',
    fullscreen: false,
    showInAppGrid: true,
    showInNavbar: true,
  },
  {
    windowId: 'ResumeWindow',
    windowState: 'close',
    displayName: 'Résumé',
    windowComponent: 'window',
    windowContent: 'resume',
    windowContentPadding: { top: '0', right: '0', bottom: '0', left: '0' },
    position: 'absolute',
    positionX: '10vw',
    positionY: '15vh',
    iconImage: 'resume.png',
    altText: 'Résumé',
    fullscreen: false,
    showInAppGrid: true,
    showInNavbar: true,
  },
  {
    windowId: 'ImagePreviewWindow',
    windowState: 'close',
    displayName: 'Media Viewer',
    windowComponent: 'ImagePreviewWindow',
    windowContent: '',
    windowContentPadding: { top: '1px', right: '10px', bottom: '10px', left: '10px' },
    position: 'absolute',
    positionX: '6vw',
    positionY: '12vh',
    iconImage: 'file.png',
    altText: 'Photos',
    fullscreen: false,
    showInAppGrid: false,
    showInNavbar: false,
  },
  {
    windowId: 'PhotosWindow',
    windowState: 'close',
    displayName: 'Photos',
    windowComponent: 'FilesWindow',
    windowContent: '',
    windowContentPadding: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    position: 'absolute',
    positionX: '5vw',
    positionY: '10vh',
    iconImage: 'photos.png',
    altText: 'Photos',
    fullscreen: false,
    showInNavbar: true,
    folderContent: [
      {
        id: 0,
        title: 'IMG_6970.JPG',
        type: 'photo',
        src: '/files/IMG_6970.jpg',
        altText: 'IMG_6970.JPG',
        size: 554528,
      },
      {
        id: 1,
        title: 'IMG_143633.JPG',
        type: 'photo',
        src: '/files/IMG_101243.jpg',
        altText: 'IMG_143633.JPG',
        size: 323917,
      },
      {
        id: 2,
        title: 'IMG_143633.JPG',
        type: 'photo',
        src: '/files/IMG_143633.jpg',
        altText: 'IMG_143633.JPG',
        size: 665358,
      },
    ],
    folderSize: 300000,
  },
];

const initialState = {
  activeWindow: '',
  activeWindows: [],
  zIndex: 2,
  windows: INITIAL_WINDOWS,
  photoFolderContent: [],
};

function windowsReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_WINDOW':
      return { ...state, activeWindow: action.payload };

    case 'Z_INDEX_INCREMENT': {
      const newZIndex = state.zIndex + 1;
      const el = document.getElementById(action.payload);
      if (el) {
        el.style.zIndex = newZIndex;
      }
      return { ...state, zIndex: newZIndex };
    }

    case 'SET_FULLSCREEN': {
      const { windowId, fullscreen } = action.payload;
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.windowId === windowId ? { ...w, fullscreen } : w
        ),
      };
    }

    case 'SET_WINDOW_STATE': {
      const { windowState, windowId } = action.payload;
      const win = state.windows.find((w) => w.windowId === windowId);
      if (!win) return state;

      let newWindows = [...state.windows];
      let newActiveWindows = [...state.activeWindows];
      let newActiveWindow = state.activeWindow;
      let newZIndex = state.zIndex;

      const preventAppend =
        win.windowState === 'open' || win.windowState === 'minimize';

      if (windowState === 'open') {
        newWindows = newWindows.map((w) =>
          w.windowId === windowId ? { ...w, windowState: 'open' } : w
        );
        newZIndex = state.zIndex + 1;
        setTimeout(() => {
          const el = document.getElementById(windowId);
          if (el) el.style.zIndex = newZIndex;
        }, 0);
        newActiveWindow = windowId;
        if (!preventAppend) {
          const updatedWin = { ...win, windowState: 'open' };
          newActiveWindows = [...newActiveWindows, updatedWin];
        } else {
          newActiveWindows = newActiveWindows.map((w) =>
            w.windowId === windowId ? { ...w, windowState: 'open' } : w
          );
        }
      } else if (windowState === 'close') {
        newWindows = newWindows.map((w) =>
          w.windowId === windowId ? { ...w, windowState: 'close' } : w
        );
        newActiveWindows = newActiveWindows.filter(
          (w) => w.windowId !== windowId
        );
        newActiveWindow = 'nil';
      } else if (windowState === 'minimize') {
        newWindows = newWindows.map((w) =>
          w.windowId === windowId ? { ...w, windowState: 'minimize' } : w
        );
        newActiveWindows = newActiveWindows.map((w) =>
          w.windowId === windowId ? { ...w, windowState: 'minimize' } : w
        );
        newActiveWindow = 'nil';
      }

      return {
        ...state,
        windows: newWindows,
        activeWindows: newActiveWindows,
        activeWindow: newActiveWindow,
        zIndex: newZIndex,
      };
    }

    case 'PUSH_NEW_WINDOW':
      return {
        ...state,
        windows: [...state.windows, action.payload],
      };

    case 'SET_PHOTO_FOLDER_CONTENT':
      return { ...state, photoFolderContent: action.payload };

    default:
      return state;
  }
}

const WindowsContext = createContext(null);

export function WindowsProvider({ children }) {
  const [state, dispatch] = useReducer(windowsReducer, initialState);

  const getWindowById = useCallback(
    (windowId) => state.windows.find((w) => w.windowId === windowId),
    [state.windows]
  );

  const getWindowFullscreen = useCallback(
    (windowId) => {
      const win = state.windows.find((w) => w.windowId === windowId);
      return win ? win.fullscreen : false;
    },
    [state.windows]
  );

  const getFullscreenWindowHeight = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight + 'px';
    }
    return '0px';
  }, []);

  const setActiveWindow = useCallback(
    (windowId) => dispatch({ type: 'SET_ACTIVE_WINDOW', payload: windowId }),
    []
  );

  const zIndexIncrement = useCallback(
    (windowId) => dispatch({ type: 'Z_INDEX_INCREMENT', payload: windowId }),
    []
  );

  const setFullscreen = useCallback(
    (payload) => dispatch({ type: 'SET_FULLSCREEN', payload }),
    []
  );

  const setWindowState = useCallback(
    (payload) => dispatch({ type: 'SET_WINDOW_STATE', payload }),
    []
  );

  const pushNewWindow = useCallback(
    (win) => dispatch({ type: 'PUSH_NEW_WINDOW', payload: win }),
    []
  );

  const setPhotoFolderContent = useCallback(
    (content) => dispatch({ type: 'SET_PHOTO_FOLDER_CONTENT', payload: content }),
    []
  );

  const value = {
    ...state,
    getWindowById,
    getWindowFullscreen,
    getFullscreenWindowHeight,
    setActiveWindow,
    zIndexIncrement,
    setFullscreen,
    setWindowState,
    pushNewWindow,
    setPhotoFolderContent,
  };

  return (
    <WindowsContext.Provider value={value}>{children}</WindowsContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowsContext);
  if (!context) {
    throw new Error('useWindows must be used within a WindowsProvider');
  }
  return context;
}
