import React from 'react';

export function IconPrev() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      <defs>
        <radialGradient id="xpPrevGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#76b8fc" />
          <stop offset="45%" stopColor="#2572e8" />
          <stop offset="90%" stopColor="#104aa6" />
          <stop offset="100%" stopColor="#08367d" />
        </radialGradient>
      </defs>
      <circle cx="11" cy="11" r="9" fill="url(#xpPrevGrad)" stroke="#09357a" strokeWidth="1" />
      {/* Top glossy reflection */}
      <path d="M5 8.5C6 5.5 8.5 4 11 4s5 1.5 6 4.5c-2-2-4-2.5-6-2.5s-4 .5-6 2.5z" fill="#ffffff" opacity="0.55" />
      {/* Vertical Bar | */}
      <rect x="6.5" y="7" width="1.8" height="8" rx="0.5" fill="#ffffff" />
      {/* Left Triangle ◀ */}
      <polygon points="14.5,7 9.5,11 14.5,15" fill="#ffffff" />
    </svg>
  );
}

export function IconNext() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      <defs>
        <radialGradient id="xpNextGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#76b8fc" />
          <stop offset="45%" stopColor="#2572e8" />
          <stop offset="90%" stopColor="#104aa6" />
          <stop offset="100%" stopColor="#08367d" />
        </radialGradient>
      </defs>
      <circle cx="11" cy="11" r="9" fill="url(#xpNextGrad)" stroke="#09357a" strokeWidth="1" />
      {/* Top glossy reflection */}
      <path d="M5 8.5C6 5.5 8.5 4 11 4s5 1.5 6 4.5c-2-2-4-2.5-6-2.5s-4 .5-6 2.5z" fill="#ffffff" opacity="0.55" />
      {/* Right Triangle ▶ */}
      <polygon points="7.5,7 12.5,11 7.5,15" fill="#ffffff" />
      {/* Vertical Bar | */}
      <rect x="13.7" y="7" width="1.8" height="8" rx="0.5" fill="#ffffff" />
    </svg>
  );
}

export function IconBestFit() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      {/* Corner brackets */}
      <path d="M3.5 7.5V3.5h4" stroke="#7a8288" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M14.5 3.5h4v4" stroke="#7a8288" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M3.5 14.5v4h4" stroke="#7a8288" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M14.5 18.5h4v-4" stroke="#7a8288" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Centered Picture Frame */}
      <rect x="5.5" y="5.5" width="11" height="11" fill="#f4f5f7" stroke="#90969c" strokeWidth="1" />
      {/* Landscape hill inside */}
      <polygon points="6,16 10,12 12,14 14.5,11.5 16,13.5 16,16" fill="#a4b4c4" />
      <circle cx="8" cy="8.5" r="1.2" fill="#c0c8d4" />
    </svg>
  );
}

export function IconActualSize() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      {/* Centered Picture Frame */}
      <rect x="5.5" y="5.5" width="11" height="11" fill="#c8e4fc" stroke="#2562b4" strokeWidth="1.2" />
      {/* Blue sky & green hill */}
      <polygon points="6.5,15.5 10.5,11.5 16,15.5" fill="#46a032" />
      <polygon points="10,15.5 13.5,12 16,14.5" fill="#328424" />
      {/* 4 Outward Blue Arrows */}
      {/* Top */}
      <polygon points="11,1.5 8.5,4.5 13.5,4.5" fill="#1b54ac" />
      {/* Bottom */}
      <polygon points="11,20.5 8.5,17.5 13.5,17.5" fill="#1b54ac" />
      {/* Left */}
      <polygon points="1.5,11 4.5,8.5 4.5,13.5" fill="#1b54ac" />
      {/* Right */}
      <polygon points="20.5,11 17.5,8.5 17.5,13.5" fill="#1b54ac" />
    </svg>
  );
}

