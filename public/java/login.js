
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value;
  const password = passwordInput.value;

  const userData = {
    email,
    password
  };

  // Send the login request to the server
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then((response) => {
      if (response.ok) {
        console.log('Login successful');
        alert('Login successful');
        localStorage.setItem('email', email);
        localStorage.setItem('cartTotal', '0.00');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('couponApplied');
        window.location.href = '/index.html';
        // Redirect the user to the dashboard or home page
      } else {
        console.error('Login failed:', response.status);
        alert('invalid details');
        // Display an error message to the user
      }
    })
    .catch((error) => {
      console.error('Failed to login:', error);
      // Display an error message to the user
    });
});
