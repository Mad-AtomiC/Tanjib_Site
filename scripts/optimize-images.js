import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.resolve(__dirname, '../client/assets');

async function processFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

    const tempPath = filePath + '.temp';

    try {
        let pipeline = sharp(filePath);
        const metadata = await pipeline.metadata();

        let width = metadata.width;

        // Determine max width based on directory
        if (filePath.includes('logo')) {
            if (width > 800) width = 800;
        } else {
            if (width > 1200) width = 1200;
        }

        pipeline = pipeline.resize({ width, withoutEnlargement: true });

        if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
        } else if (ext === '.png') {
            pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
        } else if (ext === '.webp') {
            pipeline = pipeline.webp({ quality: 80 });
        }

        await pipeline.toFile(tempPath);

        // Replace original file
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);

        console.log(`Optimized: ${filePath}`);
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
}

async function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            await walkDir(filePath);
        } else {
            await processFile(filePath);
        }
    }
}

console.log('Starting image optimization...');
walkDir(assetsDir).then(() => console.log('Optimization complete!'));
