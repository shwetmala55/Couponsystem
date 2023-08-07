
const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Collect form data
  const code = document.getElementById('code').value;
  const discountType = document.getElementById('discountType').value; 
  const discountAmount = document.getElementById('discountAmount').value;
  const expiryDate = document.getElementById('expiryDate').value;

  // Create the request body object
  const formData = {
    code,
    discountType,
    discountAmount,
    expiryDate,
  };

  // Send a POST request to the server
  fetch('/admin/coupons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        // Coupon creation was successful
        console.log('Coupon created successfully');
       
   

        alert('coupons created!!!');
       // window.location.href = 'coupons.html'; // Redirect to the coupons page
      }
      else if (response.status === 400) {
        // Handle validation error response with an alert
        response.text().then((errorMessage) => {
          alert(errorMessage);
        });
      }

       else {
        // Handle any errors or display an error message
        console.error('Failed to create coupon:', response.status);
        // Handle the error case and display an error message to the user
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle any network errors or display an error message
    });
});
