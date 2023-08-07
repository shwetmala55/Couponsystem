// Fetch the coupons from the server
fetch('/api/coupons')
  .then((response) => response.json())
  .then((coupons) => {
    renderCoupons(coupons);
  })
  .catch((error) => {
    console.error('Failed to fetch coupons:', error);
  });

// Render the coupons on the page
function renderCoupons(coupons) {
  const couponContainer = document.getElementById('couponContainer');
  coupons.forEach((coupon) => {
    const couponElement = document.createElement('div');
    couponElement.classList.add('coupon');
    couponElement.innerHTML = `
      <h2>${coupon.code}</h2>
      <p>Discount Type: ${coupon.discountType}</p>
      <p>Discount Amount: ${coupon.discountAmount}</p>
      <p>Expiry Date: ${coupon.expiryDate}</p>
    `;
    couponContainer.appendChild(couponElement);
  });
}
