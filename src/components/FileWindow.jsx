import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useWindows } from '@/store/WindowsContext';
import { useDragResize } from '@/hooks/useDragResize';
import { getFileIconPath } from '@/utils/imagePath';
import folderIcon from '@/assets/win95Icons/folder.png';
import './FileWindow.css';

export default function FileWindow({
  nameOfWindow,
  folderContent = [],
  folderSize = 0,
  style: externalStyle,
}) {
  const windowsStore = useWindows();
  const win = windowsStore.getWindowById(nameOfWindow);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [tempPosition, setTempPosition] = useState({ x: 0, y: 0 });
  const [selectedSize, setSelectedSize] = useState(folderSize);
  const positionRef = useRef(position);
  const fileExplorerRef = useRef(null);

  const files = folderContent;

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
    windowsStore.setWindowState({ windowState: 'minimize', windowId: win.windowId });
  }, [windowsStore, win]);

  const closeWindow = useCallback(() => {
    windowsStore.setWindowState({ windowState: 'close', windowId: win.windowId });
  }, [windowsStore, win]);

  const convertBytesToMegabytes = (bytes) => {
    if (bytes !== 0) {
      return (bytes / 1000000).toFixed(2) + 'MB';
    }
    return '';
  };

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const openFileWindow = useCallback(
    (file) => {
      if (file.type === 'folder') {
        const windowId = 'FolderWindow' + getRndInteger(1, 1000000);
        const addWindowPayload = {
          windowId,
          windowState: 'close',
          displayName: file.title,
          windowComponent: 'FilesWindow',
          windowContent: '',
          windowContentPadding: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
          position: 'absolute',
          positionX: getRndInteger(1, 10) + 'vw',
          positionY: getRndInteger(1, 25) + 'vh',
          iconImage: 'folder.png',
          altText: file.title,
          fullscreen: false,
          showInAppGrid: false,
          showInNavbar: true,
          folderContent: file.content,
          folderSize: file.size,
        };
        windowsStore.pushNewWindow(addWindowPayload);
        windowsStore.setWindowState({ windowState: 'open', windowId });
      } else if (file.type === 'video') {
        // Skip videos
      } else {
        // Photo or file → open in ImagePreviewWindow
        const contentPayload = files.slice(files.indexOf(file));
        contentPayload.push(...files.slice(0, files.indexOf(file)));
        windowsStore.setWindowState({ windowState: 'close', windowId: 'ImagePreviewWindow' });
        setTimeout(() => {
          windowsStore.setPhotoFolderContent(contentPayload);
          windowsStore.setWindowState({ windowState: 'open', windowId: 'ImagePreviewWindow' });
        });
      }
    },
    [windowsStore, files]
  );

  const getFileTypeIcon = (type) => {
    switch (type) {
      case 'photo':
        return getFileIconPath('image.png');
      case 'folder':
        return getFileIconPath('folder.png');
      case 'file':
        return getFileIconPath('file.png');
      case 'video':
        return getFileIconPath('video.png');
      default:
        return getFileIconPath('file.png');
    }
  };

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
    windowsStore.activeWindow === win.windowId ? 'top-bar' : 'top-bar-deactivated';

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
      <div
        data-topbar="true"
        className={`top-bar-window ${topBarClass}`}
        onDoubleClick={toggleWindowSize}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="window-name">
          <img className="icon-image" src={folderIcon} alt={win.altText} />
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
      <div className="fw-content">
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
        </div>
        <div
          className="file-explorer"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedSize(folderSize);
          }}
          ref={fileExplorerRef}
        >
          <nav className="grid-container-photos">
            {files.map((file) => (
              <li key={file.id}>
                <button
                  className="icon-photos"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(file.size);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    openFileWindow(file);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    openFileWindow(file);
                  }}
                >
                  <img
                    className="icon-image-photos"
                    src={getFileTypeIcon(file.type)}
                    alt={file.altText}
                  />
                  <div className="fw-border-box">
                    <p className="fw-icon-text">{file.title}</p>
                  </div>
                </button>
              </li>
            ))}
          </nav>
        </div>
        <div className="bottom-bar">
          <div className="left-bar bar">{files.length} object(s)</div>
          <div className="right-bar bar">{convertBytesToMegabytes(selectedSize)}</div>
        </div>
      </div>
    </div>
  );
}
