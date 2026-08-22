import React from 'react';
import { useWindows } from '@/store/WindowsContext';
import { getIconPath } from '@/utils/imagePath';

export default function TopBar({
  windowId,
  displayName,
  iconImage,
  altText,
  customIcon,
  onMinimize,
  onMaximize,
  onClose,
  onDragStart,
}) {
  const windowsStore = useWindows();
  const isActive = windowsStore.activeWindow === windowId;
  const topBarClass = isActive ? 'top-bar' : 'top-bar-deactivated';

  const iconSrc = customIcon || getIconPath(iconImage, windowsStore.theme);

  return (
    <div
      data-topbar="true"
      className={`top-bar-window ${topBarClass}`}
      onDoubleClick={onMaximize}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
    >
      <div className="window-name">
        <img
          className="icon-image"
          src={iconSrc}
          alt={altText || displayName}
        />
        {displayName}
      </div>
      <div className="triple-button">
        <button
          className="minimize-button button"
          onClick={onMinimize}
          aria-label="Minimize"
        >
          <svg width="6" height="2" viewBox="0 0 6 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="6" height="2" fill="currentColor" />
          </svg>
        </button>
        <button
          className="expand-button button"
          onClick={onMaximize}
          aria-label="Maximize"
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0h9v9H0V0zm1 3h7v5H1V3z" fill="currentColor" />
          </svg>
        </button>
        <button
          className="close-button button"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </button>
      </div>
    </div>
  );
}
