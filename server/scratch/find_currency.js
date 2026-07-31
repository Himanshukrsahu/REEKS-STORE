import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..', '..');

const scanDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== 'scratch' && file !== '.git') {
        scanDirectory(fullPath);
      }
    } else {
      const ext = path.extname(file);
      if (['.tsx', '.ts', '.js', '.json'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          if (line.includes('$${') || line.match(/\$\d+/) || line.match(/'\$'/) || line.match(/"\$"/)) {
            console.log(`${path.relative(ROOT_DIR, fullPath)}:L${idx + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }
};

console.log(`Scanning: ${ROOT_DIR}`);
scanDirectory(ROOT_DIR);
