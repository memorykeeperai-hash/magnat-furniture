const fs = require('fs');
const path = require('path');

const directory = 'd:/work-space/ekodrix/client/magnat-furniture';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(directory);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Remove inline fontFamily styles for inter, playfair, renade
    content = content.replace(/style=\{\{\s*fontFamily:\s*["']var\(--font-(inter|playfair|renade)(,\s*sans-serif|,\s*serif)?\)["']\s*\}\}/g, '');
    
    // Remove individual fontFamily properties from style objects
    content = content.replace(/fontFamily:\s*["']var\(--font-(inter|playfair|renade)(,\s*sans-serif|,\s*serif)?\)["'],?/g, '');

    // Cleanup empty style objects (if they were only fontFamily)
    content = content.replace(/style=\{\{\s*\}\}/g, '');
    
    // Remove Tailwind classes for font-inter, font-playfair, font-renade
    content = content.replace(/\bfont-(inter|playfair|renade)\b/g, '');

    if (content !== original) {
        console.log(`Updating ${file}`);
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log('Font cleanup complete.');
