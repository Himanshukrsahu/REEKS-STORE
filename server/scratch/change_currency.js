import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..', '..');

const filesToReplace = [
  // Frontend App Pages
  'client/src/app/page.tsx',
  'client/src/app/shop/page.tsx',
  'client/src/app/shop/[sku]/page.tsx',
  'client/src/app/cart/page.tsx',
  'client/src/app/checkout/page.tsx',
  'client/src/app/checkout/success/page.tsx',
  'client/src/app/compare/page.tsx',
  'client/src/components/SkinQuiz.tsx',
  // Store Hooks
  'client/src/store/useCartStore.ts',
  // Server Utils & Seeder
  'server/utils/pdfGenerator.js',
  'server/utils/seeder.js',
  'server/controllers/couponController.js'
];

filesToReplace.forEach(relPath => {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${relPath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Replace template literal dollar symbol triggers like $${subtotal} -> ₹${subtotal}
  content = content.replace(/\$\$\{/g, '₹${');

  // 2. Replace dynamic product price prefixing in JSX/HTML e.g. ${product.price} or ${item.price} or ${order.total} etc.
  // When it has $ right before the { expression. E.g. ${product.finalPrice} -> ₹{product.finalPrice}
  // We match $\s*\{ (dollar symbol optionally followed by spaces then open curly brace)
  content = content.replace(/\$\s*\{/g, '₹{');

  // 3. Specific file-level adjustments for prices & thresholds
  if (relPath === 'client/src/store/useCartStore.ts') {
    // Shipping limit: subtotal > 100 -> subtotal > 1500
    content = content.replace(/subtotal\s*>\s*100/g, 'subtotal > 1500');
    // Default shipping charges: shippingCharges: 10 -> shippingCharges: 150
    content = content.replace(/shippingCharges:\s*10/g, 'shippingCharges: 150');
    // Tax rate: change flat tax from 5% to 18% (GST)
    content = content.replace(/\*\s*0\.05/g, '* 0.18');
    // Comments
    content = content.replace(/above \$100/g, 'above ₹1500');
  }

  if (relPath === 'client/src/app/cart/page.tsx' || relPath === 'client/src/app/page.tsx') {
    // Text thresholds
    content = content.replace(/over \$100/g, 'over ₹1,500');
    content = content.replace(/above \$100/g, 'above ₹1,500');
  }

  if (relPath === 'server/controllers/couponController.js') {
    // Coupon error messages
    content = content.replace(/Minimum order amount of \$/g, 'Minimum order amount of ₹');
  }

  if (relPath === 'server/utils/seeder.js') {
    // Price generation: const price = Math.floor(25 + Math.random() * 125); -> const price = (Math.floor(10 + Math.random() * 40)) * 100 - 1; (₹999 - ₹4999)
    content = content.replace(
      /const price = Math\.floor\(25 \+ Math\.random\(\) \* 125\);/g,
      "const price = (Math.floor(10 + Math.random() * 40)) * 100 - 1;"
    );

    // Coupon min orders & discounts (INR scaling)
    // minOrderAmount: 50 -> 1000, maxDiscountAmount: 30 -> 300
    content = content.replace(/minOrderAmount:\s*50,\s*maxDiscountAmount:\s*30/g, 'minOrderAmount: 1000, maxDiscountAmount: 300');
    // minOrderAmount: 30 -> 500, maxDiscountAmount: 15 -> 150
    content = content.replace(/minOrderAmount:\s*30,\s*maxDiscountAmount:\s*15/g, 'minOrderAmount: 500, maxDiscountAmount: 150');
    // minOrderAmount: 0 -> 0
    // minOrderAmount: 100 -> 2000, maxDiscountAmount: 50 -> 500
    content = content.replace(/minOrderAmount:\s*100,\s*maxDiscountAmount:\s*50/g, 'minOrderAmount: 2000, maxDiscountAmount: 500');
    // minOrderAmount: 80 -> 1500
    content = content.replace(/minOrderAmount:\s*80/g, 'minOrderAmount: 1500');

    // Welcome notifications text
    content = content.replace(/above \$50/g, 'above ₹1,000');
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Converted currency formatting in: ${relPath}`);
});
