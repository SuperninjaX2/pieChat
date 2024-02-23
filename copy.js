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

// Create destination directory if it does not exist
if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
}

try {
    // Copy files from source directory to destination directory
    execSync(`cp -r ${sourceDir}/* ${destinationDir}`);
    console.log('Folder copied successfully.');
} catch (err) {
    console.error('Error copying folder:', err);
}
