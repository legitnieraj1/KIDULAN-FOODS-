import sharp from "sharp";
import { statSync, renameSync } from "fs";
import { basename } from "path";

// Convert these large product PNGs to WebP — typically 70-80% smaller
const TARGETS = [
  "/Users/nieraj/Downloads/smp-food-main/public/images/sprout.png",
  "/Users/nieraj/Downloads/smp-food-main/public/images/honeymuslie.png",
  "/Users/nieraj/Downloads/smp-food-main/public/images/abc.png",
  "/Users/nieraj/Downloads/smp-food-main/public/images/chocolate.png",
  "/Users/nieraj/Downloads/smp-food-main/public/images/product 3.png",
  "/Users/nieraj/Downloads/smp-food-main/public/images/product5.png",
  "/Users/nieraj/Downloads/smp-food-main/public/images/hero bg -kidulan.png",
  "/Users/nieraj/Downloads/smp-food-main/public/images/pineapple.png",
  "/Users/nieraj/Downloads/smp-food-main/public/images/full logo(kidulan).png",
  "/Users/nieraj/Downloads/smp-food-main/public/images/textlogo(kidulan).png",
];

async function toWebP(inputPath) {
  const outputPath = inputPath.replace(/\.png$/i, ".webp");
  const before = statSync(inputPath).size;

  let pipeline = sharp(inputPath);
  const meta = await pipeline.metadata();

  // Resize hero down to 2400px wide max — much more than enough for display
  if (meta.width && meta.width > 2400) {
    pipeline = pipeline.resize(2400, null, { withoutEnlargement: true });
  }

  await pipeline.webp({ quality: 82, lossless: false }).toFile(outputPath);

  const after = statSync(outputPath).size;
  const saved = ((1 - after / before) * 100).toFixed(1);
  console.log(`  ✓ ${basename(inputPath)} → .webp  ${(before/1024/1024).toFixed(2)}MB → ${(after/1024/1024).toFixed(2)}MB  (saved ${saved}%)`);
  return outputPath;
}

console.log("\n🔧 Converting PNGs to WebP...\n");
for (const p of TARGETS) {
  try {
    await toWebP(p);
  } catch (e) {
    console.error(`  ✗ ${basename(p)}: ${e.message}`);
  }
}
console.log("\n✅ WebP files created. Next.js will serve them automatically.\n");
