import React, { useState, useEffect, useCallback } from 'react';
import { useWindows } from '@/store/WindowsContext';
import { getIconPath } from '@/utils/imagePath';
import fileIconImg from '@/assets/FileWindow/file.png';
import './AppGrid.css';

export default function AppGrid() {
  const windowsStore = useWindows();
  const [gridHeight, setGridHeight] = useState('');

  useEffect(() => {
    const h = windowsStore.getFullscreenWindowHeight();
    const numericH = parseInt(h, 10);
    setGridHeight(numericH - 60 + 'px');
  }, [windowsStore]);

  const openWindow = useCallback(
    (windowId) => {
      windowsStore.setWindowState({ windowState: 'open', windowId });
    },
    [windowsStore]
  );

  const openHelloHand = useCallback(() => {
    window.open('//hellohand.bobrek.dev');
  }, []);

  return (
    <nav className="grid-container" style={{ height: gridHeight }}>
      <li>
        <button
          className="icon"
          onTouchStart={openHelloHand}
          onDoubleClick={openHelloHand}
        >
          <img className="ag-icon-image" src={fileIconImg} alt="hellohand" />
          <div className="ag-border-box">
            <p className="ag-icon-text">HelloHand</p>
          </div>
        </button>
      </li>
      {windowsStore.windows
        .filter((w) => w.showInAppGrid !== false)
        .map((win) => (
          <li key={win.windowId}>
            <button
              className="icon"
              onTouchStart={() => openWindow(win.windowId)}
              onDoubleClick={() => openWindow(win.windowId)}
            >
              <img
                className="ag-icon-image"
                src={getIconPath(win.iconImage, windowsStore.theme)}
                alt={win.altText}
              />
              <div className="ag-border-box">
                <p className="ag-icon-text">{win.displayName}</p>
              </div>
            </button>
          </li>
        ))}
    </nav>
  );
}
