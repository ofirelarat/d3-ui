const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'components');
const targetDir = path.join(__dirname, '..', 'docs', 'd3-components');

// Ensure target directory exists
fs.ensureDirSync(targetDir);

// Copy components directory
try {
    fs.copySync(sourceDir, targetDir, {
        overwrite: true,
    });
    console.log('Successfully copied components to docs/d3-components');
} catch (err) {
    console.error('Error copying components:', err);
    process.exit(1);
}