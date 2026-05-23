import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join } from 'path';

const INPUT = 'public/4kkkk';
const OUTPUT = 'public/frames-webp';
const TARGET_WIDTH = 1920; // Full HD width - crisp on all screens
const WEBP_QUALITY = 82;   // High quality, great compression

async function run() {
  await mkdir(OUTPUT, { recursive: true });
  
  const files = (await readdir(INPUT)).filter(f => f.endsWith('.png')).sort();
  console.log(`Converting ${files.length} PNGs to WebP (${TARGET_WIDTH}px, q${WEBP_QUALITY})...`);
  
  let totalIn = 0, totalOut = 0;
  const batchSize = 8;
  
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    await Promise.all(batch.map(async (file) => {
      const inPath = join(INPUT, file);
      const outFile = file.replace('.png', '.webp');
      const outPath = join(OUTPUT, outFile);
      
      const inStat = await stat(inPath);
      totalIn += inStat.size;
      
      await sharp(inPath)
        .resize(TARGET_WIDTH, null, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(outPath);
      
      const outStat = await stat(outPath);
      totalOut += outStat.size;
    }));
    
    const done = Math.min(i + batchSize, files.length);
    process.stdout.write(`\r  ${done}/${files.length} done`);
  }
  
  console.log(`\n\nResults:`);
  console.log(`  Input:  ${(totalIn / 1024 / 1024).toFixed(1)} MB (${files.length} PNGs)`);
  console.log(`  Output: ${(totalOut / 1024 / 1024).toFixed(1)} MB (${files.length} WebPs)`);
  console.log(`  Saved:  ${((1 - totalOut / totalIn) * 100).toFixed(0)}%`);
  console.log(`  Avg:    ${(totalOut / files.length / 1024).toFixed(0)} KB per frame`);
}

run().catch(console.error);
