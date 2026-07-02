const iconModules = import.meta.glob('../assets/win95Icons/*', { eager: true });

export function getIconPath(iconImage) {
  const path = `../assets/win95Icons/${iconImage}`;
  const mod = iconModules[path];
  if (!mod) return '';
  return mod.default;
}

const fileIconModules = import.meta.glob('../assets/FileWindow/*', { eager: true });

export function getFileIconPath(iconImage) {
  const path = `../assets/FileWindow/${iconImage}`;
  const mod = fileIconModules[path];
  if (!mod) return '';
  return mod.default;
}
