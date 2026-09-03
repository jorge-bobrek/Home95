import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useWindows } from '@/store/WindowsContext';
import { getIconPath } from '@/utils/imagePath';
import { useDragResize } from '@/hooks/useDragResize';
import TopBar from '@/components/TopBar';
import xpWindowsLogo from '@/assets/win95Icons/xp-windows-logo.png';
import './ImagePreviewWindow.css';

export default function ImagePreviewWindow({ nameOfWindow, style: externalStyle }) {
  const windowsStore = useWindows();
  const win = windowsStore.getWindowById(nameOfWindow);
  const file = windowsStore.photoFolderContent[0] || {};

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [tempPosition, setTempPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef(position);

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

  return (
    <div
      id={win.windowId}
      style={computedStyle}
      className={windowClasses}
      onClick={handleSetActive}
      onMouseDown={handleResizeStart}
      onMouseMove={updateCursor}
      onTouchStart={handleResizeStart}
    >
      <TopBar
        windowId={win.windowId}
        displayName={file.title || win.displayName}
        iconImage={win.iconImage}
        altText={win.altText}
        onMinimize={minimizeWindow}
        onMaximize={toggleWindowSize}
        onClose={closeWindow}
        onDragStart={handleDragStart}
      />
      <div className="ipw-content">
        <div className="top-bar-nav">
          <div className="top-bar-text">
            <span style={{ marginRight: '12px' }}>
              <u>F</u>ile{' '}
            </span>
            <span style={{ marginRight: '12px' }}>
              <u>E</u>dit{' '}
            </span>
            <span style={{ marginRight: '12px' }}>
              <u>V</u>iew{' '}
            </span>
            <span style={{ marginRight: '12px' }}>
              <u>H</u>elp{' '}
            </span>
          </div>
          {windowsStore.theme === 'winXP' && (
            <div className="fw-winlogo-box">
              <img className="fw-winlogo" src={xpWindowsLogo} alt="Windows" />
            </div>
          )}
        </div>

        {file.type === 'file' ? (
          <div className="ipw-file-explorer">
            <iframe
              className="ipw-responsive-iframe"
              src={file.content?.src}
              title={file.title}
            />
          </div>
        ) : (
          <div className="ipw-file-explorer">
            <div className="ipw-grid-container-photos">
              <img src={file.src} alt={file.title} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
