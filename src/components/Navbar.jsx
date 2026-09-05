import React, { useState, useEffect, useCallback } from 'react';
import { useWindows } from '@/store/WindowsContext';
import { getIconPath, getFileIconPath } from '@/utils/imagePath';
import win95Logo from '@/assets/win95.png';
import speakersIcon from '@/assets/speakers.png';
import './Navbar.css';

export default function Navbar() {
  const windowsStore = useWindows();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWindow = useCallback(
    (windowId) => {
      windowsStore.setWindowState({ windowState: 'open', windowId });
    },
    [windowsStore]
  );

  const handleStartClick = useCallback(() => {
    windowsStore.setActiveWindow('Menu');
  }, [windowsStore]);

  const isMenuActive = windowsStore.activeWindow === 'Menu';

  return (
    <nav className="navbar-container" id="navbar">
      <button
        className={`start-menu ${isMenuActive ? 'start-menu-depressed' : ''}`}
        onClick={handleStartClick}
      >
        <div className={isMenuActive ? 'nav-border-box' : 'container-border'}>
          <svg className="start-icon" viewBox="0 0 24 24" width="16" height="16" stroke={windowsStore.theme === 'winXP' ? 'white' : 'black'} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: windowsStore.theme === 'winXP' ? '2px' : '4px' }}>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span style={windowsStore.theme === 'winXP' ? {
            paddingLeft: '6px',
            fontSize: '1.05rem',
            fontWeight: 'bold',
            color: 'white',
            display: 'flex',
            alignItems: 'center'
          } : {
            paddingLeft: '4px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            color: 'black',
            display: 'flex',
            alignItems: 'center'
          }}>
            {windowsStore.theme === 'winXP' ? 'start' : 'Start'}
          </span>
        </div>
      </button>
      <div className="nav-overflow-scroll nav-flex no-scrollbar">
        {windowsStore.activeWindows.map((win) => {
          const isActive = windowsStore.activeWindow === win.windowId;
          const isVisible =
            win.windowState === 'open' || win.windowState === 'minimize';

          if (!isVisible) return null;

          let displayName = win.displayName;
          let iconSrc = getIconPath(win.iconImage, windowsStore.theme);

          if (win.windowId === 'ImagePreviewWindow') {
            const rawContent = windowsStore.photoFolderContent;
            const photos = Array.isArray(rawContent) ? rawContent : (rawContent?.photos || []);
            const activeIdx = Array.isArray(rawContent) ? 0 : (rawContent?.activeIndex ?? 0);
            const activePhoto = photos[activeIdx] || photos[0];
            if (activePhoto?.title) {
              displayName = activePhoto.title;
            } else if (windowsStore.theme === 'winXP') {
              displayName = 'Windows Picture...';
            }
            iconSrc = getFileIconPath('image.png', windowsStore.theme) || iconSrc;
          }

          return (
            <div key={win.windowId}>
              <button
                className={isActive ? 'navbar-item-depressed' : 'navbar-item open'}
                onClick={() => openWindow(win.windowId)}
              >
                <img
                  className="nav-icon-image"
                  src={iconSrc}
                  alt={win.altText}
                />
                <p className="nav-item-text">{displayName}</p>
              </button>
            </div>
          );
        })}
      </div>
      <div className="spacer" />
      <div className="time">
        <img src={speakersIcon} className="nav-icon-image" alt="Volume" />
        <time>{time}</time>
      </div>
    </nav>
  );
}
