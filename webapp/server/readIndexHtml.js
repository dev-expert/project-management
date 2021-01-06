import fs from 'fs';
import path from 'path';

const FILE_PATH = path.resolve(__dirname, '../build/index.html');
export let indexHtml = null;

try {
    indexHtml = fs.readFileSync(FILE_PATH, 'utf8');
} catch (err) {
    console.error('Fail to read file', FILE_PATH, err);
}

