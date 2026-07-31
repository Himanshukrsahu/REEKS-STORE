import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seederPath = path.join(__dirname, '..', 'utils', 'seeder.js');

let content = fs.readFileSync(seederPath, 'utf8');

// Replace Case-Sensitive Reeksto -> Reekstore
content = content.replace(/Reeksto/g, 'Reekstore');
// Replace email domains
content = content.replace(/reeksto\.com/g, 'reekstore.com');
// Replace database string
content = content.replace(/mongodb:\/\/localhost:27017\/reeksto/g, 'mongodb://localhost:27017/reekstore');

fs.writeFileSync(seederPath, content, 'utf8');
console.log('Seeder file updated successfully.');
