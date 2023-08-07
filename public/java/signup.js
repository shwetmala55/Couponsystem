// console.log("helo");
// const signupForm = document.getElementById('signupForm');

// signupForm.addEventListener('submit', (event) => {
//   event.preventDefault(); // Prevent the form from submitting

//   const usernameInput = document.getElementById('username');
//   const emailInput = document.getElementById('email');
//   const passwordInput = document.getElementById('password');

//   const username = usernameInput.value;
//   const email = emailInput.value;
//   const password = passwordInput.value;

//   const userData = {
//     username,
//     email,
//     password
//   };

//   // Send the signup request to the server
//   fetch('/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(userData)
//   })
//     .then((response) => {
//       if (response.ok) {
//         console.log('Signup successful');
//         // Redirect the user to the dashboard or login page
//       } else {
//         console.error('Signup failed:', response.status);
//         // Display an error message to the user
//       }
//     })
//     .catch((error) => {
//       console.error('Failed to signup:', error);
//       // Display an error message to the user
//     });
// });
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting

  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  const userData = {
    username,
    email,
    password
  };

  // Send the signup request to the server
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then((response) => {
      if (response.ok) {
        console.log('Signup successful');
        window.location.href = '/login.html';
        // Redirect the user to the dashboard or login page
      } else {
        console.error('Signup failed:', response.status);
        window.alert('Login failed');
        // Display an error message to the user
      }
    })
    .catch((error) => {
      console.error('Failed to signup:', error);
      // Display an error message to the user
    });
});
