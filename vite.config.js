import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function scanDirectory(dirPath, publicBaseUrl = '/photos', idCounter = { current: 0 }) {
  if (!fs.existsSync(dirPath)) return { items: [], totalSize: 0 };

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const items = [];
  let totalSize = 0;

  const sortedEntries = entries
    .filter((e) => !e.name.startsWith('.'))
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  for (const entry of sortedEntries) {
    const fullPath = path.join(dirPath, entry.name);
    const itemUrl = `${publicBaseUrl}/${entry.name}`;
    const id = idCounter.current++;

    if (entry.isDirectory()) {
      const subResult = scanDirectory(fullPath, itemUrl, idCounter);
      items.push({
        id,
        title: entry.name,
        type: 'folder',
        altText: entry.name,
        size: subResult.totalSize,
        content: subResult.items,
      });
      totalSize += subResult.totalSize;
    } else {
      const stat = fs.statSync(fullPath);
      const ext = path.extname(entry.name).toLowerCase();

      let type = 'file';
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.svg', '.ico'].includes(ext)) {
        type = 'photo';
      } else if (['.mp4', '.webm', '.ogg', '.mov'].includes(ext)) {
        type = 'video';
      } else if (['.pdf'].includes(ext)) {
        type = 'pdf';
      }

      items.push({
        id,
        title: entry.name,
        type,
        src: itemUrl,
        altText: entry.name,
        size: stat.size,
      });
      totalSize += stat.size;
    }
  }

  return { items, totalSize };
}

function photosFilesystemPlugin() {
  const virtualModuleId = 'virtual:photos';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-photos-fs',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const photosDir = path.resolve(__dirname, 'public/photos');
        const data = scanDirectory(photosDir, '/photos');
        return `export default ${JSON.stringify(data)};`;
      }
    },
    configureServer(server) {
      const photosDir = path.resolve(__dirname, 'public/photos');
      server.watcher.add(photosDir);
      server.watcher.on('all', (event, file) => {
        if (file.startsWith(photosDir)) {
          const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: 'full-reload' });
          }
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), photosFilesystemPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