export function IconSlideshow() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      {/* Top bar roller */}
      <rect x="3.5" y="3" width="15" height="2.2" rx="0.8" fill="#d6d8de" stroke="#686e7a" strokeWidth="0.8" />
      {/* Projection screen */}
      <rect x="4.5" y="5.2" width="13" height="9.5" fill="#e8ecf8" stroke="#5a6275" strokeWidth="1" />
      {/* Picture outline inside screen */}
      <rect x="6.5" y="7" width="9" height="6" fill="#ffffff" stroke="#909aa8" strokeWidth="0.8" />
      <polygon points="7,12.5 10,9.5 12,11.5 13.5,10 15,12.5" fill="#7890b8" />
      {/* Tripod Stand */}
      <line x1="11" y1="14.7" x2="11" y2="20" stroke="#484e5a" strokeWidth="1.3" />
      <line x1="11" y1="17.5" x2="6.5" y2="21" stroke="#484e5a" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="11" y1="17.5" x2="15.5" y2="21" stroke="#484e5a" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function IconZoomIn() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      <defs>
        <radialGradient id="xpLensIn" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#d2e8fc" />
          <stop offset="100%" stopColor="#9ccaf4" />
        </radialGradient>
      </defs>
      {/* Wooden handle pointing down-left */}
      <path d="M8.5 13.5L3.5 18.5" stroke="#d4701e" strokeWidth="3" strokeLinecap="round" />
      <path d="M8.5 13.5L3.5 18.5" stroke="#f6a44a" strokeWidth="1.2" strokeLinecap="round" />
      {/* Metal Ferrule */}
      <circle cx="8" cy="14" r="1.4" fill="#8ea2ba" />
      {/* Lens Circle */}
      <circle cx="13" cy="9" r="6.5" fill="url(#xpLensIn)" stroke="#3f72b2" strokeWidth="1.2" />
      {/* Gloss reflection arc */}
      <path d="M9 7.5c.8-2 2.5-3 4-3" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Blue Plus Sign */}
      <line x1="13" y1="6" x2="13" y2="12" stroke="#0e56b8" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="9" x2="16" y2="9" stroke="#0e56b8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconZoomOut() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      <defs>
        <radialGradient id="xpLensOut" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#d2e8fc" />
          <stop offset="100%" stopColor="#9ccaf4" />
        </radialGradient>
      </defs>
      {/* Wooden handle pointing down-left */}
      <path d="M8.5 13.5L3.5 18.5" stroke="#d4701e" strokeWidth="3" strokeLinecap="round" />
      <path d="M8.5 13.5L3.5 18.5" stroke="#f6a44a" strokeWidth="1.2" strokeLinecap="round" />
      {/* Metal Ferrule */}
      <circle cx="8" cy="14" r="1.4" fill="#8ea2ba" />
      {/* Lens Circle */}
      <circle cx="13" cy="9" r="6.5" fill="url(#xpLensOut)" stroke="#3f72b2" strokeWidth="1.2" />
      {/* Gloss reflection arc */}
      <path d="M9 7.5c.8-2 2.5-3 4-3" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Blue Minus Sign */}
      <line x1="10" y1="9" x2="16" y2="9" stroke="#0e56b8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconRotateCCW() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      {/* Slanted Green Hills (Left-leaning) */}
      <polygon points="3.5,18 10,18 10,11" fill="#70c420" />
      <polygon points="10,18 17.5,18 10,11" fill="#1b8808" />
      <line x1="10" y1="11" x2="10" y2="18" stroke="#ffffff" strokeWidth="0.8" />
      {/* Curved Blue Arrow pointing left */}
      <path d="M14.5 12A4.5 4.5 0 0 0 8.5 7.5" stroke="#1256b8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <polygon points="8,4.5 5.5,7.8 9.5,8.8" fill="#1256b8" />
    </svg>
  );
}

export function IconRotateCW() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      {/* Slanted Green Hills (Right-leaning) */}
      <polygon points="4.5,18 12,18 12,11" fill="#1b8808" />
      <polygon points="12,18 18.5,18 12,11" fill="#70c420" />
      <line x1="12" y1="11" x2="12" y2="18" stroke="#ffffff" strokeWidth="0.8" />
      {/* Curved Blue Arrow pointing right */}
      <path d="M7.5 12A4.5 4.5 0 0 1 13.5 7.5" stroke="#1256b8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <polygon points="14,4.5 16.5,7.8 12.5,8.8" fill="#1256b8" />
    </svg>
  );
}

