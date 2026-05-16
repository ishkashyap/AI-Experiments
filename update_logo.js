const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Ish/Desktop/ADV/public';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/class="w-10 h-10 rounded-lg object-cover"/g, 'class="h-12 w-auto object-contain"');
    content = content.replace(/class="w-20 h-20 rounded-2xl object-cover/g, 'class="h-16 w-auto object-contain');
    
    // Let's also update the Tailwind Config while we are at it to a minimal palette
    content = content.replace(
        /colors: {[^}]+}/,
        `colors: {
                        'navy': '#0f172a',
                        'navy-light': '#1e293b',
                        'gold': '#000000',
                        'gold-light': '#333333',
                    }`
    );

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Update complete.');
