import fs from 'fs';
import path from 'path';

const directory = 'n:/German Car dealership/frontend/src/components';

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  const replaceMap = [
    { search: /bg-white/g, replace: 'bg-[#1a1a1a]' },
    { search: /bg-gray-50/g, replace: 'bg-zinc-900 border border-zinc-800' },
    { search: /bg-gray-100/g, replace: 'bg-[#0a0a0a]' },
    { search: /bg-gray-200/g, replace: 'bg-zinc-800' },
    { search: /bg-gray-900/g, replace: 'bg-black' },
    { search: /text-gray-900/g, replace: 'text-white' },
    { search: /text-gray-800/g, replace: 'text-gray-200' },
    { search: /text-gray-700/g, replace: 'text-gray-300' },
    { search: /text-gray-600/g, replace: 'text-gray-400' },
    { search: /border-gray-200/g, replace: 'border-zinc-800' },
    { search: /border-gray-300/g, replace: 'border-zinc-700' },
    { search: /hover:bg-gray-50/g, replace: 'hover:bg-zinc-800' },
    { search: /hover:bg-gray-100/g, replace: 'hover:bg-zinc-800' },
    { search: /hover:bg-gray-200/g, replace: 'hover:bg-zinc-700' }
  ];

  for (const op of replaceMap) {
    if (content.match(op.search)) {
      content = content.replace(op.search, op.replace);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

walkDir(directory);
console.log('Done.');