export function IconDelete() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      {/* Red Glossy X Cross */}
      <line x1="5.5" y1="5.5" x2="16.5" y2="16.5" stroke="#d01222" strokeWidth="3" strokeLinecap="round" />
      <line x1="16.5" y1="5.5" x2="5.5" y2="16.5" stroke="#d01222" strokeWidth="3" strokeLinecap="round" />
      <line x1="5.5" y1="5.5" x2="16.5" y2="16.5" stroke="#ff6a78" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16.5" y1="5.5" x2="5.5" y2="16.5" stroke="#ff6a78" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconPrint() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      {/* Top Paper Input */}
      <path d="M7 3.5h8v4.5H7z" fill="#ffffff" stroke="#687484" strokeWidth="0.9" />
      {/* Printer Body */}
      <rect x="4.5" y="8" width="13" height="7.5" rx="1.5" fill="#eef1f6" stroke="#485468" strokeWidth="1.1" />
      {/* Paper Feed Slot */}
      <rect x="6.5" y="9.5" width="9" height="1" fill="#303848" />
      {/* Green Power LED */}
      <circle cx="6.8" cy="13" r="0.9" fill="#2ad42a" />
      {/* Output Paper Tray */}
      <path d="M6.5 13.5h9v5h-9z" fill="#ffffff" stroke="#687484" strokeWidth="0.9" />
      <line x1="8" y1="15.5" x2="14" y2="15.5" stroke="#a0a8b4" strokeWidth="0.8" />
      <line x1="8" y1="17" x2="12" y2="17" stroke="#a0a8b4" strokeWidth="0.8" />
    </svg>
  );
}

export function IconSave() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      {/* 3.5" Floppy Disk Body */}
      <path d="M4 3.5h11.5l2.5 2.5v12.5H4z" fill="#4d53a8" stroke="#252968" strokeWidth="1.1" />
      {/* Metal Shutter at top */}
      <rect x="6.5" y="3.5" width="8" height="5.5" fill="#d2d6e0" stroke="#707688" strokeWidth="0.8" />
      <rect x="8" y="4.5" width="2.2" height="3.5" fill="#252968" />
      {/* White Paper Label */}
      <rect x="6" y="11" width="10" height="7.5" rx="0.5" fill="#ffffff" stroke="#8890a4" strokeWidth="0.8" />
      <line x1="7.5" y1="13" x2="14.5" y2="13" stroke="#4d53a8" strokeWidth="0.9" />
      <line x1="7.5" y1="15" x2="13" y2="15" stroke="#4d53a8" strokeWidth="0.9" />
    </svg>
  );
}

export function IconEdit() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      {/* Picture frame */}
      <rect x="3.5" y="5.5" width="11" height="11" fill="#d4e8fc" stroke="#2c62a8" strokeWidth="1" />
      <polygon points="4,16 9,12 11,14 14.5,16" fill="#44aa28" />
      <circle cx="6" cy="8" r="1" fill="#e8c828" />
      {/* Blue Paint Pen / Brush overlapping */}
      {/* Pen handle */}
      <polygon points="12,14 18,7.5 20.5,9.5 14,16.5" fill="#4888e8" stroke="#164898" strokeWidth="0.9" />
      {/* Brass ferrule */}
      <polygon points="11,15.5 13.5,13 14.5,14 12,17" fill="#e6b432" stroke="#8a6410" strokeWidth="0.6" />
      {/* Pen nib / tip */}
      <polygon points="9.5,18.5 11,15.5 12,17" fill="#202430" />
    </svg>
  );
}

export function IconHelp() {
  return (
    <svg viewBox="0 0 22 22" width="20" height="20">
      <defs>
        <radialGradient id="xpHelpGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#7cbcfc" />
          <stop offset="50%" stopColor="#2572e8" />
          <stop offset="100%" stopColor="#0a3c8a" />
        </radialGradient>
      </defs>
      <circle cx="11" cy="11" r="8" fill="url(#xpHelpGrad)" stroke="#09357a" strokeWidth="1" />
      <path d="M6 8.5C6.8 6 9 4.8 11 4.8s4.2 1.2 5 3.7c-1.8-1.8-3.5-2.2-5-2.2s-3.2.4-5 2.2z" fill="#ffffff" opacity="0.5" />
      {/* Crisp White Question Mark */}
      <text x="11" y="15" fontSize="11" fontWeight="bold" fill="#ffffff" textAnchor="middle" fontFamily="Tahoma, sans-serif">
        ?
      </text>
    </svg>
  );
}
