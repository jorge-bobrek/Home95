const iconModules = import.meta.glob('../assets/win95Icons/*', { eager: true });
const xpIconModules = import.meta.glob('../assets/winXPIcons/*', { eager: true });

export function getIconPath(iconImage, theme) {
  const folder = theme === 'winXP' ? 'winXPIcons' : 'win95Icons';
  const targetImage = (theme === 'winXP' && iconImage === 'photos.png') ? 'photos.ico' : iconImage;
  const path = `../assets/${folder}/${targetImage}`;
  
  if (theme === 'winXP') {
    const mod = xpIconModules[path];
    if (mod) return mod.default;
  }
  
  const mod = iconModules[`../assets/win95Icons/${iconImage}`];
  if (mod) return mod.default;
  return '';
}

const fileIconModules = import.meta.glob('../assets/FileWindow/*', { eager: true });

export function getFileIconPath(iconImage, theme) {
  if (theme === 'winXP') {
    if (iconImage === 'photos.png') {
      const mod = xpIconModules['../assets/winXPIcons/photos.ico'];
      if (mod) return mod.default;
    }
    if (iconImage === 'folder.png') {
      const mod = xpIconModules['../assets/winXPIcons/folder.png'];
      if (mod) return mod.default;
    }
    if (iconImage === 'file.png') {
      const mod = xpIconModules['../assets/winXPIcons/file.png'];
      if (mod) return mod.default;
    }
  }
  
  const path = `../assets/FileWindow/${iconImage}`;
  const mod = fileIconModules[path];
  if (mod) return mod.default;
  return '';
}
