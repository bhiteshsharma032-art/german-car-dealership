const fs = require('fs');
const path = require('path');

const srcDir = 'n:/German Car dealership/frontend/src';
const tailwindConfig = 'n:/German Car dealership/frontend/tailwind.config.js';

const replacements = [
  { search: /#050508/gi, replace: '#1a1a1f' },
  { search: /#0a0a10/gi, replace: '#22222a' },
  { search: /#0a0a0f/gi, replace: '#22222a' },
  { search: /#101018/gi, replace: '#2a2a34' },
  { search: /#1e1e26/gi, replace: '#22222a' },
  { search: /#4868ff/gi, replace: '#ef4444' }, // Red-500
  { search: /#7597ff/gi, replace: '#f87171' }, // Red-400
  { search: /#263cf1/gi, replace: '#dc2626' }, // Red-600
  { search: /#3b82f6/gi, replace: '#ef4444' },
  { search: /#2563eb/gi, replace: '#dc2626' },
  { search: /text-blue-/gi, replace: 'text-red-' },
  { search: /bg-blue-/gi, replace: 'bg-red-' },
  { search: /border-blue-/gi, replace: 'border-red-' },
  { search: /ring-blue-/gi, replace: 'ring-red-' },
  { search: /shadow-glow-blue/gi, replace: 'shadow-glow-red' },
  // Overly specific simplifications
  { search: /text-\[\#ef4444\]/g, replace: 'text-red-500' },
  { search: /bg-\[\#ef4444\]/g, replace: 'bg-red-500' }
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const filesToProcess = walk(srcDir);
filesToProcess.push(tailwindConfig);

filesToProcess.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  replacements.forEach(({ search, replace }) => {
    content = content.replace(search, replace);
  });
  
  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Reverted colors in: ${filePath}`);
  }
});

console.log('Revert complete!');
