import React from 'react';
import { useWindows } from '@/store/WindowsContext';
import downloadIcon from '@/assets/Resume/download.png';
import openIcon from '@/assets/Resume/open.png';
import './Resume.css';

export default function Resume() {
  const windowsStore = useWindows();

  return (
    <div className="resume-container">
      <nav className="download-bar">
        <a
          href="/files/jorge_bobrek_resume.pdf"
          className="download"
          style={{ zIndex: 10 }}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="download-inner resume-border">
            <img src={downloadIcon} className="resume-icon-image" alt="Download" />
            <p style={{ marginTop: '2px' }}>Download</p>
          </span>
        </a>
        <a
          href="/files/jorge_bobrek_resume.pdf"
          className="download"
          style={{ zIndex: 10 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="download-inner resume-border">
            <img src={openIcon} className="resume-icon-image" alt="Open" />
            <p style={{ marginTop: '2px' }}>Open In New Tab</p>
          </span>
        </a>
      </nav>
      <div className="resume-frame-container" style={{ zIndex: 99 }}>
        <iframe
          className="resume-iframe"
          src="https://drive.google.com/file/d/1CqOeoCdAXcqF45eJoIH2LH-LmdkOKJI8/preview"
          title="Résumé"
        />
        {windowsStore.activeWindow !== 'ResumeWindow' && (
          <span
            className="overlay"
            style={{
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          />
        )}
      </div>
    </div>
  );
}
