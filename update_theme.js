const fs = require('fs');
const path = require('path');

const directories = [
  'n:/German Car dealership/frontend/src/pages/public',
  'n:/German Car dealership/frontend/src/components/ui',
  'n:/German Car dealership/frontend/src/components/layout',
  'n:/German Car dealership/frontend/src/components/inventory'
];

const replacements = {
  'bg-[#1a1a1f]': 'bg-[#050508]',
  'bg-[#1e1e26]': 'bg-[#0a0a10]',
  'bg-[#22222a]': 'bg-white/[0.02]',
  'bg-[#2a2a34]': 'bg-white/[0.03]',
  'border-[#2e2e38]': 'border-white/[0.06]',
  'border-[#3a3a44]': 'border-white/[0.08]',
  'text-red-400': 'text-[#7597ff]',
  'text-red-500': 'text-[#4868ff]',
  'text-red-600': 'text-[#263cf1]',
  'bg-red-500': 'bg-[#4868ff]',
  'bg-red-600': 'bg-[#4868ff]',
  'focus:ring-red-500': 'focus:ring-[#4868ff]',
  'focus:ring-red-600': 'focus:ring-[#4868ff]',
  'hover:text-red-400': 'hover:text-[#7597ff]',
  'hover:text-red-500': 'hover:text-[#4868ff]',
  'hover:bg-red-600': 'hover:bg-[#263cf1]',
  'hover:bg-red-700': 'hover:bg-[#1a2ba3]'
};

directories.forEach(directoryPath => {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach(file => {
      if (file.endsWith('.tsx') && !['Home.tsx', 'CarList.tsx', 'CarDetail.tsx'].includes(file)) {
        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        let modified = content;
        for (const [key, value] of Object.entries(replacements)) {
          modified = modified.split(key).join(value);
        }
        
        if (modified !== content) {
          fs.writeFileSync(filePath, modified, 'utf8');
          console.log(`Updated ${file}`);
        }
      }
    });
  }
});
console.log("Migration complete!");
