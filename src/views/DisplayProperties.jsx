import React, { useState } from 'react';
import { useWindows } from '@/store/WindowsContext';
import blissImg from '@/assets/bliss.jpg';
import './DisplayProperties.css';

export default function DisplayProperties() {
  const windowsStore = useWindows();
  const [selectedTheme, setSelectedTheme] = useState(windowsStore.theme);

  const handleApply = () => {
    windowsStore.setTheme(selectedTheme);
  };

  const handleOk = () => {
    windowsStore.setTheme(selectedTheme);
    windowsStore.setWindowState({ windowState: 'close', windowId: 'DisplayPropertiesWindow' });
  };

  const handleCancel = () => {
    setSelectedTheme(windowsStore.theme);
    windowsStore.setWindowState({ windowState: 'close', windowId: 'DisplayPropertiesWindow' });
  };

  return (
    <div className="dp-container">
      {/* Tabs */}
      <menu role="tablist" className="dp-tablist">
        <button role="tab" aria-selected="true" onClick={(e) => e.preventDefault()}>
          Themes
        </button>
        <button role="tab" aria-selected="false" disabled onClick={(e) => e.preventDefault()}>
          Desktop
        </button>
        <button role="tab" aria-selected="false" disabled onClick={(e) => e.preventDefault()}>
          Screen Saver
        </button>
        <button role="tab" aria-selected="false" disabled onClick={(e) => e.preventDefault()}>
          Appearance
        </button>
        <button role="tab" aria-selected="false" disabled onClick={(e) => e.preventDefault()}>
          Settings
        </button>
      </menu>

      {/* Tab Panel */}
      <div role="tabpanel" className="dp-tabpanel">
        <p className="dp-description">
          A theme is a background plus a set of sounds, icons, and other elements to help you personalize your computer with one click.
        </p>

        {/* Monitor Preview */}
        <div className="dp-monitor-wrapper">
          <div className="dp-monitor-bezel">
            <div className="dp-monitor-screen">
              <div
                className="dp-preview-desktop"
                style={{
                  background: selectedTheme === 'winXP' ? `url(${blissImg}) center/cover no-repeat` : '#018281'
                }}
              >
                {/* Mini Window Preview */}
                <div className={`dp-preview-window ${selectedTheme === 'winXP' ? 'xp-style' : 'win95-style'}`}>
                  <div className="dp-preview-title">
                    <span>Active Window</span>
                    <div className="dp-preview-controls">
                      <span className="dp-ctrl" />
                      <span className="dp-ctrl" />
                      <span className="dp-ctrl close" />
                    </div>
                  </div>
                  <div className="dp-preview-body">
                    Window Text
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dp-monitor-stand" />
          <div className="dp-monitor-base" />
        </div>

        {/* Dropdown Theme Selector */}
        <div className="dp-selector-section">
          <label htmlFor="theme-select" className="dp-theme-label">Theme:</label>
          <div className="dp-select-wrapper">
            <select
              id="theme-select"
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="dp-select"
            >
              <option value="winXP">Luna</option>
              <option value="win95">Classic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="dp-action-buttons">
        <button className="dp-btn" onClick={handleOk}>OK</button>
        <button className="dp-btn" onClick={handleCancel}>Cancel</button>
        <button className="dp-btn" onClick={handleApply} disabled={selectedTheme === windowsStore.theme}>
          Apply
        </button>
      </div>
    </div>
  );
}
