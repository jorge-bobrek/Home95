import React from 'react';
import { useWindows } from '@/store/WindowsContext';
import sidebarImage from '@/assets/sidebar-image.png';
import linkedinIcon from '@/assets/iPhone-Icons/Linkedin.webp';
import githubIcon from '@/assets/iPhone-Icons/Github.webp';
import resumeIcon from '@/assets/win95Icons/resume.png';
import './StartMenu.css';

export default function StartMenu() {
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
