import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..', '..');

// 1. Fix Server Files
const serverFiles = [
  'server/utils/seeder.js',
  'server/utils/pdfGenerator.js',
  'server/controllers/couponController.js'
];

serverFiles.forEach(relPath => {
  const fullPath = path.join(ROOT_DIR, relPath);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Revert all occurrences of '₹{' to standard JS template literal token '${'
  content = content.replace(/₹\{/g, '${');

  // Prepend Rupee symbol back to specific price outputs
  if (relPath === 'server/utils/pdfGenerator.js') {
    content = content.replace(/\$\{item\.price\}/g, '₹${item.price}');
    content = content.replace(/\$\{item\.price\s*\*\s*item\.quantity\}/g, '₹${item.price * item.quantity}');
    content = content.replace(/\$\{order\.subtotal\}/g, '₹${order.subtotal}');
    content = content.replace(/\$\{order\.discountAmount\}/g, '₹${order.discountAmount}');
    content = content.replace(/\$\{order\.shippingCharges\}/g, '₹${order.shippingCharges}');
    content = content.replace(/\$\{order\.tax\}/g, '₹${order.tax}');
    content = content.replace(/\$\{order\.total\}/g, '₹${order.total}');
  }

  if (relPath === 'server/controllers/couponController.js') {
    content = content.replace(/\$\{coupon\.minOrderAmount\}/g, '₹${coupon.minOrderAmount}');
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Restored and formatted server template strings in: ${relPath}`);
});

// 2. Fix Client Files
const clientFiles = [
  'client/src/app/cart/page.tsx',
  'client/src/app/checkout/page.tsx',
  'client/src/components/ThemeHandler.tsx'
];

clientFiles.forEach(relPath => {
  const fullPath = path.join(ROOT_DIR, relPath);
  let content = fs.readFileSync(fullPath, 'utf8');

  if (relPath === 'client/src/app/cart/page.tsx') {
    // Coupon applied message: Coupon ₹{data.code} applied! Saved ₹{data.discountAmount} -> Coupon ${data.code} applied! Saved ₹${data.discountAmount}
    content = content.replace(/Coupon\s*₹\{data\.code\}/g, 'Coupon ${data.code}');
    content = content.replace(/Saved\s*₹\{data\.discountAmount\}/g, 'Saved ₹${data.discountAmount}');
    // Shipping: `₹{shipping}` -> `₹${shipping}`
    content = content.replace(/`₹\{shipping\}`/g, '`₹${shipping}`');
  }

  if (relPath === 'client/src/app/checkout/page.tsx') {
    // Shipping: `₹{shipping}` -> `₹${shipping}`
    content = content.replace(/`₹\{shipping\}`/g, '`₹${shipping}`');
  }

  if (relPath === 'client/src/components/ThemeHandler.tsx') {
    // Reekstore SW registered: ₹{reg.scope} -> Reekstore SW registered: ${reg.scope}
    content = content.replace(/registered:\s*₹\{reg\.scope\}/g, 'registered: ${reg.scope}');
    content = content.replace(/fail:\s*₹\{err\}/g, 'fail: ${err}');
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Restored client template strings in: ${relPath}`);
});
