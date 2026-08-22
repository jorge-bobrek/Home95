import React, { useState, useEffect } from 'react';
import win95Logo from '@/assets/win95.png';
import speakersIcon from '@/assets/speakers.png';
import sidebarImage from '@/assets/sidebar-image.png';
import selfImg from '@/assets/Biography/self.jpg';
import downloadIcon from '@/assets/Resume/download.png';
import openIcon from '@/assets/Resume/open.png';
import fileIcon from '@/assets/FileWindow/file.png';
import folderIcon from '@/assets/FileWindow/folder.png';
import imageIcon from '@/assets/FileWindow/image.png';
import videoIcon from '@/assets/FileWindow/video.png';
import linkedinIcon from '@/assets/iPhone-Icons/Linkedin.webp';
import githubIcon from '@/assets/iPhone-Icons/Github.webp';

// Icons
import bioIcon from '@/assets/win95Icons/bio.png';
import fileIcon95 from '@/assets/win95Icons/file.png';
import folderIcon95 from '@/assets/win95Icons/folder.png';
import photosIcon95 from '@/assets/win95Icons/photos.png';
import resumeIcon95 from '@/assets/win95Icons/resume.png';

import './BootScreen.css';

export default function BootScreen({ onFinished, theme }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const isXP = theme === 'winXP';

  // Check font load
  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      setFontsLoaded(true);
    }
  }, []);

  // Preload critical images
  useEffect(() => {
    let loadedCount = 0;
    const imagesToLoad = [
      win95Logo,
      speakersIcon,
      sidebarImage,
      selfImg,
      downloadIcon,
      openIcon,
      fileIcon,
      folderIcon,
      imageIcon,
      videoIcon,
      linkedinIcon,
      githubIcon,
      bioIcon,
      fileIcon95,
      folderIcon95,
      photosIcon95,
      resumeIcon95
    ];

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // Guarantee minimum loading screen display time for nostalgic retro effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 3000); // 3 seconds minimum display time
    return () => clearTimeout(timer);
  }, []);

  // Hide loading screen when ready
  useEffect(() => {
    if (fontsLoaded && imagesLoaded && minTimeElapsed) {
      setFadeOut(true);
      const fadeTimer = setTimeout(() => {
        onFinished();
      }, 500); // Wait for transition fade out
      return () => clearTimeout(fadeTimer);
    }
  }, [fontsLoaded, imagesLoaded, minTimeElapsed, onFinished]);

  if (isXP) {
    return (
      <div className={`boot-screen-container xp-boot ${fadeOut ? 'boot-fade-out' : ''}`}>
        <div className="xp-boot-content">
          {/* Custom Brand layers/stack SVG Logo */}
          <div className="xp-boot-logo-container">
            <svg viewBox="0 0 24 24" className="xp-boot-flag" width="70" height="70" stroke="#00c6ff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <div className="xp-boot-title-wrapper">
              <span className="xp-boot-sub">Personal Workspace</span>
              <div className="xp-boot-main-title">
                <span className="xp-boot-windows">Bobrek</span>
                <span className="xp-boot-xp">.dev</span>
              </div>
              <span className="xp-boot-edition">Professional Portfolio</span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="xp-boot-progress-wrapper">
            <div className="xp-boot-progress-track">
              <div className="xp-boot-progress-blocks">
                <div className="xp-block" />
                <div className="xp-block" />
                <div className="xp-block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`boot-screen-container win95-boot-custom ${fadeOut ? 'boot-fade-out' : ''}`}>
      <div className="win95-boot-custom-content">
        <div className="win95-boot-logo-container">
          <svg viewBox="0 0 24 24" className="win95-boot-logo" width="64" height="64" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <div className="win95-boot-title-wrapper">
            <span className="win95-boot-sub">Bobrek.dev</span>
            <div className="win95-boot-main-title">
              <span className="win95-boot-text">Workspace</span>
              <span className="win95-boot-number">95</span>
            </div>
          </div>
        </div>
        <div className="win95-boot-loading-area">
          <div className="win95-boot-progress-container">
            <div className="win95-boot-progress-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
