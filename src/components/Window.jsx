import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useWindows } from '@/store/WindowsContext';
import { useDragResize } from '@/hooks/useDragResize';
import TopBar from '@/components/TopBar';
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
        displayName={win.displayName}
        iconImage={win.iconImage}
        altText={win.altText}
        onMinimize={minimizeWindow}
        onMaximize={toggleWindowSize}
        onClose={closeWindow}
        onDragStart={handleDragStart}
      />
      <div className="content">{children}</div>
    </div>
  );
}
