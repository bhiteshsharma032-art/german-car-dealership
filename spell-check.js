/**
 * COMPREHENSIVE SPELL & GRAMMAR CHECKER
 * Scans all frontend files for spelling mistakes and text issues
 */

const fs = require('fs');
const path = require('path');

// Common spelling mistakes and corrections
const SPELLING_RULES = {
  // Brand names
  'BMV': 'BMW',
  'Mercedez': 'Mercedes',
  'Audi ': 'Audi',
  'Porche': 'Porsche',
  'Volkswagon': 'Volkswagen',
  
  // Grammar issues
  '1 months': '1 month',
  '1 years': '1 year',
  '1 days': '1 day',
  
  // Capitalization issues
  'Get trade-in Value': 'Get trade-in value',
  'Apply For Financing': 'Apply for financing',
  'Get An Offer': 'Get an offer',
  'Browse Inventory': 'Browse inventory',
  'Expert Service': 'Expert service',
  
  // Common typos
  'recieve': 'receive',
  'occured': 'occurred',
  'seperate': 'separate',
  'definately': 'definitely',
  'accomodate': 'accommodate',
  'occassion': 'occasion',
  'untill': 'until',
  'sucessful': 'successful',
  'sucessfully': 'successfully',
  'garantee': 'guarantee',
  'garantie': 'Garantie',
  
  // German common mistakes
  'Fahrzueg': 'Fahrzeug',
  'Finanzeirung': 'Finanzierung',
  'Kontackt': 'Kontakt',
  'Angebot': 'Angebot',
  'Qualitaet': 'Qualität',
  
  // Spacing issues
  'alot': 'a lot',
  'incase': 'in case',
  'infact': 'in fact',
};

// Grammar patterns to check
const GRAMMAR_PATTERNS = [
  {
    pattern: /\b(\d+)\s+monthly\b/gi,
    message: 'Use "months" instead of "monthly" for duration',
    suggestion: (match, num) => `${num} months`
  },
  {
    pattern: /\b(\d+)\s+yearly\b/gi,
    message: 'Use "years" instead of "yearly" for duration',
    suggestion: (match, num) => `${num} years`
  },
  {
    pattern: /\bmonthly\s+payment\b/gi,
    message: 'Check if "monthly payment" should be "monatliche Rate" in German',
    suggestion: null
  },
];

// Files to check
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.html'];
const IGNORE_DIRS = ['node_modules', 'dist', 'build', '.git'];

// Results storage
const results = {
  totalFiles: 0,
  filesWithIssues: 0,
  totalIssues: 0,
  issues: []
};

// Colors for terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Check if path should be ignored
function shouldIgnore(filePath) {
  return IGNORE_DIRS.some(dir => filePath.includes(dir));
}

