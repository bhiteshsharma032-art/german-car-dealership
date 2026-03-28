/**
 * TEXT AUDIT - Find all user-facing text for manual review
 * Extracts all text strings from components for client review
 */

const fs = require('fs');
const path = require('path');

const results = {
  pages: {},
  components: {},
  allText: []
};

function extractTextFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const texts = [];

  // Extract text from JSX/TSX
  // Match text between > and <
  const jsxTextRegex = />([^<>{}\n]+)</g;
  let match;
  while ((match = jsxTextRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text && text.length > 2 && !text.match(/^[\d\s\-_.,;:!?()[\]{}]+$/)) {
      texts.push(text);
    }
  }

  // Extract from string literals
  const stringRegex = /['"`]([^'"`\n]{10,}?)['"`]/g;
  while ((match = stringRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text && !text.includes('className') && !text.includes('http') && !text.includes('/')) {
      texts.push(text);
    }
  }

  return [...new Set(texts)]; // Remove duplicates
}

function scanDirectory(dir, type) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath, type);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const texts = extractTextFromFile(fullPath);
      const relativePath = fullPath.replace(__dirname, '').replace(/\\/g, '/');
      
      if (texts.length > 0) {
        if (type === 'pages') {
          results.pages[relativePath] = texts;
        } else {
          results.components[relativePath] = texts;
        }
        results.allText.push(...texts);
      }
    }
  });
}

console.log('\n📝 TEXT AUDIT - Extracting all user-facing text\n');

const pagesPath = path.join(__dirname, 'frontend', 'src', 'pages');
const componentsPath = path.join(__dirname, 'frontend', 'src', 'components');

if (fs.existsSync(pagesPath)) {
  console.log('Scanning pages...');
  scanDirectory(pagesPath, 'pages');
}

if (fs.existsSync(componentsPath)) {
  console.log('Scanning components...');
  scanDirectory(componentsPath, 'components');
}

// Generate report
let report = '='.repeat(100) + '\n';
report += 'TEXT AUDIT REPORT - ALL USER-FACING TEXT\n';
report += 'Review this list for spelling, grammar, and consistency issues\n';
report += '='.repeat(100) + '\n\n';

report += 'PAGES:\n';
report += '='.repeat(100) + '\n\n';

Object.entries(results.pages).forEach(([file, texts]) => {
  report += `\n📄 ${file}\n`;
  report += '-'.repeat(100) + '\n';
  texts.forEach((text, idx) => {
    report += `${idx + 1}. ${text}\n`;
  });
  report += '\n';
});

report += '\n\nCOMPONENTS:\n';
report += '='.repeat(100) + '\n\n';

Object.entries(results.components).forEach(([file, texts]) => {
  report += `\n📄 ${file}\n`;
  report += '-'.repeat(100) + '\n';
  texts.forEach((text, idx) => {
    report += `${idx + 1}. ${text}\n`;
  });
  report += '\n';
});

// Save report
const reportPath = 'TEXT_AUDIT_REPORT.txt';
fs.writeFileSync(reportPath, report);

console.log(`\n✅ Text audit complete!`);
console.log(`📄 Report saved to: ${reportPath}`);
console.log(`\n📊 Statistics:`);
console.log(`   Pages scanned: ${Object.keys(results.pages).length}`);
console.log(`   Components scanned: ${Object.keys(results.components).length}`);
console.log(`   Total unique text strings: ${new Set(results.allText).size}`);
console.log(`\n💡 Review the report file and check for:`);
console.log(`   - Spelling mistakes`);
console.log(`   - Grammar errors`);
console.log(`   - Inconsistent capitalization`);
console.log(`   - Repeated/duplicate text`);
console.log(`   - Brand name errors (BMW, Mercedes, etc.)`);
console.log(`\n`);
