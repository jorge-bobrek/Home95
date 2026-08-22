import React, { useState, useEffect, useCallback } from 'react';
import { useWindows } from '@/store/WindowsContext';
import Window from '@/components/Window';
import FileWindow from '@/components/FileWindow';
import ImagePreviewWindow from '@/components/ImagePreviewWindow';
import Navbar from '@/components/Navbar';
import AppGrid from '@/components/AppGrid';
import StartMenu from '@/components/StartMenu';
import BootScreen from '@/components/BootScreen';
import Bio from '@/views/Bio';
import Resume from '@/views/Resume';
import DisplayProperties from '@/views/DisplayProperties';

const WINDOW_COMPONENTS = {
  window: Window,
  ImagePreviewWindow: ImagePreviewWindow,
  FilesWindow: FileWindow,
};

const SLOT_VIEWS = {
  bio: Bio,
  resume: Resume,
  displayProperties: DisplayProperties,
};

export default function App() {
  const windowsStore = useWindows();
  const [isBooting, setIsBooting] = useState(true);

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

  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const deinitWindows = useCallback(() => {
    if (windowsStore.activeWindow === 'Menu') {
      windowsStore.setActiveWindow('');
      windowsStore.zIndexIncrement('');
    }
    setContextMenu({ visible: false, x: 0, y: 0 });
  }, [windowsStore]);

  const handleContextMenu = useCallback((e) => {
    if (e.target.id === 'screen' || e.target.classList.contains('screen')) {
      e.preventDefault();
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY
      });
    }
  }, []);

  return (
    <div id="app" className={windowsStore.theme === 'winXP' ? 'theme-xp' : 'theme-95'}>
      {isBooting && <BootScreen onFinished={() => setIsBooting(false)} theme={windowsStore.theme} />}
      <div className="screen" id="screen" onClick={deinitWindows} onContextMenu={handleContextMenu}>
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
        
        {/* Custom Desktop Context Menu */}
        {contextMenu.visible && (
          <div
            className="context-menu"
            style={{
              position: 'absolute',
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`,
              zIndex: 999999
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="context-menu-item" onClick={() => {
              setContextMenu({ visible: false, x: 0, y: 0 });
            }}>
              <u>R</u>efresh
            </button>
            <div className="context-menu-divider" />
            <button className="context-menu-item" disabled>
              New Folder
            </button>
            <button className="context-menu-item" onClick={() => {
              windowsStore.setWindowState({ windowState: 'open', windowId: 'DisplayPropertiesWindow' });
              setContextMenu({ visible: false, x: 0, y: 0 });
            }}>
              <u>P</u>roperties
            </button>
          </div>
        )}
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
