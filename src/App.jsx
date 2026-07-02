import React, { useEffect, useCallback } from 'react';
import { useWindows } from '@/store/WindowsContext';
import Window from '@/components/Window';
import FileWindow from '@/components/FileWindow';
import ImagePreviewWindow from '@/components/ImagePreviewWindow';
import Navbar from '@/components/Navbar';
import AppGrid from '@/components/AppGrid';
import StartMenu from '@/components/StartMenu';
import Bio from '@/views/Bio';
import Resume from '@/views/Resume';

const WINDOW_COMPONENTS = {
  window: Window,
  ImagePreviewWindow: ImagePreviewWindow,
  FilesWindow: FileWindow,
};

const SLOT_VIEWS = {
  bio: Bio,
  resume: Resume,
};

export default function App() {
  const windowsStore = useWindows();

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const navbarHeight = navbar.clientHeight;
      const screen = document.getElementById('screen');
      if (screen) {
        screen.style.height = window.innerHeight - navbarHeight + 'px';
      }
    }

    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const deinitWindows = useCallback(() => {
    if (windowsStore.activeWindow === 'Menu') {
      windowsStore.setActiveWindow('');
      windowsStore.zIndexIncrement('');
    }
  }, [windowsStore]);

  return (
    <div id="app">
      <div className="screen" id="screen" onClick={deinitWindows}>
        {windowsStore.windows.map((win) => {
          if (win.windowState !== 'open') return null;

          const WindowComp = WINDOW_COMPONENTS[win.windowComponent];
          if (!WindowComp) return null;

          const windowStyle = {
            position: win.position,
            left: win.positionX,
            top: win.positionY,
          };

          const ContentComp = win.windowContent ? SLOT_VIEWS[win.windowContent] : null;

          return (
            <div key={win.windowId} aria-label={win.displayName}>
              <WindowComp
                nameOfWindow={win.windowId}
                style={windowStyle}
                folderContent={win.folderContent}
                folderSize={win.folderSize}
              >
                {ContentComp && <ContentComp />}
              </WindowComp>
            </div>
          );
        })}
        <AppGrid />
      </div>
      {windowsStore.activeWindow === 'Menu' && (
        <div style={{ position: 'absolute', zIndex: 9999, left: 0, bottom: '36px' }}>
          <StartMenu />
        </div>
      )}
      <Navbar />
    </div>
  );
}
