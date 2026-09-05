import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useWindows } from '@/store/WindowsContext';
import { getFileIconPath } from '@/utils/imagePath';
import { useDragResize } from '@/hooks/useDragResize';
import TopBar from '@/components/TopBar';

import {
  IconPrev,
  IconNext,
  IconBestFit,
  IconActualSize,
  IconSlideshow,
  IconZoomIn,
  IconZoomOut,
  IconRotateCCW,
  IconRotateCW,
  IconDelete,
  IconPrint,
  IconSave,
  IconEdit,
  IconHelp,
} from './ViewerIcons';

import './ImagePreviewWindow.css';

export default function ImagePreviewWindow({ nameOfWindow, style: externalStyle }) {
  const windowsStore = useWindows();
  const win = windowsStore.getWindowById(nameOfWindow);

  // Normalize photoFolderContent payload (supports { photos, activeIndex } or raw array)
  const rawContent = windowsStore.photoFolderContent;
  const photos = Array.isArray(rawContent)
    ? rawContent
    : (rawContent?.photos || []);
  const initialIndex = Array.isArray(rawContent)
    ? 0
    : (rawContent?.activeIndex ?? 0);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isActualSize, setIsActualSize] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [slideshowPlaying, setSlideshowPlaying] = useState(true);

  // Reset transforms when active image or photos list changes
  useEffect(() => {
    if (typeof rawContent?.activeIndex === 'number') {
      setCurrentIndex(rawContent.activeIndex);
    } else {
      setCurrentIndex(0);
    }
    setScale(1);
    setRotation(0);
    setPan({ x: 0, y: 0 });
    setIsActualSize(false);
  }, [rawContent]);

  const file = photos[currentIndex] || photos[0] || {};
  const hasMultiplePhotos = photos.length > 1;

  // Window positioning & dragging
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
    setIsSlideshow(false);
    windowsStore.setWindowState({ windowState: 'close', windowId: win.windowId });
  }, [windowsStore, win]);

  // Image actions
  const handlePrev = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setScale(1);
    setRotation(0);
    setPan({ x: 0, y: 0 });
    setIsActualSize(false);
  }, [photos.length]);

  const handleNext = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setScale(1);
    setRotation(0);
    setPan({ x: 0, y: 0 });
    setIsActualSize(false);
  }, [photos.length]);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev * 1.3, 6));
    setIsActualSize(false);
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const next = prev / 1.3;
      if (next <= 1.05) {
        setPan({ x: 0, y: 0 });
        return 1;
      }
      return Math.max(next, 0.2);
    });
    setIsActualSize(false);
  }, []);

  const handleBestFit = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setIsActualSize(false);
  }, []);

  const handleActualSize = useCallback(() => {
    setIsActualSize((prev) => {
      if (prev) {
        setScale(1);
        setPan({ x: 0, y: 0 });
        return false;
      } else {
        setScale(1);
        return true;
      }
    });
  }, []);

  const handleRotateCW = useCallback(() => {
    setRotation((prev) => prev + 90);
  }, []);

  const handleRotateCCW = useCallback(() => {
    setRotation((prev) => prev - 90);
  }, []);

  const handlePrint = useCallback(() => {
    if (!file.src) return;
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(`
        <html>
          <head>
            <title>${file.title || 'Print Image'}</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
              img { max-width: 100%; max-height: 100vh; object-fit: contain; }
            </style>
          </head>
          <body>
            <img src="${file.src}" onload="window.print();window.close();" />
          </body>
        </html>
      `);
      printWin.document.close();
    }
  }, [file]);

  const handleSave = useCallback(() => {
    if (!file.src) return;
    const link = document.createElement('a');
    link.href = file.src;
    link.download = file.title || 'photo.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [file]);

  const handleEdit = useCallback(() => {
    if (file.src) {
      window.open(file.src, '_blank');
    }
  }, [file]);

  const handleHelp = useCallback(() => {
    alert('Windows Picture and Fax Viewer\n\nKeyboard Shortcuts:\n← / Page Up: Previous Image\n→ / Page Down / Space: Next Image\n+ / -: Zoom In / Zoom Out\nR: Rotate Clockwise\nCtrl+B: Best Fit\nCtrl+A: Actual Size\nF11: Slideshow (Esc to exit)');
  }, []);

  // Slideshow auto-advance timer
  useEffect(() => {
    if (!isSlideshow || !slideshowPlaying || photos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isSlideshow, slideshowPlaying, photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const isActive = windowsStore.activeWindow === win?.windowId;
    if (!isActive) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleRotateCW();
      } else if (e.key === 'F11') {
        e.preventDefault();
        setIsSlideshow((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (isSlideshow) {
          e.preventDefault();
          setIsSlideshow(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    windowsStore.activeWindow,
    win?.windowId,
    handlePrev,
    handleNext,
    handleZoomIn,
    handleZoomOut,
    handleRotateCW,
    isSlideshow,
  ]);

  // Panning when zoomed in
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  const handleImageMouseDown = (e) => {
    if (e.button !== 0) return;
    if (scale > 1 || isActualSize) {
      e.preventDefault();
      e.stopPropagation();
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      panStartRef.current = { ...pan };

      const onMouseMove = (moveEvent) => {
        if (!isDraggingRef.current) return;
        const dx = moveEvent.clientX - dragStartRef.current.x;
        const dy = moveEvent.clientY - dragStartRef.current.y;
        setPan({
          x: panStartRef.current.x + dx,
          y: panStartRef.current.y + dy,
        });
      };

      const onMouseUp = () => {
        isDraggingRef.current = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e) => {
    if (file.type === 'file') return;
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev * 1.15, 6));
      setIsActualSize(false);
    } else {
      setScale((prev) => {
        const next = prev / 1.15;
        if (next <= 1.05) {
          setPan({ x: 0, y: 0 });
          return 1;
        }
        return Math.max(next, 0.2);
      });
      setIsActualSize(false);
    }
  };

  if (!win) return null;

  const isXP = windowsStore.theme === 'winXP';
  const displayTitle = isXP
    ? `${file.title || 'Image'} - Windows Picture and Fax Viewer`
    : (file.title || win.displayName);

  const windowIcon = getFileIconPath('image.png', windowsStore.theme) || win.iconImage;

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
    'image-preview-window',
    win.fullscreen === true ? 'win-fullscreen' : '',
    win.windowState === 'minimize' ? 'minimize' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const imageTransform = `translate(${pan.x}px, ${pan.y}px) rotate(${rotation}deg) scale(${scale})`;

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
        displayName={displayTitle}
        customIcon={windowIcon}
        altText={displayTitle}
        onMinimize={minimizeWindow}
        onMaximize={toggleWindowSize}
        onClose={closeWindow}
        onDragStart={handleDragStart}
      />

      <div className="ipw-content">
        {/* Win95 menu bar (hidden in authentic XP viewer) */}
        {!isXP && (
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
        )}

        {/* Viewport for PDF/files or Photos */}
        {file.type === 'file' ? (
          <div className="ipw-file-explorer">
            <iframe
              className="ipw-responsive-iframe"
              src={file.content?.src}
              title={file.title}
            />
          </div>
        ) : (
          <div className="ipw-file-explorer" onWheel={handleWheel}>
            <div
              className={`ipw-grid-container-photos ${scale > 1 || isActualSize ? 'ipw-pannable' : ''}`}
              onMouseDown={handleImageMouseDown}
            >
              {file.src ? (
                <img
                  key={file.src || currentIndex}
                  src={file.src}
                  alt={file.title || 'Preview'}
                  className="ipw-photo-img"
                  style={{
                    transform: imageTransform,
                    transition: isDraggingRef.current ? 'none' : 'transform 0.15s ease-out',
                    maxWidth: isActualSize ? 'none' : '100%',
                    maxHeight: isActualSize ? 'none' : '100%',
                  }}
                  draggable={false}
                />
              ) : (
                <div className="ipw-no-image">No image selected</div>
              )}
            </div>
          </div>
        )}

        {/* Windows XP Picture and Fax Viewer Bottom Toolbar */}
        {file.type !== 'file' && (
          <div className="xp-viewer-toolbar-wrapper">
            <div className="xp-viewer-toolbar" role="toolbar" aria-label="Image actions">
              {/* Group 1: Prev & Next */}
              <button
                type="button"
                className="xp-viewer-btn xp-viewer-nav-btn"
                onClick={handlePrev}
                disabled={!hasMultiplePhotos}
                title="Previous Image (Left arrow)"
                aria-label="Previous Image"
              >
                <IconPrev />
              </button>

              <button
                type="button"
                className="xp-viewer-btn xp-viewer-nav-btn"
                onClick={handleNext}
                disabled={!hasMultiplePhotos}
                title="Next Image (Right arrow)"
                aria-label="Next Image"
              >
                <IconNext />
              </button>

              <div className="xp-viewer-separator" />

              {/* Group 2: Best Fit, Actual Size, Slideshow */}
              <button
                type="button"
                className={`xp-viewer-btn ${!isActualSize && scale === 1 ? 'xp-viewer-btn-active' : ''}`}
                onClick={handleBestFit}
                title="Best fit (Ctrl+B)"
                aria-label="Best fit"
              >
                <IconBestFit />
              </button>

              <button
                type="button"
                className={`xp-viewer-btn ${isActualSize ? 'xp-viewer-btn-active' : ''}`}
                onClick={handleActualSize}
                title="Actual size (Ctrl+A)"
                aria-label="Actual size"
              >
                <IconActualSize />
              </button>

              <button
                type="button"
                className={`xp-viewer-btn ${isSlideshow ? 'xp-viewer-btn-active' : ''}`}
                onClick={() => setIsSlideshow(true)}
                title="Start slide show (F11)"
                aria-label="Start slide show"
              >
                <IconSlideshow />
              </button>

              <div className="xp-viewer-separator" />

              {/* Group 3: Zoom In, Zoom Out */}
              <button
                type="button"
                className="xp-viewer-btn"
                onClick={handleZoomIn}
                title="Zoom in (+)"
                aria-label="Zoom in"
              >
                <IconZoomIn />
              </button>

              <button
                type="button"
                className="xp-viewer-btn"
                onClick={handleZoomOut}
                title="Zoom out (-)"
                aria-label="Zoom out"
              >
                <IconZoomOut />
              </button>

              <div className="xp-viewer-separator" />

              {/* Group 4: Rotate Counterclockwise, Rotate Clockwise */}
              <button
                type="button"
                className="xp-viewer-btn"
                onClick={handleRotateCCW}
                title="Rotate counterclockwise (Ctrl+L)"
                aria-label="Rotate counterclockwise"
              >
                <IconRotateCCW />
              </button>

              <button
                type="button"
                className="xp-viewer-btn"
                onClick={handleRotateCW}
                title="Rotate clockwise (Ctrl+K)"
                aria-label="Rotate clockwise"
              >
                <IconRotateCW />
              </button>

              <div className="xp-viewer-separator" />

              {/* Group 5: Delete, Print, Save, Edit */}
              <button
                type="button"
                className="xp-viewer-btn"
                onClick={closeWindow}
                title="Delete / Close"
                aria-label="Delete"
              >
                <IconDelete />
              </button>

              <button
                type="button"
                className="xp-viewer-btn"
                onClick={handlePrint}
                title="Print... (Ctrl+P)"
                aria-label="Print"
              >
                <IconPrint />
              </button>

              <button
                type="button"
                className="xp-viewer-btn"
                onClick={handleSave}
                title="Save / Download (Ctrl+S)"
                aria-label="Save"
              >
                <IconSave />
              </button>

              <button
                type="button"
                className="xp-viewer-btn"
                onClick={handleEdit}
                title="Open image in new tab / Edit"
                aria-label="Edit"
              >
                <IconEdit />
              </button>

              <div className="xp-viewer-separator" />

              {/* Group 6: Help */}
              <button
                type="button"
                className="xp-viewer-btn"
                onClick={handleHelp}
                title="Help"
                aria-label="Help"
              >
                <IconHelp />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Slideshow Overlay */}
      {isSlideshow && (
        <div className="xp-slideshow-overlay">
          <div className="xp-slideshow-img-box">
            <img
              src={file.src}
              alt={file.title || 'Slideshow'}
              className="xp-slideshow-img"
            />
          </div>

          {/* Floating Slideshow Controls (Top Right) */}
          <div className="xp-slideshow-controls">
            <button
              type="button"
              className="xp-slideshow-btn"
              onClick={handlePrev}
              title="Previous (Left arrow)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                <path d="M14 6L8 12l6 6V6z" />
              </svg>
            </button>
            <button
              type="button"
              className="xp-slideshow-btn"
              onClick={() => setSlideshowPlaying((prev) => !prev)}
              title={slideshowPlaying ? 'Pause' : 'Play'}
            >
              {slideshowPlaying ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <polygon points="8,5 19,12 8,19" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="xp-slideshow-btn"
              onClick={handleNext}
              title="Next (Right arrow)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                <path d="M10 6l6 6-6 6V6z" />
              </svg>
            </button>
            <button
              type="button"
              className="xp-slideshow-btn xp-slideshow-btn-close"
              onClick={() => setIsSlideshow(false)}
              title="Close Slideshow (Esc)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
