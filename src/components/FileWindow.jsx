import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useWindows } from '@/store/WindowsContext';
import { useDragResize } from '@/hooks/useDragResize';
import { getFileIconPath } from '@/utils/imagePath';
import TopBar from '@/components/TopBar';
import folderIcon from '@/assets/win95Icons/folder.png';
import xpBack from '@/assets/win95Icons/xp-back.png';
import xpForward from '@/assets/win95Icons/xp-forward.png';
import xpUp from '@/assets/win95Icons/xp-up.png';
import xpSearch from '@/assets/win95Icons/xp-search.png';
import xpFolders from '@/assets/win95Icons/xp-folders.png';
import xpViews from '@/assets/win95Icons/xp-views.png';
import xpWindowsLogo from '@/assets/win95Icons/xp-windows-logo.png';
import xpPullup from '@/assets/win95Icons/xp-pullup.png';
import xpDropdown from '@/assets/win95Icons/xp-dropdown.png';
import './FileWindow.css';

export default function FileWindow({
  nameOfWindow,
  style: externalStyle,
  folderContent,
  folderSize,
}) {
  const windowsStore = useWindows();
  const win = windowsStore.getWindowById(nameOfWindow);
  const isXP = windowsStore.theme === 'winXP';

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

  const files = folderContent || [];
  const totalSize = folderSize || '0.30MB';

  const handleFileClick = useCallback(
    (file) => {
      if (file.type === 'folder') {
        const windowId = `${file.title}Window`;
        const addWindowPayload = {
          windowId,
          windowState: 'open',
          displayName: file.title,
          windowComponent: 'FilesWindow',
          windowContent: '',
          windowContentPadding: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
          position: 'absolute',
          positionX: '8vw',
          positionY: '10vh',
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
        return getFileIconPath('image.png', windowsStore.theme);
      case 'folder':
        return getFileIconPath('folder.png', windowsStore.theme);
      case 'file':
        return getFileIconPath('file.png', windowsStore.theme);
      case 'video':
        return getFileIconPath('video.png', windowsStore.theme);
      default:
        return getFileIconPath('file.png', windowsStore.theme);
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
      {/* ── Title bar ── */}
      <TopBar
        windowId={win.windowId}
        displayName={win.displayName}
        customIcon={folderIcon}
        altText={win.altText}
        onMinimize={minimizeWindow}
        onMaximize={toggleWindowSize}
        onClose={closeWindow}
        onDragStart={handleDragStart}
      />

      <div className="fw-content">
        {/* ── Menu bar ── */}
        <div className="top-bar-nav">
          <div className="top-bar-text">
            <span style={{ marginRight: '12px' }}><u>F</u>ile </span>
            <span style={{ marginRight: '12px' }}><u>E</u>dit </span>
            <span style={{ marginRight: '12px' }}><u>V</u>iew </span>
            {isXP && <span style={{ marginRight: '12px' }}><u>F</u>avorites </span>}
            {isXP && <span style={{ marginRight: '12px' }}><u>T</u>ools </span>}
            <span style={{ marginRight: '12px' }}><u>H</u>elp </span>
          </div>
          {isXP && (
            <img className="fw-winlogo" src={xpWindowsLogo} alt="Windows" />
          )}
        </div>

        {/* ── Toolbar ── */}
        <div className="fw-toolbar">
          <button className="fw-toolbar-btn" disabled>
            <img src={xpBack} className="fw-toolbar-icon" alt="" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span className="fw-toolbar-btn-label">Back <span className="fw-btn-arrow">▾</span></span>
          </button>
          <button className="fw-toolbar-btn" disabled>
            <img src={xpForward} className="fw-toolbar-icon" alt="" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
            <span className="fw-toolbar-btn-label">Forward</span>
          </button>
          <button className="fw-toolbar-btn" disabled>
            <img src={xpUp} className="fw-toolbar-icon" alt="" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
            <span className="fw-toolbar-btn-label">Up</span>
          </button>
          <div className="fw-toolbar-separator" />
          <button className="fw-toolbar-btn" disabled>
            <img src={xpSearch} className="fw-toolbar-icon" alt="" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="fw-toolbar-btn-label">Search</span>
          </button>
          <button className="fw-toolbar-btn" disabled>
            <img src={xpFolders} className="fw-toolbar-icon" alt="" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="fw-toolbar-btn-label">Folders</span>
          </button>
          <div className="fw-toolbar-separator" />
          <button className="fw-toolbar-btn" disabled>
            <img src={xpViews} className="fw-toolbar-icon" alt="" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9"></rect>
              <rect x="14" y="3" width="7" height="5"></rect>
              <rect x="14" y="12" width="7" height="9"></rect>
              <rect x="3" y="16" width="7" height="5"></rect>
            </svg>
            <span className="fw-toolbar-btn-label">Views <span className="fw-btn-arrow">▾</span></span>
          </button>
        </div>

        {/* ── Address Bar (XP only) ── */}
        {isXP && (
          <div className="fw-address-bar">
            <span className="fw-address-label">Address</span>
            <div className="fw-address-field">
              <img src={folderIcon} className="fw-address-icon" alt="" />
              <span className="fw-address-text">{win.displayName}</span>
              <img src={xpDropdown} className="fw-address-drop-img" alt="" />
            </div>
            <button className="fw-address-go" disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a7a2a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <span>Go</span>
            </button>
          </div>
        )}

        {/* ── Main content area ── */}
        <div className="fw-main-area">
          {/* XP Left Task Panel */}
          {isXP && (
            <div className="fw-task-panel">
              <div className="fw-task-section">
                <div className="fw-task-header">
                  <span>File and Folder Tasks</span>
                  <img src={xpPullup} alt="" className="fw-task-arrow-img" />
                </div>
                <div className="fw-task-body">
                  <button className="fw-task-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#215dc6" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span>Make a new folder</span>
                  </button>
                  <button className="fw-task-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#215dc6" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                    </svg>
                    <span>Publish this folder to the Web</span>
                  </button>
                  <button className="fw-task-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#215dc6" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    <span>Share this folder</span>
                  </button>
                </div>
              </div>

              <div className="fw-task-section">
                <div className="fw-task-header">
                  <span>Other Places</span>
                  <img src={xpPullup} alt="" className="fw-task-arrow-img" />
                </div>
                <div className="fw-task-body">
                  <button className="fw-task-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#215dc6" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    <span>Desktop</span>
                  </button>
                  <button className="fw-task-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#215dc6" strokeWidth="2">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Shared Documents</span>
                  </button>
                  <button className="fw-task-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#215dc6" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    </svg>
                    <span>My Computer</span>
                  </button>
                  <button className="fw-task-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#215dc6" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>My Network Places</span>
                  </button>
                </div>
              </div>

              <div className="fw-task-section">
                <div className="fw-task-header">
                  <span>Details</span>
                  <img src={xpPullup} alt="" className="fw-task-arrow-img" />
                </div>
                <div className="fw-task-body fw-task-details">
                  <p className="fw-details-name">{win.displayName}</p>
                  <p className="fw-details-info">File Folder</p>
                  <p className="fw-details-info">{files.length} items</p>
                </div>
              </div>
            </div>
          )}

          {/* Explorer grid area */}
          <div className="fw-explorer-area">
            <div className="file-explorer">
              <div className="grid-container-photos">
                {files.map((file, i) => (
                  <button
                    key={`${file.title}-${i}`}
                    className="icon-photos"
                    onClick={() => handleFileClick(file)}
                  >
                    <div className="fw-border-box">
                      <img
                        className="icon-image-photos"
                        src={getFileTypeIcon(file.type)}
                        alt={file.title}
                      />
                      <div className="fw-icon-text">{file.title}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Status Bar ── */}
        <div className="status-bar">
          <div className="status-bar-object">{files.length} object(s)</div>
          <div className="status-bar-size">{totalSize}</div>
        </div>
      </div>
    </div>
  );
}
