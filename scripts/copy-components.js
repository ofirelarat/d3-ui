const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'components');
const targetDir = path.join(__dirname, '..', 'docs', 'd3-components');

/**
 * Recursively copy a directory
 */
function copyDir(src, dest) {
  // Ensure destination exists
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read all entries in the source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath); // recursive copy
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath); // copy file
    }
  }
}

// Run the copy
try {
  copyDir(sourceDir, targetDir);
  console.log('Successfully copied components to docs/d3-components');
} catch (err) {
  console.error('Error copying components:', err);
  process.exit(1);
}
