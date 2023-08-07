// script.js
// document.addEventListener('DOMContentLoaded', () => {
//  // Function to handle click event on "ADD TO CART" button
//  const handleAddToCart = (event) => {
//    const price = event.target.dataset.price; // Get the price from the dataset
//    const cartTotal = localStorage.getItem('cartTotal') || 0; // Get the current cart total value or default to 0
//    const newCartTotal = parseFloat(cartTotal) + parseFloat(price); // Calculate the new cart total

//    localStorage.setItem('cartTotal', newCartTotal); // Store the updated cart total in the local storage

//    // Display an alert or perform any other actions as needed
//    alert(`Item added to cart! Total: ₹${newCartTotal}`);
//  };

//  // Add event listeners to all "ADD TO CART" buttons
//  const addToCartButtons = document.querySelectorAll('.addtocart');
//  addToCartButtons.forEach((button) => {
//    button.addEventListener('click', handleAddToCart);
//  });
// });
/**** *upar wala code works fine*/
// Function to handle adding items to the cart
// function addToCart(itemName, itemPrice) {
//  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

//  const newItem = { name: itemName, price: itemPrice };
//  cartItems.push(newItem);

//  localStorage.setItem('cartItems', JSON.stringify(cartItems));

//  // Display an alert or perform any other actions as needed
//  alert('Item added to cart!');
// }
/****** */
document.addEventListener('DOMContentLoaded', () => {
 const handleAddToCart = (event) => {
   const button = event.target;
   const itemContainer = button.closest('.item1');

   if (itemContainer) {
     const itemNameElement = itemContainer.querySelector('h3');
     const itemPrice = button.dataset.price;

     if (itemNameElement) {
       const itemName = itemNameElement.textContent;
       const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

       const newItem = { name: itemName, price: itemPrice };
       cartItems.push(newItem);

       localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // alert('Item added to cart!');
       let cartTotal = parseFloat(localStorage.getItem('cartTotal') || 0);
       cartTotal += parseFloat(itemPrice);
       localStorage.setItem('cartTotal', cartTotal);

       alert(`Item added to cart! Total: ₹${cartTotal}`);

     } else {
       console.error('Item name element not found');
     }
   } else {
     console.error('Item container not found');
   }
 };

 const addToCartButtons = document.querySelectorAll('.addtocart');
 addToCartButtons.forEach((button) => {
   button.addEventListener('click', handleAddToCart);
 });
});
