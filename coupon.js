
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  discountType: {
    type: String,
    required: true,
    enum: ['fixed', 'percentage'], // Add possible values for discount type
    default: 'fixed' // Set a default value
  },
  discountAmount: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
