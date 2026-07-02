import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useWindows } from '@/store/WindowsContext';
import { getIconPath } from '@/utils/imagePath';
import { useDragResize } from '@/hooks/useDragResize';
import './Window.css';

export default function Window({ nameOfWindow, children, style: externalStyle }) {
  const windowsStore = useWindows();
  const win = windowsStore.getWindowById(nameOfWindow);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [tempPosition, setTempPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef(position);

  // Keep ref in sync
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const handleSetActive = useCallback(() => {
    windowsStore.setActiveWindow(win.windowId);
    windowsStore.zIndexIncrement(win.windowId);
  }, [windowsStore, win]);

  const { handleDragStart, handleResizeStart, updateCursor } = useDragResize({
    positionRef,
    setPosition,
    setSize,
    onDragStart: handleSetActive,
    windowId: win.windowId,
    isFullscreen: win.fullscreen,
  });

  const toggleWindowSize = useCallback(() => {
    if (windowsStore.getWindowFullscreen(win.windowId)) {
      windowsStore.setFullscreen({ fullscreen: false, windowId: win.windowId });
      setPosition({ x: tempPosition.x, y: tempPosition.y });
    } else {
      windowsStore.setFullscreen({ fullscreen: true, windowId: win.windowId });
      setTempPosition({ x: position.x, y: position.y });
      setPosition({ x: 0, y: 0 });
    }
  }, [windowsStore, win, tempPosition, position]);

  const minimizeWindow = useCallback(() => {
    windowsStore.setActiveWindow('');
    windowsStore.setWindowState({ windowState: 'minimize', windowId: win.windowId });
  }, [windowsStore, win]);

  const closeWindow = useCallback(() => {
    windowsStore.setWindowState({ windowState: 'close', windowId: win.windowId });
  }, [windowsStore, win]);

  if (!win) return null;

  const computedStyle = win.fullscreen
    ? {}
    : {
        ...externalStyle,
        transform: `translate(${position.x}px, ${position.y}px)`,
        ...(size.width > 0 ? { width: `${size.width}px` } : {}),
        ...(size.height > 0 ? { height: `${size.height}px` } : {}),
      };

  const windowClasses = [
    'window',
    'window-style',
    win.fullscreen === true ? 'win-fullscreen' : '',
    win.windowState === 'minimize' ? 'minimize' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const topBarClass =
    windowsStore.activeWindow === win.windowId
      ? 'top-bar'
      : 'top-bar-deactivated';

  return (
    <div
      id={win.windowId}
      style={computedStyle}
      className={windowClasses}
      onClick={handleSetActive}
      onMouseDown={(e) => {
        handleResizeStart(e);
      }}
      onMouseMove={updateCursor}
      onTouchStart={(e) => {
        handleResizeStart(e);
      }}
    >
      <div
        data-topbar="true"
        className={`top-bar-window ${topBarClass}`}
        onDoubleClick={toggleWindowSize}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="window-name">
          <img
            className="icon-image"
            src={getIconPath(win.iconImage)}
            alt={win.altText}
          />
          {win.displayName}
        </div>
        <div className="triple-button">
          <button className="minimize-button button" onClick={minimizeWindow}>
            <svg width="6" height="2" viewBox="0 0 6 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="6" height="2" fill="black"/>
            </svg>
          </button>
          <button className="expand-button button" onClick={toggleWindowSize}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0h9v2H0V0zm0 2h9v7H0V2zm1 1h7v5H1V3z" fill="black"/>
            </svg>
          </button>
          <button className="close-button button" onClick={closeWindow}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1l6 6M7 1L1 7" stroke="black" stroke-width="2" stroke-linecap="square"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}
