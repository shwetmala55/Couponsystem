
const express = require('express');
const app = express();
const connectDB = require('./db');
const Coupon = require('./coupon');
const path = require('path');
const signupRouter = require('./signserver');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB()
  .then(() => {
    
    app.post('/admin/coupons', (req, res) => {
      const { code, discountType, discountAmount, expiryDate } = req.body;

      if (!/^[A-Z0-9]{6}$/.test(code)) {
        // Invalid coupon code format, send a 400 response with an error message
        return res.status(400).send('Coupon code must consist of 6 uppercase alphanumeric characters');
      } else {

      // Check if the coupon code already exists
      Coupon.findOne({ code: code })
        .then((existingCoupon) => {
          if (existingCoupon) {
            // Coupon code already exists, display an error message
            res.status(400).send('Coupon code must be unique');
          } else {
            // Create and save the new coupon
            const newCoupon = new Coupon({
              code,
              discountType,
              discountAmount,
              expiryDate
            });

            newCoupon.save()
              .then(() => {
                console.log('Coupon created successfully');
                res.redirect('/admin/coupons');
              })
              .catch((error) => {
                console.error('Failed to create coupon:', error);
                res.status(500).send('Failed to create coupon');
              });
          }
        })
        .catch((error) => {
          console.error('Error checking coupon code uniqueness:', error);
          res.status(500).send('Failed to create coupon');
        });
      }
    });
    app.use(signupRouter);
    // Validate coupon code API endpoint
   
    app.get('/api/coupons/validate', (req, res) => {
      const couponCode = req.query.code;
      const currentDate = new Date();
      Coupon.findOne({ code: couponCode })
        .then((coupon) => {
          if (coupon) {
            if (coupon.expiryDate >= currentDate) {
            res.json({ valid: true,discountType: coupon.discountType, discount: coupon.discountAmount });
            }
            else {
              res.json({ valid: false, discount: 0, message: 'Coupon has expired' });
            }
          } else {
            res.json({ valid: false, discount: 0 });
          }
        })
        .catch((error) => {
          console.error('Failed to validate coupon code:', error);
          res.sendStatus(500);
        });
    }); 
    // Serve the static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Serve the 'coupons.html' file
    /***** */
    app.get('/api/coupons', (req, res) => {
      Coupon.find()
        .then((coupons) => {
          res.json(coupons); // Return the coupons as JSON response

        })
        .catch((error) => {
          console.error('Failed to fetch coupons:', error);
          res.status(500).json({ error: 'Failed to fetch coupons' }); // Return an error response
        });
    });


app.get('/', (req, res) => {
 res.send('Welcome to the homepage');
});

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/product-detail', (req, res) => {
  res.sendFile(__dirname + '/public/product-detail.html');
});

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});
app.get('/cart', (req, res) => {
  res.sendFile(__dirname + '/public/cart.html');
});
app.get('/admin/coupons', (req, res) => {
  res.sendFile(__dirname + '/public/coupons.html');
});
    const port = 3001;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the application or handle the error gracefully
  });

