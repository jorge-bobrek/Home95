import React from 'react';
import { useWindows } from '@/store/WindowsContext';
import { getIconPath } from '@/utils/imagePath';
import sidebarImage from '@/assets/sidebar-image.png';
import linkedinIcon from '@/assets/iPhone-Icons/Linkedin.webp';
import githubIcon from '@/assets/iPhone-Icons/Github.webp';
import './StartMenu.css';

export default function StartMenu() {
  const windowsStore = useWindows();
  const isXP = windowsStore.theme === 'winXP';

  if (isXP) {
    return (
      <div className="xp-start-menu-container" style={{ zIndex: 1000000 }}>
        {/* Header */}
        <div className="xp-sm-header">
          <div className="xp-sm-avatar-border">
            <img className="xp-sm-avatar" src={linkedinIcon} alt="User Avatar" />
          </div>
          <span className="xp-sm-user-name">Jorge Bobrek</span>
        </div>
        
        {/* Body Links */}
        <div className="xp-sm-body">
          <a href="https://www.linkedin.com/in/jorge-bobrek" target="_blank" rel="noopener noreferrer">
            <div className="xp-sm-bar">
              <img className="xp-social-image" src={linkedinIcon} alt="LinkedIn" />
              <div className="xp-sm-text-container">
                <span className="xp-sm-title">LinkedIn</span>
                <span className="xp-sm-subtitle">Professional Profile</span>
              </div>
            </div>
          </a>
          <a href="https://github.com/jorge-bobrek" target="_blank" rel="noopener noreferrer">
            <div className="xp-sm-bar">
              <img className="xp-social-image" src={githubIcon} alt="GitHub" />
              <div className="xp-sm-text-container">
                <span className="xp-sm-title">GitHub</span>
                <span className="xp-sm-subtitle">Open Source Code</span>
              </div>
            </div>
          </a>
          <div className="xp-sm-divider" />
          <a href="/files/jorge_bobrek_resume.pdf" target="_blank" rel="noopener noreferrer">
            <div className="xp-sm-bar">
              <img className="xp-social-image" src={getIconPath('resume.png', windowsStore.theme)} alt="Résumé" />
              <div className="xp-sm-text-container">
                <span className="xp-sm-title">Résumé</span>
                <span className="xp-sm-subtitle">Curriculum Vitae</span>
              </div>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="xp-sm-footer">
          <button className="xp-footer-btn" onClick={() => window.location.reload()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
            </svg>
            Turn Off Computer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="start-menu-container" style={{ zIndex: 1000000 }}>
      <div className="sidebar">
        <img className="sidebar-image" src={sidebarImage} alt="Windows 95" />
      </div>
      <div className="socials">
        <a href="https://www.linkedin.com/in/jorge-bobrek" target="_blank" rel="noopener noreferrer">
          <div className="sm-bar">
            <img className="social-image" src={linkedinIcon} alt="LinkedIn" />
            <u>L</u>inkedIn
          </div>
        </a>
        <a href="https://github.com/jorge-bobrek" target="_blank" rel="noopener noreferrer">
          <div className="sm-bar">
            <img className="social-image" src={githubIcon} alt="GitHub" />
            <u>G</u>itHub
          </div>
        </a>
        <div className="bottom-section">
          <div className="divider" />
          <a href="/files/jorge_bobrek_resume.pdf" target="_blank" rel="noopener noreferrer">
            <div className="sm-bar">
              <img className="social-image" src={resumeIcon} alt="Résumé" />
              <u>R</u>ésumé
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
