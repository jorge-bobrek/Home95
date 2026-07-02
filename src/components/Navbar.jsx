import React, { useState, useEffect, useCallback } from 'react';
import { useWindows } from '@/store/WindowsContext';
import { getIconPath } from '@/utils/imagePath';
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
          <img className="start-icon" src={win95Logo} alt="Start" />
          <span style={{ paddingLeft: '4px', fontSize: '0.9rem', fontWeight: 'bold', color: 'black', display: 'flex', alignItems: 'center' }}>
            Start
          </span>
        </div>
      </button>
      <div className="nav-overflow-scroll nav-flex no-scrollbar">
        {windowsStore.activeWindows.map((win) => {
          const isActive = windowsStore.activeWindow === win.windowId;
          const isVisible =
            win.windowState === 'open' || win.windowState === 'minimize';

          if (!isVisible) return null;

          return (
            <div key={win.windowId}>
              <button
                className={isActive ? 'navbar-item-depressed' : 'navbar-item open'}
                onClick={() => openWindow(win.windowId)}
              >
                <img
                  className="nav-icon-image"
                  src={getIconPath(win.iconImage)}
                  alt={win.altText}
                />
                <p className="nav-item-text">{win.displayName}</p>
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
