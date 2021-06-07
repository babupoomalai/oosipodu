var express = require('express');
var router = express.Router();

const couponService = require('../src/service/CouponService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/coupons', function (req, res, next) {
// 	console.log("inside getCoupon");
// 	couponService.getCoupons().then(coupons => {
// 		res.send(coupons);
// 	});
// });

module.exports = router;
