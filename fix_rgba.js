const fs = require('fs');
const path = require('path');

const srcDir = 'n:/German Car dealership/frontend/src';

const replacements = [
  { search: /rgba\(59,130,246,/g, replace: 'rgba(239,68,68,' },
  { search: /rgba\(\s*59\s*,\s*130\s*,\s*246\s*,/g, replace: 'rgba(239,68,68,' },
  { search: /rgba\(72,104,255,/g, replace: 'rgba(239,68,68,' },
  { search: /rgba\(38,60,241,/g, replace: 'rgba(220,38,38,' }
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      results.push(file);
    }
  });
  return results;
}

const filesToProcess = walk(srcDir);

filesToProcess.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  replacements.forEach(({ search, replace }) => {
    content = content.replace(search, replace);
  });
  
  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Reverted RGBA in: ${filePath}`);
  }
});
console.log('Done!');
