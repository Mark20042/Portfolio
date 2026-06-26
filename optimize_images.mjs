import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = path.join(process.cwd(), 'src');
const dirsToScan = [
    path.join(srcDir, 'lib', 'assets'),
    path.join(srcDir, 'lib', 'images')
];

async function optimizeImages() {
    const replacements = [];

    // 1. Optimize images
    for (const dir of dirsToScan) {
        if (!fs.existsSync(dir)) continue;
        
        const walk = async (d) => {
            const files = fs.readdirSync(d);
            for (const f of files) {
                const fullPath = path.join(d, f);
                if (fs.statSync(fullPath).isDirectory()) {
                    await walk(fullPath);
                } else if (/\.(png|jpe?g)$/i.test(f)) {
                    const ext = path.extname(f);
                    const webpPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
                    const webpName = f.replace(new RegExp(`${ext}$`, 'i'), '.webp');
                    
                    replacements.push({
                        oldName: f,
                        newName: webpName
                    });
                    
                    try {
                        const metadata = await sharp(fullPath).metadata();
                        let s = sharp(fullPath);
                        if (metadata.width > 800) {
                            s = s.resize({ width: 800, withoutEnlargement: true });
                        }
                        await s.webp({ quality: 75 }).toFile(webpPath);
                        fs.unlinkSync(fullPath);
                        console.log(`Converted ${f} to ${webpName}`);
                    } catch (err) {
                        console.error(`Error converting ${f}:`, err);
                    }
                }
            }
        };
        await walk(dir);
    }
    
    // 2. Replace references in .svelte and .ts files
    const walkSrc = (d) => {
        const files = fs.readdirSync(d);
        for (const f of files) {
            const fullPath = path.join(d, f);
            if (fs.statSync(fullPath).isDirectory()) {
                walkSrc(fullPath);
            } else if (/\.(svelte|ts)$/i.test(f)) {
                let content = fs.readFileSync(fullPath, 'utf-8');
                let changed = false;
                
                for (const rep of replacements) {
                    // Match the exact filename in imports or strings
                    const regex = new RegExp(rep.oldName.replace(/\./g, '\\.'), 'g');
                    if (regex.test(content)) {
                        content = content.replace(regex, rep.newName);
                        changed = true;
                    }
                }
                
                if (changed) {
                    fs.writeFileSync(fullPath, content);
                    console.log(`Updated references in ${fullPath}`);
                }
            }
        }
    };
    walkSrc(srcDir);
    console.log('Optimization complete!');
}

optimizeImages();
