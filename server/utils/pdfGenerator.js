// HTML invoice generator that can be returned as HTML or downloaded
export const generateInvoiceHtml = (order) => {
  const dateStr = new Date(order.createdAt).toLocaleDateString();
  const itemsRows = order.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${item.name} (SKU: ${item.sku})</td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">₹₹${item.price}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">₹₹${item.price * item.quantity}</td>
    </tr>
  `).join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Invoice - ${order.trackingNumber}</title>
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.5; padding: 40px; background: #fafafa; }
      .container { max-width: 800px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1); }
      .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 30px; }
      .logo { font-size: 28px; font-weight: 800; letter-spacing: -0.05em; color: #0f172a; }
      .invoice-info { text-align: right; }
      .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
      .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
      .table th { background: #f8fafc; padding: 12px; font-weight: 600; text-align: left; border-bottom: 2px solid #e2e8f0; }
      .summary-section { width: 300px; margin-left: auto; margin-top: 20px; }
      .summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
      .total-row { font-size: 18px; font-weight: 700; border-top: 2px solid #e2e8f0; padding-top: 12px; color: #0f172a; }
      .footer { border-top: 1px solid #f1f5f9; padding-top: 20px; text-align: center; font-size: 12px; color: #64748b; margin-top: 40px; }
      @media print {
        body { background: none; padding: 0; }
        .container { box-shadow: none; border-radius: 0; padding: 0; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">REEKS STORE.</div>
        <div class="invoice-info">
          <h2 style="margin: 0; color: #0f172a;">INVOICE</h2>
          <p style="margin: 4px 0; color: #64748b;">Order: ${order.trackingNumber}</p>
          <p style="margin: 4px 0; color: #64748b;">Date: ${dateStr}</p>
        </div>
      </div>
      <div class="details-grid">
        <div>
          <h4 style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Billed To</h4>
          <p style="margin: 0; font-weight: 600;">${order.shippingAddress.name}</p>
          <p style="margin: 4px 0 0 0; color: #475569;">
            ${order.shippingAddress.street}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
            ${order.shippingAddress.country}
          </p>
          <p style="margin: 4px 0 0 0; color: #475569;">Phone: ${order.shippingAddress.phone}</p>
        </div>
        <div style="text-align: right;">
          <h4 style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Payment Info</h4>
          <p style="margin: 0;"><strong>Method:</strong> ${order.paymentMethod}</p>
          <p style="margin: 4px 0 0 0; color: #475569;"><strong>Status:</strong> ${order.paymentStatus}</p>
          <p style="margin: 4px 0 0 0; color: #475569;"><strong>Ref:</strong> ${order.paymentId || 'N/A'}</p>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Product Description</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Unit Price</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>
      <div class="summary-section">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>₹₹${order.subtotal}</span>
        </div>
        ${order.discountAmount > 0 ? `
        <div class="summary-row" style="color: #10b981;">
          <span>Discount (${order.couponApplied || 'Coupon'})</span>
          <span>-₹₹${order.discountAmount}</span>
        </div>
        ` : ''}
        <div class="summary-row">
          <span>Shipping</span>
          <span>₹₹${order.shippingCharges}</span>
        </div>
        <div class="summary-row">
          <span>Tax</span>
          <span>₹₹${order.tax}</span>
        </div>
        <div class="summary-row total-row">
          <span>Total</span>
          <span>₹₹${order.total}</span>
        </div>
      </div>
      <div class="footer">
        <p>Thank you for choosing Reeks Store. Healthy Skin Starts Here.</p>
        <p style="margin-top: 8px; color: #94a3b8;">If you have any questions, please contact support@reeksstore.com</p>
      </div>
    </div>
    <script>
      window.onload = function() {
        // Auto print or prompt
      }
    </script>
  </body>
  </html>
  `;
};
