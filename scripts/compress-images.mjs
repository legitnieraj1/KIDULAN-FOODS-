import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const IMAGES_DIR = "/Users/nieraj/Downloads/smp-food-main/public/images";
const PUBLIC_DIR = "/Users/nieraj/Downloads/smp-food-main/public";

async function compressImage(inputPath, outputPath, options = {}) {
  const ext = extname(inputPath).toLowerCase();
  const image = sharp(inputPath);
  const meta = await image.metadata();

  console.log(`  → ${basename(inputPath)} [${meta.width}x${meta.height}, ${(statSync(inputPath).size / 1024 / 1024).toFixed(2)}MB]`);

  // For the massive hero PNG, resize down to 2400px wide max
  let pipeline = image;
  if (meta.width && meta.width > 2400) {
    pipeline = pipeline.resize(2400, null, { withoutEnlargement: true });
  }

  if (ext === ".png") {
    await pipeline
      .png({ quality: 80, compressionLevel: 9, palette: false })
      .toFile(outputPath);
  } else if (ext === ".jpg" || ext === ".jpeg") {
    await pipeline
      .jpeg({ quality: 75, progressive: true, mozjpeg: true })
      .toFile(outputPath);
  } else if (ext === ".webp") {
    await pipeline
      .webp({ quality: 78 })
      .toFile(outputPath);
  }

  const before = statSync(inputPath).size;
  const after = statSync(outputPath).size;
  const saved = ((1 - after / before) * 100).toFixed(1);
  console.log(`    ✓ ${(before/1024/1024).toFixed(2)}MB → ${(after/1024/1024).toFixed(2)}MB  (saved ${saved}%)`);
}

async function run() {
  console.log("\n🔧 Compressing images...\n");

  // Compress /public/images/
  const imageFiles = readdirSync(IMAGES_DIR).filter(f =>
    [".png", ".jpg", ".jpeg", ".webp"].includes(extname(f).toLowerCase())
  );

  for (const file of imageFiles) {
    const inputPath = join(IMAGES_DIR, file);
    const tmpPath = join(IMAGES_DIR, `__tmp__${file}`);
    try {
      await compressImage(inputPath, tmpPath);
      // Replace original
      const { renameSync } = await import("fs");
      renameSync(tmpPath, inputPath);
    } catch (e) {
      console.error(`  ✗ Failed: ${file} —`, e.message);
      // Clean up tmp if exists
      try { (await import("fs")).unlinkSync(tmpPath); } catch {}
    }
  }

  // Compress WhatsApp JPEGs in /public/
  const publicFiles = readdirSync(PUBLIC_DIR).filter(f =>
    [".jpg", ".jpeg", ".png"].includes(extname(f).toLowerCase())
  );

  for (const file of publicFiles) {
    const inputPath = join(PUBLIC_DIR, file);
    const tmpPath = join(PUBLIC_DIR, `__tmp__${file}`);
    try {
      await compressImage(inputPath, tmpPath);
      const { renameSync } = await import("fs");
      renameSync(tmpPath, inputPath);
    } catch (e) {
      console.error(`  ✗ Failed: ${file} —`, e.message);
      try { (await import("fs")).unlinkSync(tmpPath); } catch {}
    }
  }

  console.log("\n✅ Done! All images compressed in-place.\n");
}

run();