// Get all files recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    
    if (shouldIgnore(fullPath)) return;

    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      const ext = path.extname(fullPath);
      if (EXTENSIONS.includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

// Check file for spelling issues
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const fileIssues = [];

  // Check spelling rules
  Object.entries(SPELLING_RULES).forEach(([wrong, correct]) => {
    const regex = new RegExp(wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    let match;
    
    lines.forEach((line, lineNum) => {
      if (regex.test(line)) {
        fileIssues.push({
          file: filePath,
          line: lineNum + 1,
          type: 'spelling',
          wrong: wrong,
          correct: correct,
          context: line.trim().substring(0, 100)
        });
      }
    });
  });

  // Check grammar patterns
  GRAMMAR_PATTERNS.forEach(({ pattern, message, suggestion }) => {
    lines.forEach((line, lineNum) => {
      const matches = line.matchAll(pattern);
      for (const match of matches) {
        fileIssues.push({
          file: filePath,
          line: lineNum + 1,
          type: 'grammar',
          wrong: match[0],
          correct: suggestion ? suggestion(...match) : 'See message',
          message: message,
          context: line.trim().substring(0, 100)
        });
      }
    });
  });

  return fileIssues;
}

// Main function
function runSpellCheck() {
  console.clear();
  log('\n📝 COMPREHENSIVE SPELL & GRAMMAR CHECK', 'bold');
  log('Scanning all frontend files...\n', 'cyan');

  const frontendPath = path.join(__dirname, 'frontend', 'src');
  
  if (!fs.existsSync(frontendPath)) {
    log('❌ Frontend src directory not found!', 'red');
    return;
  }

  const files = getAllFiles(frontendPath);
  results.totalFiles = files.length;

  log(`Found ${files.length} files to check\n`, 'blue');
  log('Checking for issues...\n', 'yellow');

  files.forEach(file => {
    const issues = checkFile(file);
    if (issues.length > 0) {
      results.filesWithIssues++;
      results.totalIssues += issues.length;
      results.issues.push(...issues);
    }
  });

  // Display results
  log('═'.repeat(80), 'cyan');
  log('\n📊 RESULTS\n', 'bold');

  if (results.totalIssues === 0) {
    log('✅ No spelling or grammar issues found!', 'green');
    log(`\nScanned ${results.totalFiles} files`, 'cyan');
  } else {
    log(`❌ Found ${results.totalIssues} issues in ${results.filesWithIssues} files\n`, 'red');

    // Group by file
    const byFile = {};
    results.issues.forEach(issue => {
      if (!byFile[issue.file]) byFile[issue.file] = [];
      byFile[issue.file].push(issue);
    });

    // Display issues
    Object.entries(byFile).forEach(([file, issues]) => {
      const relativePath = file.replace(__dirname, '').replace(/\\/g, '/');
      log(`\n📄 ${relativePath}`, 'yellow');
      log('─'.repeat(80), 'cyan');

      issues.forEach((issue, idx) => {
        log(`\n  ${idx + 1}. Line ${issue.line} - ${issue.type.toUpperCase()}`, 'red');
        log(`     ❌ Wrong: "${issue.wrong}"`, 'red');
        log(`     ✅ Correct: "${issue.correct}"`, 'green');
        if (issue.message) {
          log(`     💡 ${issue.message}`, 'yellow');
        }
        log(`     Context: ${issue.context}`, 'cyan');
      });
    });

    // Summary by type
    log('\n\n📈 SUMMARY BY TYPE\n', 'bold');
    const byType = {};
    results.issues.forEach(issue => {
      byType[issue.type] = (byType[issue.type] || 0) + 1;
    });
    Object.entries(byType).forEach(([type, count]) => {
      log(`  ${type}: ${count} issues`, 'yellow');
    });

    // Most common issues
    log('\n\n🔥 MOST COMMON ISSUES\n', 'bold');
    const byWrong = {};
    results.issues.forEach(issue => {
      const key = `${issue.wrong} → ${issue.correct}`;
      byWrong[key] = (byWrong[key] || 0) + 1;
    });
    const sorted = Object.entries(byWrong).sort((a, b) => b[1] - a[1]).slice(0, 10);
    sorted.forEach(([issue, count]) => {
      log(`  ${count}x: ${issue}`, 'yellow');
    });
  }

  log('\n' + '═'.repeat(80), 'cyan');
  log('\n📝 NEXT STEPS:\n', 'bold');
  
  if (results.totalIssues > 0) {
    log('1. Review the issues above', 'yellow');
    log('2. Fix them manually or use find & replace', 'yellow');
    log('3. Run this script again to verify', 'yellow');
    log('4. Commit the changes\n', 'yellow');
  } else {
    log('✅ Your code is clean! No action needed.\n', 'green');
  }

  // Save report to file
  const reportPath = 'SPELL_CHECK_REPORT.txt';
  let report = '='.repeat(80) + '\n';
  report += 'SPELL & GRAMMAR CHECK REPORT\n';
  report += '='.repeat(80) + '\n\n';
  report += `Total Files Scanned: ${results.totalFiles}\n`;
  report += `Files with Issues: ${results.filesWithIssues}\n`;
  report += `Total Issues: ${results.totalIssues}\n\n`;

  if (results.totalIssues > 0) {
    report += 'ISSUES FOUND:\n\n';
    Object.entries(byFile).forEach(([file, issues]) => {
      report += `\nFile: ${file}\n`;
      report += '-'.repeat(80) + '\n';
      issues.forEach((issue, idx) => {
        report += `\n${idx + 1}. Line ${issue.line} - ${issue.type}\n`;
        report += `   Wrong: "${issue.wrong}"\n`;
        report += `   Correct: "${issue.correct}"\n`;
        if (issue.message) report += `   Note: ${issue.message}\n`;
        report += `   Context: ${issue.context}\n`;
      });
    });
  }

  fs.writeFileSync(reportPath, report);
  log(`📄 Full report saved to: ${reportPath}\n`, 'cyan');
}

// Run the check
runSpellCheck();
