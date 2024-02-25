const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = '/storage/internal/pieChat';
const destinationDir = '/storage/code/pieChat';

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
    // Copy files from source directory to destination directory excluding node_modules
    execSync(`rsync -av --exclude='node_modules' ${sourceDir}/ ${destinationDir}`);
    console.log('Files copied from source to destination successfully.');

    // Copy files from destination directory to source directory excluding node_modules
    execSync(`rsync -av --exclude='node_modules' ${destinationDir}/ ${sourceDir}`);
    console.log('Files copied from destination to source successfully.');
} catch (err) {
    console.error('Error copying files:', err);
}
