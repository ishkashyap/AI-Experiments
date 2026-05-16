const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public/images');

const files = fs.readdirSync(imagesDir).filter(f => /\.(png|jpe?g)$/i.test(f));
let totalSaved = 0, totalOriginal = 0;

async function compress(file) {
    const fp = path.join(imagesDir, file);
    const ext = path.extname(file).toLowerCase();
    const originalSize = fs.statSync(fp).size;
    totalOriginal += originalSize;

    const tmp = fp + '.tmp';
    try {
        let pipeline = sharp(fp);
        if (ext === '.png') {
            pipeline = pipeline.png({ quality: 80, compressionLevel: 9, palette: true });
        } else {
            pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
        }
        await pipeline.toFile(tmp);
        const newSize = fs.statSync(tmp).size;
        if (newSize < originalSize) {
            fs.copyFileSync(tmp, fp);
            const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1);
            totalSaved += (originalSize - newSize);
            console.log(`  Compressed: ${file} (${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB, -${saved}%)`);
        } else {
            console.log(`  Skipped ${file} (already optimal)`);
        }
        fs.unlinkSync(tmp);
    } catch (err) {
        console.error(`  Error compressing ${file}: ${err.message}`);
    }
}

(async () => {
    console.log(`Found ${files.length} images to compress...`);
    for (const f of files) await compress(f);
    const savedMB = (totalSaved / 1024 / 1024).toFixed(2);
    const totalMB = (totalOriginal / 1024 / 1024).toFixed(2);
    console.log(`\nDone! Saved ${savedMB}MB out of ${totalMB}MB (${((totalSaved/totalOriginal)*100).toFixed(1)}% reduction)`);
})();
