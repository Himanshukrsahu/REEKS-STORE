import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..', '..');

const filesToUpdate = [
  'client/src/app/page.tsx',
  'client/src/app/shop/page.tsx',
  'client/src/app/shop/[sku]/page.tsx',
  'client/src/app/cart/page.tsx',
  'client/src/app/checkout/page.tsx',
  'client/src/app/checkout/success/page.tsx',
  'client/src/app/compare/page.tsx',
  'client/src/app/layout.tsx',
  'client/src/app/auth/login/page.tsx',
  'client/src/app/auth/register/page.tsx',
  'client/src/app/auth/forgot-password/page.tsx',
  'client/src/app/auth/reset-password/page.tsx',
  'client/src/components/Navbar.tsx',
  'client/src/components/Footer.tsx',
  'client/src/components/ThemeHandler.tsx',
  'client/public/manifest.json',
  'client/public/sw.js',
  'server/index.js',
  'server/config/db.js',
  'server/controllers/authController.js',
  'server/controllers/productController.js',
  'server/middleware/authMiddleware.js',
  'server/models/Product.js',
  'server/utils/pdfGenerator.js',
  'server/utils/seeder.js',
  'server/controllers/couponController.js'
];

filesToUpdate.forEach(relPath => {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace case-sensitive branding text
  content = content.replace(/Reekstore/g, 'Reeks Store');
  
  // Replace case-insensitive and system identifiers (emails, db names)
  content = content.replace(/reekstore\.com/g, 'reeksstore.com');
  content = content.replace(/reekstore/g, 'reeksstore');
  content = content.replace(/REEKSTORE\./g, 'REEKS STORE.');

  // Custom UI replacements to integrate the logo image:
  
  // 1. Navbar: insert logo image next to REEKS STORE.
  if (relPath === 'client/src/components/Navbar.tsx') {
    const targetText = `<span className="text-2xl font-black tracking-tighter text-foreground bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent">\n            REEKS STORE.\n          </span>`;
    const replacement = `<div className="flex items-center space-x-2.5">
            <img src="/logo.jpg" alt="Reeks Store Logo" className="w-8 h-8 rounded-lg object-cover border border-card-border" />
            <span className="text-xl font-black tracking-tight text-foreground bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent">
              REEKS STORE.
            </span>
          </div>`;
    content = content.replace(targetText, replacement);
  }

  // 2. Footer: insert logo image next to REEKS STORE.
  if (relPath === 'client/src/components/Footer.tsx') {
    const targetText = `<span className="text-2xl font-black tracking-tighter text-foreground bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent">\n              REEKS STORE.\n            </span>`;
    const replacement = `<div className="flex items-center space-x-2.5 mb-2">
              <img src="/logo.jpg" alt="Reeks Store Logo" className="w-8 h-8 rounded-lg object-cover border border-card-border" />
              <span className="text-lg font-black tracking-tight text-foreground bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent">
                REEKS STORE.
              </span>
            </div>`;
    content = content.replace(targetText, replacement);
  }

  // 3. Auth pages: render logo image centered above inputs
  const authTitleTargets = [
    { file: 'client/src/app/auth/login/page.tsx', title: 'Access Account' },
    { file: 'client/src/app/auth/register/page.tsx', title: 'Create Account' },
    { file: 'client/src/app/auth/forgot-password/page.tsx', title: 'Forgot Password' },
    { file: 'client/src/app/auth/reset-password/page.tsx', title: 'Reset Password' }
  ];
  
  authTitleTargets.forEach(auth => {
    if (relPath === auth.file) {
      const targetText = `<h1 className="text-3xl font-extrabold tracking-tight">${auth.title}</h1>`;
      const replacement = `<div className="flex flex-col items-center space-y-3 mb-4">
            <img src="/logo.jpg" alt="Reeks Store Logo" className="w-16 h-16 rounded-2xl object-cover shadow-md border border-card-border" />
          </div>\n          <h1 className="text-3xl font-extrabold tracking-tight">${auth.title}</h1>`;
      content = content.replace(targetText, replacement);
    }
  });

  // 4. Success page: render logo above order success notification
  if (relPath === 'client/src/app/checkout/success/page.tsx') {
    const targetText = `<h2 className="text-3xl font-extrabold tracking-tight">Order Confirmed</h2>`;
    const replacement = `<div className="flex flex-col items-center space-y-3 mb-4">
          <img src="/logo.jpg" alt="Reeks Store Logo" className="w-16 h-16 rounded-2xl object-cover shadow-md border border-card-border" />
        </div>\n        <h2 className="text-3xl font-extrabold tracking-tight">Order Confirmed</h2>`;
    content = content.replace(targetText, replacement);
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated brand name and UI logo elements in: ${relPath}`);
});
