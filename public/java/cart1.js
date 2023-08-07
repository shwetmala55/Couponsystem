
// Function to calculate the cart total based on cart items
// Function to populate the cart items table
const populateCartItems = () => {
  const cartItemsTableBody = document.getElementById('cartItemsTableBody');
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  let cartTotal = 0;

  // Clear the table body
  cartItemsTableBody.innerHTML = '';

  // Populate the table with cart items
  cartItems.forEach((item, index) => {
    const { name, price } = item;

    // Create a new row for each cart item
    const row = cartItemsTableBody.insertRow();
    const nameCell = row.insertCell();
    const priceCell = row.insertCell();
    const actionCell = row.insertCell();

    // Set the values for each cell
    nameCell.textContent = name;
    priceCell.textContent = `₹${price}`;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.margin = '0px';
    // Add event listener to delete button
    deleteButton.addEventListener('click', () => {
      // Subtract the item price from the cart total
      cartTotal -= parseFloat(price);
      // Update the cart total in the local storage
      localStorage.setItem('cartTotal', cartTotal.toFixed(2));

      // Remove the item from the cartItems array
      cartItems.splice(index, 1);
      // Update the cartItems in local storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Repopulate the cart items table
      populateCartItems();
    });

    // Append the delete button to the action cell
    actionCell.appendChild(deleteButton);

    // Update the cart total with the price of the current item
    cartTotal += parseFloat(price);
  });

  // Update the cart total span with the new cart total value
  const cartTotalSpan = document.getElementById('cartTotal');
  cartTotalSpan.textContent = `₹${cartTotal.toFixed(2)}`;
};

document.addEventListener('DOMContentLoaded', () => {
  populateCartItems(); // Call the function to populate the cart items table
});
// document.addEventListener('DOMContentLoaded', () => {
//   const cartTotalFromStorage = localStorage.getItem('cartTotal');
//   const cartTotalElement = document.getElementById('cartTotal');
//   cartTotalElement.innerText = `₹${cartTotalFromStorage || '0.00'}`;

//   populateCartItems(); // Call the function to populate the cart items table
// });