const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = '/storage/internal';
const destinationDir = '/storage/code';

// Check if source directory exists
if (!fs.existsSync(sourceDir)) {
    console.error('Source directory does not exist.');
    process.exit(1);
}

// Check if destination directory exists
if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
}

try {
    // Copy files from source directory to destination directory
    execSync(`rsync -av ${sourceDir}/ ${destinationDir}`);
    console.log('Files copied from source to destination successfully.');

    // Copy files from destination directory to source directory
    execSync(`rsync -av ${destinationDir}/ ${sourceDir}`);
    console.log('Files copied from destination to source successfully.');
} catch (err) {
    console.error('Error copying files:', err);
}
