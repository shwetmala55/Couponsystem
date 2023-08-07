// Assuming you have already selected the coupon input field and apply button in your HTML file

const couponApplied = localStorage.getItem('couponApplied') === 'true';

const couponInput = document.getElementById('coupon');
const applyCouponButton = document.getElementById('applyCoupon');

applyCouponButton.addEventListener('click', () => {
  if (couponApplied) {
    alert('Coupon code has already been applied.');
    return;
  }
  const couponCode = couponInput.value;

  // Send API request to validate coupon code
  fetch(`/api/coupons/validate?code=${couponCode}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.valid) {
       
        
        //console.log('Server response:', data);
        // Coupon code is valid, update cart's total amount
        const discountType = data.discountType;
        const discount = data.discount;

        // Get the cart total element and its inner text
        const cartTotalElement = document.getElementById('cartTotal');
        const cartTotalText = cartTotalElement.innerText;
        console.log(cartTotalText);
        // Extract only the numerical part of the cart total string
        const numericCartTotal = parseFloat(cartTotalText.replace(/[^\d.]/g, ''));

        // Check if the numericCartTotal is a valid number
       if (!isNaN(numericCartTotal) && numericCartTotal >= 500) {
        //  Calculate the discounted total
        // const discountedTotal = numericCartTotal - discount;
          let discountedTotal;
         if (discountType === 'percentage') {
           const discountPercentage = discount / 100;
           const discountAmount = numericCartTotal * discountPercentage;
           discountedTotal = numericCartTotal - discountAmount;
         } else {
           // Assume other discount types are fixed amounts
           discountedTotal = numericCartTotal - discount;
         }
       
          // Update the cart total with the discounted value

         cartTotalElement.innerText = `₹${discountedTotal.toFixed(2)}`;
          alert('Coupon applied successfully!');
         // isCouponApplied = true;
          localStorage.setItem('couponApplied', 'true');
          localStorage.setItem('cartTotal', discountedTotal.toFixed(2));
          // console.log('Discount Type:', data.discountType);
          // console.log('Discount:', discount);
        } else {
          console.error('Failed to parse cart total:', cartTotalText);
        }
      } else {
        // Coupon code is invalid, display error message
        alert('Invalid coupon code. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Failed to validate coupon code:', error);
    });
});
