import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..', '..');

const clientFiles = [
  'client/src/app/page.tsx',
  'client/src/app/shop/page.tsx',
  'client/src/app/shop/[sku]/page.tsx',
  'client/src/app/cart/page.tsx',
  'client/src/app/checkout/page.tsx',
  'client/src/app/checkout/success/page.tsx',
  'client/src/app/compare/page.tsx',
  'client/src/components/SkinQuiz.tsx',
  'client/src/components/ThemeHandler.tsx'
];

clientFiles.forEach(relPath => {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Fix template literal syntax for non-currency variables (replace "₹{" with "${")
  const nonCurrencyVars = [
    'adj',
    'cat\\.name',
    'i',
    'sku',
    'product\\.sku',
    'item\\.sku',
    'prod\\.sku',
    'order\\._id',
    'orderId',
    'token',
    'product\\.name',
    'product\\.stock',
    'saved',
    'dominantType',
    'queryParams\\.toString\\(\\)',
    'currentStep',
    'quizQuestions\\.length',
    'reg\\.scope',
    'err',
    'faqOpen\\[idx\\]',
    'selectedCategory === cat',
    'selectedSkinType === type',
    'selectedRating === star',
    'isCompared',
    'isWishlisted',
    'showMobileFilters',
    'scrolled',
    'pathname === link\\.href',
    'activeImage === img',
    'quantity',
    'prod\\.category',
    'relatedData\\.products',
    'reviewData\\.products',
    'rating',
    'title',
    'comment',
    'reviews',
    'submittingReview',
    'loading',
    'product',
    'isWish',
    'wishlistIds',
    'appliedCoupon',
    'shippingCharges',
    'tax',
    'totalProductsCount',
    'showMobileFilters',
    'items',
    'savedItems'
  ];

  nonCurrencyVars.forEach(v => {
    const regex = new RegExp(`₹\\{\\s*(${v})\\s*\\}`, 'g');
    content = content.replace(regex, '$$1'); // Replace '₹{var}' with '${var}'
  });

  // Also replace general class name template literal triggers containing "₹{"
  // E.g., `className={`... ₹{...} `}` -> should be `${...}`
  content = content.replace(/₹\{\s*(selectedCategory|selectedSkinType|selectedRating|isCompared|isWishlisted|showMobileFilters|scrolled|pathname|activeImage|faqOpen)/g, '${$1');
  
  // 2. Fix double Rupee symbols in backticks e.g., `₹₹{shipping}` -> `₹${shipping}`
  content = content.replace(/₹₹\{/g, '₹${');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Corrected template string syntax in: ${relPath}`);
});
